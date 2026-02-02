# Cook-Hire 企业官网

> 专注AI Agent的创业公司官方网站 - 展示公司实力、招聘优秀人才

## 技术栈

- **前端框架**: Next.js 15+ (App Router)
- **类型系统**: TypeScript 5+
- **样式方案**: SASS + Tailwind CSS
- **3D渲染**: Three.js + React Three Fiber
- **动画库**: Framer Motion + GSAP
- **内容管理**: Markdown (gray-matter + remark)

## 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本
```bash
npm run build
npm start
```

## 项目结构

```
src/
├── app/                # Next.js App Router
│   ├── (home)/         # 首页
│   ├── about/          # 关于我们
│   ├── team/           # 团队介绍
│   ├── careers/        # 招聘中心
│   └── api/            # API路由
├── components/         # React组件
│   ├── layout/         # 布局组件
│   ├── ui/             # UI基础组件
│   ├── three/          # Three.js 3D组件
│   ├── home/           # 首页组件
│   ├── careers/        # 招聘组件
│   └── markdown/       # Markdown渲染器
├── lib/                # 工具库
│   └── markdown/       # Markdown处理
├── styles/             # SASS样式
│   ├── abstracts/      # 变量、Mixins
│   ├── base/           # 基础样式
│   ├── components/     # 组件样式
│   └── themes/         # 主题配置
└── types/              # TypeScript类型定义
```

## 核心功能

### 1. 3D Hero场景
- AI大脑核心可视化
- 5-8个浮动几何体
- 1000+粒子系统
- 交互式光源和后处理效果

### 2. 招聘系统
- 从Markdown文件动态加载职位信息
- 职位列表和详情页
- 响应式设计

### 3. 设计系统
- Glassmorphism玻璃态效果
- Bento Grid布局
- 深色模式
- 微交互动画

## 内容管理

官网内容从项目根目录的Markdown文件读取：

- **公司介绍**: `docs/company/README.md`
- **团队介绍**: `docs/team/README.md`
- **招聘职位**: `specs/positions/*/specs/jd.md`

## 部署

推荐使用Vercel部署：

```bash
vercel deploy
```

或手动构建：

```bash
npm run build
```

## 开发指南

### 添加新页面
在`src/app/`目录下创建新文件夹，例如`blog/page.tsx`。

### 添加新组件
在`src/components/`对应目录下创建组件文件。

### 修改样式
在`src/styles/`目录下编辑SASS文件。

### 调试3D场景
开发模式下可以使用Leva调试工具调整3D参数。

## 性能优化

- 3D场景延迟加载
- 移动端自动降级
- 图片懒加载
- 代码分割
- 目标：Lighthouse评分 >90

## License

Copyright © 2026 Cook-Hire. All rights reserved.
