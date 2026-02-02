// Mingxi-Info - Projects Page
// 项目展示页面

import React from 'react';
import { Card, Tag } from '@/components/ui';

export const metadata = {
  title: '项目展示 - Mingxi-Info',
  description: '了解Mingxi-Info正在进行的创新项目',
};

export default function ProjectsPage() {
  const projects = [
    {
      name: '车载AI助手',
      status: '进行中',
      description: '基于大语言模型的智能车载助手，提供语音交互、导航规划、信息查询等功能。支持多轮对话，理解上下文，提供个性化服务。',
      icon: '🚗',
      tags: ['AI Agent', 'Android Automotive', 'LLM', '语音交互'],
      timeline: '2026 Q1 - Q2',
      features: [
        '自然语言交互',
        '多轮对话理解',
        '个性化推荐',
        '车辆控制集成',
        '实时路况分析',
      ],
      techStack: [
        'Android Automotive',
        'GPT-4',
        'Kotlin',
        'AIDL/Binder',
        'TensorFlow Lite',
      ],
      progress: 30,
    },
    {
      name: 'AI代码助手',
      status: '规划中',
      description: '面向开发者的智能代码助手，提供代码补全、Bug检测、重构建议等功能。支持多种编程语言，提升开发效率。',
      icon: '💻',
      tags: ['AI Agent', 'Code AI', 'IDE插件', 'DevOps'],
      timeline: '2026 Q3',
      features: [
        '智能代码补全',
        '代码审查',
        '自动化测试生成',
        '文档生成',
        '性能优化建议',
      ],
      techStack: [
        'VS Code Extension',
        'TypeScript',
        'Codex',
        'AST Parser',
        'Git Integration',
      ],
      progress: 0,
    },
    {
      name: '企业知识库助手',
      status: '规划中',
      description: '企业级知识管理和问答系统，基于RAG技术实现智能知识检索和问答。帮助企业高效管理和利用知识资产。',
      icon: '📚',
      tags: ['AI Agent', 'RAG', '知识图谱', '企业服务'],
      timeline: '2026 Q4',
      features: [
        '文档智能检索',
        '自动问答',
        '知识图谱构建',
        '多模态支持',
        '权限管理',
      ],
      techStack: [
        'LangChain',
        'Vector DB',
        'Elasticsearch',
        'React',
        'FastAPI',
      ],
      progress: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '进行中':
        return 'text-green-400';
      case '规划中':
        return 'text-yellow-400';
      case '已完成':
        return 'text-cyan-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section pt-32">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="hero-title mb-6">
              <span className="text-gradient-primary">我们的</span>
              <br />
              <span className="text-primary">创新项目</span>
            </h1>
            <p className="body-large mb-8">
              探索Mingxi-Info正在进行的前沿AI项目，
              见证我们如何将技术转化为实际产品。
            </p>
          </div>

          {/* 项目统计 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <Card variant="glow" className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <div className="text-3xl font-bold text-gradient-primary mb-1">1</div>
              <div className="text-sm text-tertiary">进行中项目</div>
            </Card>

            <Card variant="glow" className="text-center">
              <div className="text-4xl mb-3">📋</div>
              <div className="text-3xl font-bold text-gradient-secondary mb-1">2</div>
              <div className="text-sm text-tertiary">规划中项目</div>
            </Card>

            <Card variant="glow" className="text-center">
              <div className="text-4xl mb-3">👥</div>
              <div className="text-3xl font-bold text-gradient-accent mb-1">5+</div>
              <div className="text-sm text-tertiary">参与人员</div>
            </Card>
          </div>
        </div>
      </section>

      {/* 项目列表 */}
      <section className="section">
        <div className="container">
          <div className="space-y-8">
            {projects.map((project, index) => (
              <Card key={index} variant="gradient-border" size="lg">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* 左侧：基本信息 */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-6xl">{project.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-3xl font-bold text-gradient-primary">
                            {project.name}
                          </h2>
                          <span className={`text-sm font-semibold ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                        <p className="text-secondary mb-4">
                          {project.description}
                        </p>

                        {/* 标签 */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <Tag key={tag} variant="primary">
                              {tag}
                            </Tag>
                          ))}
                        </div>

                        {/* 时间线 */}
                        <div className="flex items-center gap-2 text-sm text-tertiary mb-4">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>时间线：{project.timeline}</span>
                        </div>

                        {/* 进度条 */}
                        {project.progress > 0 && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-secondary">进度</span>
                              <span className="text-primary font-semibold">{project.progress}%</span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-500"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 右侧：功能和技术栈 */}
                  <div className="space-y-6">
                    {/* 核心功能 */}
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-3">
                        核心功能
                      </h3>
                      <ul className="space-y-2">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-secondary">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 技术栈 */}
                    <div>
                      <h3 className="text-lg font-semibold text-secondary mb-3">
                        技术栈
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <Tag key={tech} variant="secondary">
                            {tech}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 视频项目入口 */}
      <section className="section">
        <div className="container">
          <div className="glass-panel text-center max-w-3xl mx-auto bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
            <div className="text-5xl mb-4">🎬</div>
            <h2 className="text-3xl font-bold text-gradient-primary mb-4">
              视频项目展示
            </h2>
            <p className="text-lg text-secondary mb-8">
              通过视频了解我们的项目实现过程和技术细节
            </p>
            <a href="/projects/videos" className="glass-button glass-button--primary glass-button--lg">
              浏览视频项目
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-b from-transparent to-cyan-900/10">
        <div className="container">
          <div className="glass-panel text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gradient-primary mb-4">
              想参与这些项目？
            </h2>
            <p className="text-lg text-secondary mb-8">
              我们正在招募优秀的技术人才加入我们的项目团队。
              如果你对AI技术充满热情，欢迎投递简历！
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/careers" className="glass-button glass-button--primary glass-button--lg">
                查看职位
              </a>
              <a href="/about" className="glass-button glass-button--secondary glass-button--lg">
                了解更多
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
