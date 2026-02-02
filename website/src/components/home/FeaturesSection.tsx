// Mingxi-Info Home - Features Section
// 特性展示区域

import React from 'react';
import { Card, Tag } from '@/components/ui';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI Agent 技术',
      description: '基于最新的大语言模型，打造智能化的对话代理和自动化助手',
      tags: ['LLM', 'NLP', '多模态'],
    },
    {
      icon: '🚀',
      title: '快速迭代',
      description: '敏捷开发流程，从概念到产品仅需数周时间',
      tags: ['敏捷', 'MVP', '持续交付'],
    },
    {
      icon: '🎯',
      title: '专注用户体验',
      description: '以用户为中心的设计理念，打造简洁直观的交互体验',
      tags: ['UX设计', '易用性', '可访问性'],
    },
    {
      icon: '⚡',
      title: '高性能架构',
      description: '微服务架构，支持海量并发，毫秒级响应',
      tags: ['微服务', '云原生', '高可用'],
    },
    {
      icon: '🔒',
      title: '安全可信',
      description: '企业级安全标准，保护用户数据隐私',
      tags: ['数据加密', '合规', '隐私保护'],
    },
    {
      icon: '🌐',
      title: '全平台支持',
      description: '一次开发，多端部署，覆盖移动端、Web端和桌面端',
      tags: ['跨平台', 'React Native', 'Electron'],
    },
  ];

  return (
    <section className="section">
      <div className="container">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="text-gradient-primary">为什么选择</span>{' '}
            <span className="text-primary">Mingxi-Info</span>
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            我们结合前沿技术与实战经验，为客户提供最优质的AI解决方案
          </p>
        </div>

        {/* Bento Grid布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="glow"
              className="group cursor-pointer"
            >
              {/* 图标 */}
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* 标题 */}
              <h3 className="card-title">{feature.title}</h3>

              {/* 描述 */}
              <p className="text-secondary mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2">
                {feature.tags.map((tag) => (
                  <Tag key={tag} variant="primary">
                    {tag}
                  </Tag>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
