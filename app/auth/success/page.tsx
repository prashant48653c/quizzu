'use client';

import useAuthStore from "@/store/useAuthStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const AuthHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setToken } = useAuthStore();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      setToken(accessToken);
      router.push("/profile");
    } else {
      router.push("/login");
    }
  }, [searchParams]); // Add dependency to avoid stale closures

  return <div>Authenticating...</div>;
};

const AuthSuccess = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthHandler />
    </Suspense>
  );
};

export default AuthSuccess;
