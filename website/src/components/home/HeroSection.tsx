// Cook-Hire Home - Hero Section
// 首页主视觉区域

'use client';

import React, { Suspense } from 'react';
import { Button } from '@/components/ui';
import dynamic from 'next/dynamic';

// 动态加载3D场景，避免SSR问题
const HeroScene = dynamic(
  () => import('@/components/three/HeroScene'),
  { ssr: false }
);

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D背景场景 */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-b from-purple-900/20 to-transparent" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* 内容区 */}
      <div className="container relative z-10 text-center px-4">
        <div className="max-w-4xl mx-auto">
          {/* 标题 */}
          <h1 className="hero-title mb-6">
            <span className="text-gradient-primary">
              打造下一代
            </span>
            <br />
            <span className="text-primary">
              AI Agent 智能平台
            </span>
          </h1>

          {/* 副标题 */}
          <p className="body-large max-w-2xl mx-auto mb-8">
            Cook-Hire 是一家专注于 AI Agent 技术的创新科技公司。
            我们致力于将人工智能带入日常工作流，让每个人都能拥有自己的智能助手。
          </p>

          {/* CTA按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" size="lg">
              查看开放职位
            </Button>
            <Button variant="secondary" size="lg">
              了解我们的项目
            </Button>
          </div>

          {/* 数据展示 */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="glass-card glass-card--sm text-center">
              <div className="text-4xl font-bold text-gradient-primary mb-2">
                5+
              </div>
              <div className="text-sm text-tertiary">
                团队成员
              </div>
            </div>
            <div className="glass-card glass-card--sm text-center">
              <div className="text-4xl font-bold text-gradient-secondary mb-2">
                3+
              </div>
              <div className="text-sm text-tertiary">
                开放职位
              </div>
            </div>
            <div className="glass-card glass-card--sm text-center">
              <div className="text-4xl font-bold text-gradient-accent mb-2">
                1
              </div>
              <div className="text-sm text-tertiary">
                核心项目
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
