// Mingxi-Info Careers - Position Card Component
// 招聘职位卡片组件

import React from 'react';
import Link from 'next/link';
import { Card, Tag } from '@/components/ui';

export interface PositionCardProps {
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  salary?: string;
  tags?: string[];
  description?: string;
}

const PositionCard: React.FC<PositionCardProps> = ({
  title,
  slug,
  department,
  location,
  type,
  salary,
  tags = [],
  description,
}) => {
  return (
    <Link href={`/careers/${slug}`}>
      <Card variant="glow" className="h-full transition-all duration-300 cursor-pointer hover:scale-[1.02]">
        {/* 职位标题 */}
        <h3 className="card-title text-gradient-primary mb-3">
          {title}
        </h3>

        {/* 基本信息 */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{department}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-secondary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-secondary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{type}</span>
          </div>

          {salary && (
            <div className="flex items-center gap-2 text-sm text-accent">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">{salary}</span>
            </div>
          )}
        </div>

        {/* 描述 */}
        {description && (
          <p className="text-sm text-tertiary mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* 标签 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Tag key={tag} variant="primary">
                {tag}
              </Tag>
            ))}
          </div>
        )}

        {/* 查看详情按钮 */}
        <div className="flex items-center gap-2 text-primary font-medium mt-auto pt-4 border-t border-white/10">
          <span>查看详情</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Card>
    </Link>
  );
};

export default PositionCard;
