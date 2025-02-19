/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Ensure this is enabled
  },
  images:{
    domains:['res.cloudinary.com','lh3.googleusercontent.com','static.vecteezy.com']
  }
};

module.exports = nextConfig;
