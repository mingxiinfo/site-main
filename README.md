# Cook-Hire 🍳

> 人才烹饪坊 - 调配最合适的技术人才

## 项目简介

Cook-Hire 是一个集招聘管理与公司展示于一体的平台，用于：
- 📋 管理各岗位招聘需求和技术规格
- 🌐 展示公司/团队介绍
- 📢 对外传播招聘信息，吸引人才

## 技术栈

| 模块 | 技术 |
|------|------|
| 前端 | React + TypeScript + SASS |
| 后端 | NestJS + PostgreSQL |
| 部署 | 待定 (Vercel / 自建) |

## 目录结构

```
cook-hire/
├── positions/              # 招聘职位管理
│   └── android-middleware/ # 安卓中间层工程师
│       ├── README.md       # 职位概述
│       └── specs/          # 详细规格
│           ├── jd.md       # 职位描述
│           ├── requirements.md  # 技术要求
│           └── interview.md     # 面试流程
├── docs/                   # 文档资料
│   ├── team/              # 团队介绍
│   └── company/           # 公司介绍
├── website/               # 官网前端 (React)
├── server/                # 后端服务 (NestJS)
└── scripts/               # 工具脚本
```

## 扩展性设计

### 添加新职位
在 `positions/` 下创建新目录，遵循相同结构：
```bash
positions/
├── android-middleware/    # 已有
├── frontend-engineer/     # 新增示例
├── backend-engineer/      # 新增示例
└── product-manager/       # 新增示例
```

每个职位目录包含：
- `README.md` - 职位概述和快速信息
- `specs/` - 详细沟通文档
  - `jd.md` - 对外职位描述
  - `requirements.md` - 内部技术要求
  - `interview.md` - 面试评估标准
  - 其他自定义文档...

### 官网与招聘联动
官网会自动读取 `positions/` 目录，动态生成招聘页面：
- 支持 Markdown 渲染
- 一键分享到各平台
- 投递表单集成

## 快速开始

```bash
# 安装依赖
cd website && npm install
cd ../server && npm install

# 启动开发
npm run dev
```

## 团队

我们是一支专注于 AI Agent 的团队，提供垂直评价、信息抓取等 toB/toC 服务。
团队成员 5-6 人，均来自大厂，经验丰富。

---

**维护者**: Qpjoy (前端负责人)
