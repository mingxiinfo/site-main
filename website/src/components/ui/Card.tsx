// Mingxi-Info UI - Card Component
// 玻璃态卡片组件

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow' | 'gradient-border' | 'bento';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', size = 'md', className = '', children, ...props }, ref) => {
    const baseClasses = variant === 'bento' ? 'glass-bento' : 'glass-card';

    const variantClasses = {
      default: '',
      glow: 'glass-card--glow',
      'gradient-border': 'glass-card--gradient-border',
      bento: '',
    };

    const sizeClasses = {
      sm: 'glass-card--sm',
      md: '',
      lg: 'glass-card--lg',
    };

    const combinedClasses = [
      baseClasses,
      variant !== 'bento' && variantClasses[variant],
      variant !== 'bento' && sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={combinedClasses} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
