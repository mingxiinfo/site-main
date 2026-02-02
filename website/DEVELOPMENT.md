# Cook-Hire 官网开发指南

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站

### 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
website/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # 根布局 (Header + Footer)
│   │   ├── page.tsx          # 首页
│   │   └── globals.scss      # 全局样式入口
│   │
│   ├── components/           # React组件
│   │   ├── ui/              # 基础UI组件 (Button, Card, Tag, Input)
│   │   ├── layout/          # 布局组件 (Header, Footer)
│   │   ├── home/            # 首页组件 (Hero, Features, CTA)
│   │   ├── three/           # Three.js 3D场景
│   │   ├── careers/         # 招聘页面组件
│   │   └── markdown/        # Markdown渲染组件
│   │
│   ├── lib/                 # 工具函数
│   │   ├── markdown/        # Markdown加载工具
│   │   └── utils/           # 通用工具函数
│   │
│   ├── styles/              # SASS样式系统
│   │   ├── abstracts/       # 变量、混合器
│   │   ├── base/            # 重置、排版
│   │   ├── components/      # 组件样式 (Glassmorphism)
│   │   └── main.scss        # 样式主入口
│   │
│   └── types/               # TypeScript类型定义
│
├── content/                 # 内容目录 (软链接)
│   ├── docs -> ../../docs   # 公司文档
│   └── specs -> ../../specs # 招聘JD
│
├── public/                  # 静态资源
│   ├── images/             # 图片
│   └── models/             # 3D模型
│
└── package.json
```

## 🎨 设计系统

### 颜色主题

- **主色调**: Purple (`#8b5cf6`) - AI科技感
- **辅助色**: Cyan (`#06b6d4`) - 现代感
- **强调色**: Yellow (`#fde047`) - 活力

### 核心组件

#### UI组件 (`src/components/ui/`)

- **Button** - 玻璃态按钮
  ```tsx
  <Button variant="primary" size="lg">加入我们</Button>
  ```

- **Card** - 玻璃态卡片
  ```tsx
  <Card variant="glow">内容</Card>
  ```

- **Tag** - 标签
  ```tsx
  <Tag variant="primary">AI</Tag>
  ```

- **Input** - 输入框
  ```tsx
  <Input label="邮箱" placeholder="your@email.com" />
  ```

#### 玻璃态效果 (Glassmorphism)

所有组件都基于SASS混合器实现玻璃态效果:

```scss
@include glass-card($bg, $border, $blur, $radius);
```

### SASS工具

#### 变量 (`src/styles/abstracts/_variables.scss`)

- 颜色系统: `$primary-500`, `$secondary-500`
- 间距系统: `$spacing-md`, `$spacing-xl`
- 字体系统: `$text-2xl`, `$font-bold`
- 圆角: `$radius-lg`, `$radius-xl`
- 渐变: `$gradient-primary`, `$gradient-secondary`

#### 混合器 (`src/styles/abstracts/_mixins.scss`)

- `@include glass-card` - 玻璃卡片
- `@include gradient-text` - 渐变文本
- `@include flex-center` - Flex居中
- `@include respond-to(md)` - 响应式断点
- `@include hover-glow` - 悬停发光

## 🎮 3D场景

### HeroScene组件

位于 `src/components/three/HeroScene.tsx`，包含:

- **AI Brain Core** - 中心神经网络可视化
- **Floating Geometries** - 8个浮动几何体 (Box, Sphere, Octahedron)
- **Particle System** - 1200个粒子，分3层
- **Bloom Effect** - 后期处理光效
- **Auto Rotation** - 自动旋转交互

使用 `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing`

## 📝 Markdown内容管理

### 加载招聘职位

```tsx
import { getAllPositions, getPosition } from '@/lib/markdown';

// 获取所有职位
const positions = await getAllPositions();

// 获取单个职位
const position = await getPosition('android-platform-engineer');
```

### Markdown文件结构

```markdown
---
title: Android平台架构师
department: 技术部
location: 远程/北京
type: 全职
---

职位描述内容...
```

## 🚧 开发建议

### 添加新页面

1. 在 `src/app/` 创建新文件夹 (如 `about/`)
2. 添加 `page.tsx` 文件
3. 使用现有组件和样式系统

### 添加新组件

1. 在 `src/components/` 对应目录创建组件
2. 使用 SASS 混合器保持一致性
3. 添加 TypeScript 类型定义
4. 导出到 `index.ts`

### 样式最佳实践

- 优先使用 SASS 混合器和变量
- Tailwind用于快速布局和间距
- 自定义样式写在 `src/styles/components/`

## 📦 构建和部署

### 本地预览生产版本

```bash
npm run build
npm start
```

### Vercel部署 (推荐)

1. 连接GitHub仓库
2. 自动检测Next.js配置
3. 一键部署

### 环境变量

创建 `.env.local` 文件:

```env
# 示例配置
NEXT_PUBLIC_API_URL=https://api.cook-hire.com
```

## ✨ 已完成功能

- [x] Next.js 14 + App Router
- [x] SASS样式系统 (Glassmorphism)
- [x] UI组件库 (Button, Card, Tag, Input)
- [x] 响应式导航栏和页脚
- [x] Three.js 3D Hero场景 (AI Brain + 粒子)
- [x] 首页布局 (Hero + Features + CTA)
- [x] Markdown内容管理
- [x] TypeScript类型定义
- [x] 暗色主题

## 🔜 待开发功能

根据计划文档 (`~/.claude/plans/robust-plotting-sparkle.md`)，接下来需要:

- [ ] 招聘页面 (`/careers`)
- [ ] 关于我们页面 (`/about`)
- [ ] 团队页面 (`/team`)
- [ ] 项目页面 (`/projects`)
- [ ] 职位详情页
- [ ] 移动端菜单
- [ ] 页面过渡动画 (Framer Motion)
- [ ] SEO优化

## 🐛 已知问题

1. ~~viewport和themeColor警告~~ - 仅为Next.js API更新提示，不影响功能
2. 3D场景在低端设备可能性能较差 - 可考虑降低粒子数量

## 📚 技术栈

- **框架**: Next.js 14.2 (App Router)
- **语言**: TypeScript 5
- **样式**: SASS + Tailwind CSS
- **3D**: Three.js + React Three Fiber
- **动画**: Framer Motion (待实装)
- **Markdown**: gray-matter + remark
- **部署**: Vercel (推荐)

## 🤝 贡献指南

1. 从 `main` 分支创建功能分支
2. 遵循现有代码风格和组织结构
3. 测试构建: `npm run build`
4. 提交PR并描述变更

---

**Cook-Hire** - 打造下一代 AI Agent 智能平台 🚀
