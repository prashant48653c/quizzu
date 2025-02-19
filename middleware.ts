import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axiosInstance from './lib/axiosInstance';

export const routePermissions = {
    protected: [
        '/profile',
        '/profile/accounts',
        '/profile/bookmark',
        '/profile/history',
        '/profile/leaderboard',
        '/profile/update',
        '/quiz',
        '/result',
    ],
    admin: ['/dashboard'],
    public: ['/', '/login', '/register', '/about', '/contact', '/studymaterial', '/news'],
};

function matchRoute(path: string, routes: string[]): boolean {
    return routes.some((route) => path === route || path.startsWith(`${route}/`));
}

function parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
            .join('')
    );
    return JSON.parse(jsonPayload);
}

async function getToken(refreshToken: string) {
    try {
        const res = await axiosInstance.post('/user/refresh-token', { token: refreshToken });
        if (res.data?.accessToken) {
            console.log('Access token refreshed successfully.');
            return res.data.accessToken;
        }
    } catch (error) {
        console.error('Failed to refresh token:', error);
    }
    return null;
}

export async function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;

    if (
        currentPath.startsWith('/_next') || // Next.js assets
        currentPath.startsWith('/favicon.ico') || // Favicon
        currentPath.match(/\.(png|jpg|jpeg|svg|gif|webp|ico|css|js|woff|woff2|ttf|otf|eot)$/) // Static files
    ) {
        return NextResponse.next();
    }

    const routeMatch = {
        isPublic: matchRoute(currentPath, routePermissions.public),
        isProtected: matchRoute(currentPath, routePermissions.protected),
        isAdmin: matchRoute(currentPath, routePermissions.admin),
    };

    if (routeMatch.isPublic) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (routeMatch.isProtected) {
        if (!accessToken) {
            if (refreshToken) {
                const newAccessToken = await getToken(refreshToken);
                if (newAccessToken) {
                    const response = NextResponse.next();
                    response.cookies.set('accessToken', newAccessToken);
                    return response;
                }
            }
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const user = parseJwt(accessToken);
            console.log(`Authenticated user for protected route: ${user.id}`);
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (routeMatch.isAdmin) {
        if (!accessToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const user = parseJwt(accessToken);
            if (user.role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/', request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
};
