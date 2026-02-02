// Mingxi-Info - Team Page
// 团队页面

import React from 'react';
import { Card, Tag } from '@/components/ui';

export const metadata = {
  title: '团队介绍 - Mingxi-Info',
  description: '认识Mingxi-Info的核心团队成员',
};

export default function TeamPage() {
  const team = [
    {
      name: '张三',
      role: 'CEO & 联合创始人',
      avatar: '👨‍💼',
      bio: '前阿里巴巴P8，10年互联网产品和技术管理经验，曾负责多个千万级用户产品',
      skills: ['产品战略', '团队管理', 'AI应用'],
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      name: '李四',
      role: 'CTO & 联合创始人',
      avatar: '👨‍💻',
      bio: '前腾讯T4专家，15年技术研发经验，AI和大数据领域资深技术专家',
      skills: ['AI架构', '大数据', '云计算'],
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      name: '王五',
      role: 'Android技术负责人',
      avatar: '👨‍🔧',
      bio: '前字节跳动高级工程师，8年Android开发经验，擅长系统级开发和性能优化',
      skills: ['Android Framework', 'Kotlin', '性能优化'],
      social: {
        github: 'https://github.com',
      },
    },
    {
      name: '赵六',
      role: 'AI算法工程师',
      avatar: '🧑‍🔬',
      bio: '清华大学计算机博士，专注NLP和多模态AI，发表多篇顶会论文',
      skills: ['NLP', '深度学习', 'LLM'],
      social: {
        github: 'https://github.com',
      },
    },
    {
      name: '孙七',
      role: '产品经理',
      avatar: '👩‍💼',
      bio: '前美团产品经理，5年To B产品经验，擅长用户研究和需求分析',
      skills: ['产品设计', '用户研究', '敏捷开发'],
      social: {
        linkedin: 'https://linkedin.com',
      },
    },
  ];

  const stats = [
    {
      label: '团队规模',
      value: '5+',
      unit: '人',
      icon: '👥',
    },
    {
      label: '平均经验',
      value: '10+',
      unit: '年',
      icon: '💼',
    },
    {
      label: '大厂背景',
      value: '100%',
      unit: '',
      icon: '🏢',
    },
    {
      label: '技术专利',
      value: '3+',
      unit: '项',
      icon: '📝',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section pt-32">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="hero-title mb-6">
              <span className="text-gradient-primary">认识我们的</span>
              <br />
              <span className="text-primary">核心团队</span>
            </h1>
            <p className="body-large">
              我们是一群来自顶级互联网公司的技术专家，
              怀揣着改变世界的梦想，在AI领域深耕创新。
            </p>
          </div>

          {/* 团队数据 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} variant="glow" className="text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-gradient-primary mb-1">
                  {stat.value}
                  <span className="text-lg ml-1">{stat.unit}</span>
                </div>
                <div className="text-sm text-tertiary">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 团队成员 */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">
              <span className="text-gradient-primary">核心成员</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} variant="glow" className="text-center">
                {/* 头像 */}
                <div className="text-7xl mb-4">{member.avatar}</div>

                {/* 名字和职位 */}
                <h3 className="text-2xl font-bold text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-secondary font-medium mb-4">
                  {member.role}
                </p>

                {/* 简介 */}
                <p className="text-sm text-tertiary mb-4 leading-relaxed">
                  {member.bio}
                </p>

                {/* 技能标签 */}
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {member.skills.map((skill) => (
                    <Tag key={skill} variant="primary">
                      {skill}
                    </Tag>
                  ))}
                </div>

                {/* 社交链接 */}
                <div className="flex gap-4 justify-center pt-4 border-t border-white/10">
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tertiary hover:text-primary transition-colors"
                      aria-label="GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tertiary hover:text-secondary transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 加入我们 */}
      <section className="section bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="container">
          <div className="glass-panel text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gradient-primary mb-4">
              想和我们一起工作？
            </h2>
            <p className="text-lg text-secondary mb-8">
              我们正在寻找充满热情、富有创造力的伙伴。
              如果你对AI技术充满热情，欢迎加入我们的团队！
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/careers" className="glass-button glass-button--primary glass-button--lg">
                查看职位
              </a>
              <a href="/about" className="glass-button glass-button--secondary glass-button--lg">
                了解公司
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
