// Cook-Hire Layout - Header Component
// 玻璃态导航栏

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '首页', href: '/' },
    { label: '关于我们', href: '/about' },
    { label: '团队', href: '/team' },
    { label: '项目', href: '/projects' },
    { label: '招聘', href: '/careers' },
  ];

  return (
    <header className="glass-nav">
      <nav className="flex-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex-center font-bold text-white">
            CH
          </div>
          <span className="text-xl font-bold text-gradient-primary hidden sm:inline">
            Cook-Hire
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-secondary hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button variant="primary" size="sm">
            加入我们
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-secondary hover:text-primary">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Header;
