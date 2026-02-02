// Mingxi-Info Home - CTA Section
// 行动号召区域

import React from 'react';
import { Button } from '@/components/ui';
import Link from 'next/link';

const CTASection: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="glass-panel glass-panel--elevated max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-6">
            <span className="text-gradient-primary">加入我们</span>
            <br />
            <span className="text-primary">一起创造未来</span>
          </h2>

          <p className="body-large max-w-2xl mx-auto mb-8">
            我们正在寻找热爱技术、富有创造力的小伙伴。
            如果你想在AI领域施展才华，Mingxi-Info是你的最佳选择。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/careers">
              <Button variant="primary" size="lg">
                查看开放职位
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" size="lg">
                了解更多
              </Button>
            </Link>
          </div>

          {/* 福利亮点 */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl mb-2">💰</div>
              <div className="text-sm font-semibold text-primary mb-1">
                有竞争力的薪酬
              </div>
              <div className="text-xs text-tertiary">
                股权激励
              </div>
            </div>
            <div>
              <div className="text-3xl mb-2">🏖️</div>
              <div className="text-sm font-semibold text-secondary mb-1">
                灵活工作制
              </div>
              <div className="text-xs text-tertiary">
                远程办公
              </div>
            </div>
            <div>
              <div className="text-3xl mb-2">📚</div>
              <div className="text-sm font-semibold text-primary mb-1">
                成长机会
              </div>
              <div className="text-xs text-tertiary">
                技术培训
              </div>
            </div>
            <div>
              <div className="text-3xl mb-2">🎮</div>
              <div className="text-sm font-semibold text-secondary mb-1">
                年轻团队
              </div>
              <div className="text-xs text-tertiary">
                扁平管理
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
