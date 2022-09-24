const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { unoptimized: true },
  assetPrefix: isProd ? "/fit3179-dv2/" : undefined,
  basePath: isProd ? "/fit3179-dv2" : undefined,
};

module.exports = nextConfig;
