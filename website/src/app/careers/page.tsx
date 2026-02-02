// Mingxi-Info - Careers Page
// 招聘页面

import React from 'react';
import { PositionCard } from '@/components/careers';
import { Button } from '@/components/ui';
import { getAllPositions } from '@/lib/markdown';

export const metadata = {
  title: '招聘职位 - Mingxi-Info',
  description: '加入Mingxi-Info，一起打造下一代AI Agent智能平台',
};

export default async function CareersPage() {
  // 从Markdown文件加载职位数据
  const allPositions = await getAllPositions();

  // 提取职位信息的辅助函数
  const extractInfo = (content: string, label: string): string => {
    const regex = new RegExp(`-?\\s*\\*\\*${label}\\*\\*[：:](.*?)(?:\\n|$)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  };

  // 转换为PositionCard需要的格式
  const positions = allPositions.map((pos) => ({
    title: pos.frontmatter.title,
    slug: pos.slug,
    department: '技术部',
    location: extractInfo(pos.content, '工作地点') || '杭州',
    type: '全职',
    salary: extractInfo(pos.content, '薪资范围') || '面议',
    tags: [],
    description: pos.content.replace(/[#*`\[\]]/g, '').substring(0, 100) + '...',
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section pt-32">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="hero-title mb-6">
              <span className="text-gradient-primary">加入我们</span>
              <br />
              <span className="text-primary">一起创造未来</span>
            </h1>
            <p className="body-large">
              Mingxi-Info正在寻找热爱技术、富有创造力的伙伴。
              我们致力于打造下一代AI Agent智能平台，欢迎你的加入！
            </p>
          </div>

          {/* 福利亮点 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            <div className="glass-card glass-card--sm text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                有竞争力的薪酬
              </h3>
              <p className="text-sm text-tertiary">
                绩效奖金
              </p>
            </div>

            <div className="glass-card glass-card--sm text-center">
              <div className="text-4xl mb-3">🏖️</div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                灵活工作制
              </h3>
              <p className="text-sm text-tertiary">
                远程办公 + 弹性时间
              </p>
            </div>

            <div className="glass-card glass-card--sm text-center">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                成长机会
              </h3>
              <p className="text-sm text-tertiary">
                技术培训 + 职业发展
              </p>
            </div>

            <div className="glass-card glass-card--sm text-center">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                年轻团队
              </h3>
              <p className="text-sm text-tertiary">
                扁平管理 + 开放文化
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 职位列表 */}
      <section className="section">
        <div className="container">
          <div className="mb-12">
            <h2 className="section-title text-center">
              <span className="text-gradient-primary">开放职位</span>
            </h2>
            <p className="text-center text-secondary max-w-2xl mx-auto">
              我们目前有{positions.length}个职位开放，欢迎投递简历
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {positions.map((position) => (
              <PositionCard key={position.slug} {...position} />
            ))}
          </div>

          {/* 没有找到合适职位 */}
          <div className="glass-panel text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              没有找到合适的职位？
            </h3>
            <p className="text-secondary mb-6">
              我们始终欢迎优秀的人才。如果你对AI技术充满热情，
              欢迎发送简历到我们的邮箱，我们会为你寻找合适的机会。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hr@mingxi-info.com">
                <Button variant="primary" size="lg">
                  发送简历
                </Button>
              </a>
              <a href="/about">
                <Button variant="secondary" size="lg">
                  了解公司
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 招聘流程 */}
      <section className="section bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="container">
          <h2 className="section-title text-center mb-16">
            <span className="text-gradient-primary">招聘流程</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex-center text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                投递简历
              </h3>
              <p className="text-sm text-tertiary">
                通过邮箱或招聘平台投递
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex-center text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                初步筛选
              </h3>
              <p className="text-sm text-tertiary">
                1-2个工作日反馈
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex-center text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                技术面试
              </h3>
              <p className="text-sm text-tertiary">
                2-3轮技术面试
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex-center text-2xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-accent mb-2">
                发放Offer
              </h3>
              <p className="text-sm text-tertiary">
                欢迎加入团队
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
