import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { Header, Footer } from '@/components/layout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Cook-Hire - AI Agent创新科技公司',
  description: '专注AI Agent的创业公司，提供智能客服、数据分析、流程自动化等AI驱动的企业和个人智能服务',
  keywords: 'AI Agent, 人工智能, 创业公司, 招聘, Android开发',
  authors: [{ name: 'Cook-Hire Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#8b5cf6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
