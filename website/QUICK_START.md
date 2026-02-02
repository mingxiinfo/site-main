# Cook-Hire 官网 - 快速启动指南

## 🚀 5分钟快速上手

### 步骤 1: 安装依赖
```bash
cd /Users/qpjoy/workspace/qpjoy/cowork/cook-hire/website
npm install
```

### 步骤 2: 启动开发服务器
```bash
npm run dev
```

### 步骤 3: 查看效果
打开浏览器访问: http://localhost:3000

---

## 📄 页面导航

访问以下URL查看不同页面：

- **首页**: http://localhost:3000/
- **招聘**: http://localhost:3000/careers
- **关于我们**: http://localhost:3000/about
- **团队**: http://localhost:3000/team
- **项目**: http://localhost:3000/projects

---

## 🎨 主要特性

### 1. 3D场景 (首页)
- M→X→M字母液体变化动画
- 多形状粒子系统
- 自动旋转和交互

### 2. 移动端菜单
- 点击右上角汉堡图标打开
- 侧滑抽屉菜单
- 路由高亮显示

### 3. 响应式设计
- 调整浏览器窗口大小查看不同断点效果
- 移动端/平板/桌面全适配

---

## 🛠 常用命令

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

---

## 📁 项目结构

```
website/
├── src/
│   ├── app/              # 页面路由
│   │   ├── page.tsx      # 首页
│   │   ├── careers/      # 招聘页
│   │   ├── about/        # 关于我们
│   │   ├── team/         # 团队
│   │   └── projects/     # 项目
│   │
│   ├── components/       # React组件
│   │   ├── ui/          # 基础组件
│   │   ├── layout/      # 布局组件
│   │   ├── three/       # 3D场景
│   │   └── home/        # 首页组件
│   │
│   ├── lib/             # 工具函数
│   └── styles/          # SASS样式
│
└── public/              # 静态资源
```

---

## 🎯 核心组件

### Button
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="lg">
  点击我
</Button>
```

### Card
```tsx
import { Card } from '@/components/ui';

<Card variant="glow">
  卡片内容
</Card>
```

### Tag
```tsx
import { Tag } from '@/components/ui';

<Tag variant="primary">标签</Tag>
```

---

## 📚 完整文档

- **README.md** - 项目介绍
- **DEVELOPMENT.md** - 开发指南
- **FINAL_REPORT.md** - 最终报告
- **3D_SCENE_UPDATE.md** - 3D场景说明

---

## 💡 小提示

1. **首次启动**: 首次运行需要安装依赖，大约需要2-3分钟
2. **热重载**: 修改代码后自动刷新浏览器
3. **3D性能**: 首页3D场景在开发模式下可能较慢，生产构建会优化
4. **移动端测试**: 使用浏览器开发者工具切换到移动端视图
5. **构建验证**: 部署前运行 `npm run build` 确保无错误

---

## 🚢 快速部署

### Vercel部署
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录并部署
vercel
```

### 手动部署
```bash
# 构建
npm run build

# 将 .next 目录上传到服务器
# 运行
npm start
```

---

## ❓ 常见问题

### Q: npm install 失败？
A: 确保Node.js版本 >= 18

### Q: 3D场景不显示？
A: 检查浏览器控制台是否有错误，确保支持WebGL

### Q: 移动端菜单无法打开？
A: 确保JavaScript已启用，检查浏览器控制台

### Q: 页面样式错乱？
A: 清除浏览器缓存，重启开发服务器

---

## 📞 获取帮助

- 查看完整文档: `DEVELOPMENT.md`
- 查看最终报告: `FINAL_REPORT.md`
- GitHub Issues: (添加你的仓库链接)

---

**快速开始完成！祝你使用愉快！** 🎉
