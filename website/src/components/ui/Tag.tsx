// Cook-Hire UI - Tag Component
// 玻璃态标签组件

import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const baseClasses = 'glass-tag';

    const variantClasses = {
      default: '',
      primary: 'glass-tag--primary',
      secondary: 'glass-tag--secondary',
      accent: 'glass-tag--accent',
    };

    const combinedClasses = [baseClasses, variantClasses[variant], className]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={combinedClasses} {...props}>
        {children}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
