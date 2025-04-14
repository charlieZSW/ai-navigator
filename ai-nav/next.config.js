/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false
  },
  // 移除 experimental.optimizeFonts 选项
};

module.exports = nextConfig;