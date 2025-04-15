/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 保持 .ts 中的配置
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // 如果需要，也可以保留 unoptimized: true，根据你的实际需求决定
    // unoptimized: true,
  },
};

module.exports = nextConfig; 