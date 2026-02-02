# 视频项目 - 快速参考

## 🎯 核心路径

| URL | 页面 |
|-----|------|
| `/projects` | 项目总览（含视频入口） |
| `/projects/videos` | 视频项目列表 |
| `/projects/videos/qiji-creation-camp` | 奇绩创坛项目详情 |

## 📂 关键目录

```
content/video/[项目名]/         # 每个文件夹 = 一个项目
├── metadata.json               # 必需：项目配置
└── *.mp4                       # 视频文件
```

## ⚡ 快速命令

```bash
# 测试配置
node scripts/test-video-projects.js

# 启动开发
npm run dev

# 访问页面
open http://localhost:3000/projects/videos
```

## 📝 metadata.json 模板

```json
{
  "name": "项目名",
  "slug": "project-slug",
  "description": "简介",
  "status": "已完成",
  "tags": ["标签1"],
  "videos": [{
    "title": "视频名",
    "filename": "video.mp4",
    "description": "说明"
  }],
  "createdAt": "2026-02-03",
  "updatedAt": "2026-02-03"
}
```

## 🚀 添加新项目

```bash
# 1. 创建目录
mkdir -p content/video/新项目

# 2. 复制模板
cp content/video/奇绩创坛/metadata.json content/video/新项目/

# 3. 编辑配置
nano content/video/新项目/metadata.json

# 4. 添加视频
cp ~/video.mp4 content/video/新项目/
```

## 📚 完整文档

- **VIDEO_PROJECTS_GUIDE.md** - 完整使用指南
- **VIDEO_PROJECTS_SUMMARY.md** - 实现总结
- **README_VIDEO_SETUP.md** - 技术说明

---

快速参考 | 更新时间: 2026-02-03
