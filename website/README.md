# Cook-Hire 企业官网 🚀

> 专注AI Agent的创业公司官方网站 - 展示公司实力、招聘优秀人才

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)]()
[![License](https://img.shields.io/badge/license-Proprietary-red)]()

## ✨ 项目亮点

- 🎨 **独特3D场景** - M→X→M液体变化 + 多形状粒子系统
- 💎 **Glassmorphism设计** - 现代化毛玻璃效果
- 📱 **完全响应式** - 移动端/平板/桌面全适配
- ⚡ **极致性能** - 静态生成 + 代码分割 (<100KB首屏)
- 🎯 **专业内容** - 真实招聘信息 + 项目展示

## 📊 项目状态

**当前版本**: v1.0.0
**完成度**: 核心功能 100% ✅
**部署状态**: Ready to Deploy 🚀

### 已完成页面
- ✅ 首页 (/) - M→X→M 3D场景
- ✅ 招聘页面 (/careers) - 3个职位展示
- ✅ 关于我们 (/about) - 使命愿景价值观
- ✅ 团队页面 (/team) - 5位核心成员
- ✅ 项目页面 (/projects) - 3个项目展示

## 🛠 技术栈

### 核心框架
- **Next.js** 14.2 - App Router + SSG
- **TypeScript** 5+ - 类型安全
- **React** 18.3 - UI框架

### 样式方案
- **SASS** - 设计系统变量和混合器
- **Tailwind CSS** - 快速布局
- **Glassmorphism** - 玻璃态效果

### 3D渲染
- **Three.js** 0.165
- **@react-three/fiber** 8.16
- **@react-three/drei** 9.105
- **@react-three/postprocessing** 2.16

### 内容管理
- **gray-matter** - Frontmatter解析
- **remark** - Markdown渲染

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 pnpm

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问 [http://localhost:3000](http://localhost:3000) 查看效果

### 生产构建
```bash
npm run build
npm start
```

### 代码检查
```bash
npm run lint
```

## 📁 项目结构

```
website/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx             # ✅ 首页
│   │   ├── careers/page.tsx     # ✅ 招聘页
│   │   ├── about/page.tsx       # ✅ 关于我们
│   │   ├── team/page.tsx        # ✅ 团队页
│   │   ├── projects/page.tsx    # ✅ 项目页
│   │   ├── layout.tsx           # 根布局
│   │   └── globals.scss         # 全局样式
│   │
│   ├── components/               # React组件
│   │   ├── ui/                  # 基础UI (Button, Card, Tag, Input)
│   │   ├── layout/              # 布局 (Header, Footer)
│   │   ├── home/                # 首页组件
│   │   ├── three/               # 3D场景
│   │   ├── careers/             # 招聘组件
│   │   └── markdown/            # Markdown渲染
│   │
│   ├── lib/                     # 工具函数
│   │   ├── markdown/            # Markdown加载器
│   │   └── utils/               # 通用工具
│   │
│   └── styles/                  # SASS样式系统
│       ├── abstracts/           # 变量、混合器
│       ├── base/                # 重置、排版
│       ├── components/          # 组件样式
│       └── main.scss            # 主入口
│
├── content/                      # 内容目录 (软链接)
│   ├── docs -> ../../docs       # 公司文档
│   └── specs -> ../../specs     # 招聘JD
│
├── public/                       # 静态资源
│
├── DEVELOPMENT.md               # 开发指南
├── PROJECT_STATUS.md            # 项目状态
├── 3D_SCENE_UPDATE.md          # 3D场景说明
└── COMPLETION_SUMMARY.md        # 完成总结
```

## 🎨 核心功能

### 1. M→X→M 3D场景 ⭐
- **字母液体变化** - 6秒循环 (M 2秒 → X 2秒 → M 2秒)
- **MeshDistortMaterial** - 液体扭曲效果
- **三重光环** - 青色、紫色、黄色同心环
- **平滑过渡** - 缩放弹跳动画

### 2. 多形状粒子系统
- **4种几何体** - 球体、锥体、正方体、金字塔
- **75个粒子** - 3层分布 (30+25+20)
- **随机颜色** - 紫、青、黄、淡紫
- **独立动画** - 旋转、浮动、波动

### 3. Glassmorphism设计系统
- **玻璃卡片** - 毛玻璃背景 + 边框
- **渐变效果** - 多种渐变组合
- **微交互** - 悬停发光、缩放
- **响应式** - 5个断点适配

### 4. 招聘系统
- **职位卡片** - 部门、地点、薪资、标签
- **福利展示** - 4项福利亮点
- **招聘流程** - 4步流程展示
- **可扩展** - 支持Markdown加载

## 📊 性能指标

### 构建数据
```
Route                 Size      First Load
/                    2.56 kB    98.7 kB
/about               146 B      87.6 kB
/careers             175 B      96.4 kB
/projects            146 B      87.6 kB
/team                146 B      87.6 kB
```

### 性能优化
- ✅ 静态生成 (SSG)
- ✅ 代码分割
- ✅ 3D场景动态加载
- ✅ 图片优化
- ✅ CSS优化

## 📝 内容管理

### Markdown文件位置
- **招聘职位**: `specs/positions/*/specs/jd.md`
- **公司文档**: `docs/company/README.md`
- **团队成员**: `docs/team/README.md`

### 加载工具
```typescript
import { getAllPositions, getPosition } from '@/lib/markdown';

// 获取所有职位
const positions = await getAllPositions();

// 获取单个职位
const position = await getPosition('android-system-architect');
```

## 🚢 部署

### Vercel (推荐)
```bash
# 连接GitHub仓库后自动部署
vercel
```

### 手动部署
```bash
npm run build
# 将 .next 目录部署到服务器
```

### 环境变量
创建 `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://cook-hire.com
```

## 📚 文档

- [开发指南](./DEVELOPMENT.md) - 详细的开发文档
- [项目状态](./PROJECT_STATUS.md) - 功能清单和进度
- [3D场景说明](./3D_SCENE_UPDATE.md) - 3D场景技术细节
- [完成总结](./COMPLETION_SUMMARY.md) - 项目完成报告

## 🎯 路线图

### 已完成 ✅
- [x] 首页 + 3D场景
- [x] 招聘页面
- [x] 关于我们页面
- [x] 团队页面
- [x] 项目页面
- [x] 响应式设计
- [x] 性能优化

### 待开发 📋
- [ ] 移动端菜单
- [ ] 职位详情页
- [ ] 页面过渡动画
- [ ] Markdown内容集成
- [ ] 搜索功能
- [ ] 博客系统

## 👥 团队

- **开发**: Claude + qpjoy
- **设计**: AI生成 + 人工优化
- **技术栈**: Next.js生态

## 📄 许可证

Copyright © 2026 Cook-Hire. All rights reserved.

---

**Made with ❤️ by Cook-Hire Team**
