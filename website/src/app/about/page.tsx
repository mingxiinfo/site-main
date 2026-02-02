// Mingxi-Info - About Page
// 关于我们页面

import React from 'react';
import { Card } from '@/components/ui';

export const metadata = {
  title: '关于我们 - Mingxi-Info',
  description: '了解Mingxi-Info的使命、愿景和团队',
};

export default function AboutPage() {
  const values = [
    {
      icon: '🎯',
      title: '用户至上',
      description: '始终以用户需求为导向，打造真正有价值的产品',
    },
    {
      icon: '🚀',
      title: '快速迭代',
      description: '敏捷开发，快速验证想法，持续优化产品',
    },
    {
      icon: '🤝',
      title: '开放协作',
      description: '扁平化管理，鼓励开放沟通和团队协作',
    },
    {
      icon: '💡',
      title: '创新驱动',
      description: '拥抱新技术，勇于尝试创新解决方案',
    },
    {
      icon: '📈',
      title: '持续成长',
      description: '重视个人发展，与公司共同成长',
    },
    {
      icon: '🌟',
      title: '追求卓越',
      description: '对产品质量精益求精，追求技术卓越',
    },
  ];

  const milestones = [
    {
      year: '2025',
      title: '公司成立',
      description: '5位来自大厂的技术专家创立Mingxi-Info，专注AI Agent领域',
    },
    {
      year: '2025 Q4',
      title: '产品立项',
      description: '启动车载AI助手项目，开始技术预研和团队组建',
    },
    {
      year: '2026 Q1',
      title: '团队扩充',
      description: '招募Android开发团队，启动MVP开发',
    },
    {
      year: '2026 Q2',
      title: '产品上线',
      description: '计划完成MVP并进行小规模测试',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section pt-32">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="hero-title mb-6">
              <span className="text-gradient-primary">关于</span>{' '}
              <span className="text-primary">Mingxi-Info</span>
            </h1>
            <p className="body-large mb-8">
              我们是一家专注于AI Agent技术的创新科技公司，
              致力于将人工智能带入日常工作流，让每个人都能拥有自己的智能助手。
            </p>
          </div>
        </div>
      </section>

      {/* 使命愿景 */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card variant="gradient-border" size="lg">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold text-gradient-primary mb-4">
                我们的使命
              </h2>
              <p className="text-lg text-secondary leading-relaxed">
                通过先进的AI技术，打造智能化的工作助手，
                帮助用户提升工作效率，释放创造力，
                让每个人都能专注于真正重要的事情。
              </p>
            </Card>

            <Card variant="gradient-border" size="lg">
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold text-gradient-secondary mb-4">
                我们的愿景
              </h2>
              <p className="text-lg text-secondary leading-relaxed">
                成为AI Agent领域的领先企业，
                让智能助手成为每个人的标配，
                推动人工智能在垂直领域的深度应用。
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 核心价值观 */}
      <section className="section bg-gradient-to-b from-transparent to-cyan-900/10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              <span className="text-gradient-primary">核心价值观</span>
            </h2>
            <p className="body-large max-w-2xl mx-auto">
              这些价值观指引着我们的日常工作和决策
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} variant="glow" className="text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-secondary">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 发展历程 */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              <span className="text-gradient-primary">发展历程</span>
            </h2>
            <p className="body-large max-w-2xl mx-auto">
              从创立到现在，我们一步一个脚印
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8 mb-12 last:mb-0">
                {/* 年份 */}
                <div className="flex-shrink-0 w-32">
                  <div className="glass-card glass-card--sm text-center">
                    <div className="text-2xl font-bold text-gradient-primary">
                      {milestone.year}
                    </div>
                  </div>
                </div>

                {/* 内容 */}
                <div className="flex-1">
                  <Card variant="glow">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-secondary">
                      {milestone.description}
                    </p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 团队介绍 */}
      <section className="section bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="container">
          <div className="glass-panel text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gradient-primary mb-4">
              我们的团队
            </h2>
            <p className="text-lg text-secondary mb-6">
              Mingxi-Info由5位来自阿里、腾讯等大厂的技术专家创立。
              团队成员在AI、移动开发、云计算等领域拥有丰富经验，
              平均拥有10年以上的技术积累。
            </p>
            <p className="text-secondary mb-8">
              我们相信技术的力量，也相信团队的力量。
              欢迎更多优秀的伙伴加入我们，一起创造未来！
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/team" className="glass-button glass-button--primary">
                认识团队
              </a>
              <a href="/careers" className="glass-button glass-button--secondary">
                加入我们
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
