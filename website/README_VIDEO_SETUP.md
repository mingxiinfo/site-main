# 视频项目路径配置说明

## 概述

本项目实现了视频项目展示功能，允许在官网直接访问观看项目介绍视频。

## 目录结构

```
website/
├── content/video/          # 视频内容目录
│   └── [项目名称]/         # 每个文件夹代表一个项目
│       ├── metadata.json   # 项目元数据
│       └── *.mp4          # 视频文件
├── public/
│   └── content/           # 需要创建符号链接到 ../content
└── src/
    ├── app/
    │   └── projects/
    │       └── videos/
    │           ├── page.tsx           # 视频项目列表页
    │           └── [slug]/
    │               └── page.tsx       # 单个视频项目详情页
    └── lib/
        └── videoProjects.ts           # 视频项目工具函数
```

## 路径规则

- **视频项目列表**: `/projects/videos`
- **单个项目详情**: `/projects/videos/[项目slug]`

## 设置步骤

### 1. 创建符号链接（开发环境）

为了让Next.js能够访问content目录中的视频文件，需要创建符号链接：

```bash
cd website/public
ln -s ../content content
```

### 2. 添加新的视频项目

在 `content/video/` 目录下创建新的项目文件夹：

```bash
mkdir -p content/video/项目名称
```

### 3. 创建 metadata.json

在项目文件夹中创建 `metadata.json` 文件：

```json
{
  "name": "项目名称",
  "slug": "project-slug",
  "description": "项目简介",
  "coverImage": "/images/projects/cover.jpg",
  "status": "已完成",
  "tags": ["标签1", "标签2"],
  "videos": [
    {
      "title": "视频标题",
      "filename": "video.mp4",
      "description": "视频描述",
      "duration": "2分钟",
      "thumbnail": "/images/projects/thumb.jpg"
    }
  ],
  "links": {
    "website": "https://example.com",
    "github": "https://github.com/user/repo"
  },
  "createdAt": "2026-01-15",
  "updatedAt": "2026-01-15"
}
```

### 4. 添加视频文件

将视频文件放入项目文件夹中，确保文件名与 `metadata.json` 中的 `filename` 匹配。

## metadata.json 字段说明

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| name | string | 是 | 项目名称 |
| slug | string | 是 | URL友好的项目标识符（英文） |
| description | string | 是 | 项目简介 |
| coverImage | string | 否 | 封面图片路径 |
| status | string | 是 | 项目状态：进行中/规划中/已完成 |
| tags | string[] | 是 | 项目标签数组 |
| videos | Video[] | 是 | 视频列表 |
| links.website | string | 否 | 项目网站链接 |
| links.github | string | 否 | GitHub仓库链接 |
| createdAt | string | 是 | 创建日期 (YYYY-MM-DD) |
| updatedAt | string | 是 | 更新日期 (YYYY-MM-DD) |

### Video 对象字段

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| title | string | 是 | 视频标题 |
| filename | string | 是 | 视频文件名 |
| description | string | 是 | 视频描述 |
| duration | string | 否 | 视频时长 |
| thumbnail | string | 否 | 视频缩略图路径 |

## 生产环境部署

在生产环境中，可以选择以下方案之一：

### 方案1：使用符号链接（推荐）

在部署时创建符号链接：

```bash
cd public
ln -s ../content content
```

### 方案2：复制文件

在构建脚本中添加复制命令：

```json
{
  "scripts": {
    "prebuild": "cp -r content public/content",
    "build": "next build"
  }
}
```

### 方案3：使用CDN

将视频文件上传到CDN，并在 `metadata.json` 中使用完整URL：

```json
{
  "videos": [
    {
      "filename": "https://cdn.example.com/videos/video.mp4"
    }
  ]
}
```

## 视频格式建议

- **格式**: MP4 (H.264编码)
- **分辨率**: 1920x1080 或 1280x720
- **比特率**: 2-5 Mbps
- **文件大小**: < 50MB (建议)

## 页面功能

### 列表页面 (`/projects/videos`)

- 展示所有视频项目
- 网格布局显示项目卡片
- 显示项目封面、名称、状态、标签
- 悬停效果显示播放按钮
- 统计信息展示

### 详情页面 (`/projects/videos/[slug]`)

- 显示项目完整信息
- 视频播放器（HTML5 video标签）
- 视频下载功能
- 外部链接（网站、GitHub）
- 返回按钮导航

## 示例

参考已有项目：`content/video/奇绩创坛/`

## 注意事项

1. **文件命名**: 建议使用英文文件名，避免特殊字符
2. **视频大小**: 注意视频文件大小，避免影响加载速度
3. **权限管理**: 确保web服务器有读取content目录的权限
4. **Git管理**: 大视频文件建议使用Git LFS或排除在Git之外

## 故障排查

### 视频无法播放

1. 检查符号链接是否正确创建
2. 检查文件路径是否正确
3. 检查视频格式是否为MP4
4. 检查浏览器控制台是否有错误

### 项目不显示

1. 检查 `metadata.json` 格式是否正确
2. 检查项目文件夹结构
3. 重启开发服务器

## 更新日志

- 2026-02-03: 初始版本，实现基础视频项目展示功能
