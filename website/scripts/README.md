# Scripts 目录说明

本目录包含项目的部署和管理脚本。

## 📁 文件列表

| 文件 | 说明 | 用途 |
|------|------|------|
| `ecosystem.config.js` | PM2 配置文件 | 定义 PM2 进程配置 |
| `deploy.sh` | 完整部署脚本 | 一键部署到生产环境 |
| `start.sh` | 启动脚本 | 快速启动应用 |
| `stop.sh` | 停止脚本 | 停止运行中的应用 |
| `restart.sh` | 重启脚本 | 重启应用 |
| `logs.sh` | 日志查看脚本 | 实时查看应用日志 |
| `test-video-projects.js` | 视频项目测试 | 验证视频项目配置 |

## 🚀 PM2 部署脚本

### ecosystem.config.js

PM2 进程管理配置文件，包含：

- **应用名称**: mingxi-website
- **端口**: 55655
- **主机**: 0.0.0.0 (监听所有 IP)
- **实例数**: 1
- **自动重启**: 启用
- **内存限制**: 1GB
- **日志文件**: logs/pm2-error.log, logs/pm2-out.log

**使用方法**:
```bash
pm2 start scripts/ecosystem.config.js --env production
```

### deploy.sh

完整的部署脚本，自动执行：

1. ✅ 检查环境依赖（Node.js, PM2）
2. 📦 安装项目依赖
3. 🔗 设置符号链接（public/content）
4. 🔨 构建生产版本
5. 📁 创建日志目录
6. ⏹️  停止现有进程
7. 🚀 启动新进程
8. 💾 保存 PM2 配置
9. ⚙️  设置开机自启

**使用方法**:
```bash
bash scripts/deploy.sh
# 或
npm run pm2:deploy
```

### start.sh

快速启动脚本，用于已构建的项目。

**前置条件**:
- 项目已构建（存在 .next 目录）
- PM2 已安装

**使用方法**:
```bash
bash scripts/start.sh
# 或
npm run pm2:start
```

### stop.sh

停止运行中的应用。

**使用方法**:
```bash
bash scripts/stop.sh
# 或
npm run pm2:stop
```

### restart.sh

重启应用，如果未运行则启动。

**使用方法**:
```bash
bash scripts/restart.sh
# 或
npm run pm2:restart
```

### logs.sh

实时查看应用日志。

**使用方法**:
```bash
bash scripts/logs.sh
# 或
npm run pm2:logs
```

按 `Ctrl+C` 退出日志查看。

## 🎯 NPM 脚本集成

所有脚本都已集成到 `package.json` 中：

```json
{
  "scripts": {
    "pm2:deploy": "bash scripts/deploy.sh",
    "pm2:start": "bash scripts/start.sh",
    "pm2:stop": "bash scripts/stop.sh",
    "pm2:restart": "bash scripts/restart.sh",
    "pm2:logs": "bash scripts/logs.sh",
    "pm2:status": "pm2 status",
    "pm2:monit": "pm2 monit"
  }
}
```

## 📝 视频项目测试脚本

### test-video-projects.js

验证视频项目配置的测试脚本。

**功能**:
- 检查 content/video 目录
- 验证 metadata.json 格式
- 检查视频文件存在性
- 验证符号链接配置

**使用方法**:
```bash
node scripts/test-video-projects.js
```

## 🔧 开发流程

### 本地开发
```bash
npm run dev
```

### 构建测试
```bash
npm run build
npm start
```

### 生产部署
```bash
# 首次部署
npm run pm2:deploy

# 代码更新后
git pull
npm run pm2:deploy

# 快速重启
npm run pm2:restart
```

## 📊 监控和管理

### 查看状态
```bash
npm run pm2:status
```

### 实时监控
```bash
npm run pm2:monit
```

### 查看日志
```bash
npm run pm2:logs
```

### 查看详细信息
```bash
pm2 info mingxi-website
```

## 🛠️ 故障排查

### 检查进程状态
```bash
pm2 list
pm2 info mingxi-website
```

### 查看错误日志
```bash
tail -f logs/pm2-error.log
```

### 重新部署
```bash
npm run pm2:stop
rm -rf .next
npm run build
npm run pm2:start
```

### 端口冲突
```bash
# 查找占用端口的进程
lsof -i :55655

# 杀死进程
kill -9 <PID>

# 重启
npm run pm2:restart
```

## 📚 相关文档

- **PM2_QUICK_START.md** - 快速开始指南
- **PM2_DEPLOYMENT_GUIDE.md** - 完整部署文档
- **VIDEO_PROJECTS_GUIDE.md** - 视频项目使用指南

## 🔐 权限说明

所有 `.sh` 脚本都已设置可执行权限：

```bash
chmod +x scripts/*.sh
```

如果执行脚本时遇到权限问题，手动设置：

```bash
chmod +x scripts/deploy.sh
chmod +x scripts/start.sh
chmod +x scripts/stop.sh
chmod +x scripts/restart.sh
chmod +x scripts/logs.sh
```

## 🌐 网络配置

### 默认配置
- **端口**: 55655
- **主机**: 0.0.0.0 (监听所有网络接口)

### 修改端口

编辑 `scripts/ecosystem.config.js`:

```javascript
env: {
  PORT: 8080,  // 修改为其他端口
  HOSTNAME: '0.0.0.0'
}
```

同时修改 `args`:
```javascript
args: 'start -H 0.0.0.0 -p 8080',
```

### 仅本地访问

将 `0.0.0.0` 改为 `127.0.0.1`:

```javascript
env: {
  PORT: 55655,
  HOSTNAME: '127.0.0.1'
}
```

## 📞 技术支持

如有问题，请：
1. 查看脚本执行输出
2. 检查日志文件
3. 运行测试脚本
4. 参考完整文档

---

Scripts 目录 | 最后更新: 2026-02-03
