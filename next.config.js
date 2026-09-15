const nextConfig = { allowedDevOrigins: ['127.0.0.1', 'localhost'], turbopack: { root: process.cwd() }, images: { unoptimized: true, remotePatterns: [{protocol:'https',hostname:'images.unsplash.com'}] }, poweredByHeader: false };
export default nextConfig;
