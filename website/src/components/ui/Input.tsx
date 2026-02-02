// Mingxi-Info UI - Input Component
// 玻璃态输入框组件

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-column">
        {label && (
          <label className="text-sm font-medium text-secondary mb-sm">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`glass-input ${className}`}
          {...props}
        />
        {error && (
          <span className="text-sm text-red-400 mt-xs">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
