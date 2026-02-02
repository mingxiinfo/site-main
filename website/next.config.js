/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用SASS支持
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  // 图片优化配置
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  // 实验性功能
  experimental: {
    optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  // 性能优化
  swcMinify: true,
  // 严格模式
  reactStrictMode: true,
};

module.exports = nextConfig;
