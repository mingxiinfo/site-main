# PM2 部署指南

## 📖 概述

本项目使用 PM2 进行生产环境部署，配置为在端口 **55655** 运行，监听所有 IP 地址（0.0.0.0）。

## 🚀 快速开始

### 一键部署

```bash
npm run pm2:deploy
```

这个命令会自动完成以下操作：
1. ✅ 检查环境依赖（Node.js, PM2）
2. 📦 安装项目依赖
3. 🔗 设置符号链接
4. 🔨 构建生产版本
5. 📁 创建日志目录
6. ⏹️  停止旧进程
7. 🚀 启动新进程
8. 💾 保存 PM2 配置
9. ⚙️  设置开机自启

## 📋 前置要求

### 必需软件

- **Node.js**: v18+ (推荐 LTS 版本)
- **npm**: v9+
- **PM2**: 全局安装

### 安装 PM2

```bash
npm install -g pm2
```

验证安装：
```bash
pm2 --version
```

## 📂 部署脚本

### 主要脚本文件

```
scripts/
├── ecosystem.config.js    # PM2 配置文件 ⭐
├── deploy.sh              # 完整部署脚本
├── start.sh               # 快速启动
├── stop.sh                # 停止应用
├── restart.sh             # 重启应用
└── logs.sh                # 查看日志
```

### ecosystem.config.js 配置

```javascript
{
  name: 'mingxi-website',           // 应用名称
  script: 'node_modules/next/dist/bin/next',
  args: 'start -H 0.0.0.0 -p 55655',
  instances: 1,                      // 实例数量
  autorestart: true,                 // 自动重启
  max_memory_restart: '1G',          // 内存限制
  env: {
    NODE_ENV: 'production',
    PORT: 55655,
    HOSTNAME: '0.0.0.0'
  }
}
```

## 🎯 NPM 命令

### 部署相关

| 命令 | 说明 | 等同于 |
|------|------|--------|
| `npm run pm2:deploy` | 完整部署流程 | `bash scripts/deploy.sh` |
| `npm run pm2:start` | 启动应用 | `bash scripts/start.sh` |
| `npm run pm2:stop` | 停止应用 | `bash scripts/stop.sh` |
| `npm run pm2:restart` | 重启应用 | `bash scripts/restart.sh` |
| `npm run pm2:logs` | 查看日志 | `bash scripts/logs.sh` |
| `npm run pm2:status` | 查看状态 | `pm2 status` |
| `npm run pm2:monit` | 监控面板 | `pm2 monit` |

### 常用命令组合

```bash
# 首次部署
npm run pm2:deploy

# 代码更新后重新部署
git pull
npm run pm2:deploy

# 快速重启（不重新构建）
npm run pm2:restart

# 查看应用状态
npm run pm2:status

# 实时查看日志
npm run pm2:logs
```

## 🔧 PM2 原生命令

### 基础操作

```bash
# 启动应用
pm2 start scripts/ecosystem.config.js --env production

# 停止应用
pm2 stop mingxi-website

# 重启应用
pm2 restart mingxi-website

# 删除应用
pm2 delete mingxi-website

# 查看所有应用
pm2 list

# 查看详细信息
pm2 info mingxi-website
```

### 日志管理

```bash
# 实时查看日志
pm2 logs mingxi-website

# 查看最近 100 行日志
pm2 logs mingxi-website --lines 100

# 清空日志
pm2 flush

# 查看错误日志
pm2 logs mingxi-website --err
```

### 监控和调试

```bash
# 监控面板（实时 CPU/内存）
pm2 monit

# 查看元数据
pm2 describe mingxi-website

# 查看进程信息
pm2 show mingxi-website
```

### 配置保存

```bash
# 保存当前进程列表
pm2 save

# 恢复保存的进程
pm2 resurrect

# 清除保存的进程
pm2 cleardump
```

### 开机自启

```bash
# 生成启动脚本
pm2 startup

# 取消开机自启
pm2 unstartup
```

## 🌐 访问地址

部署成功后，可以通过以下地址访问：

- **本地访问**: http://localhost:55655
- **局域网访问**: http://[你的IP]:55655
- **所有IP**: http://0.0.0.0:55655

### 获取服务器 IP

```bash
# Linux/Mac
hostname -I

# 或
ifconfig | grep "inet "

# 或
ip addr show
```

## 📝 日志文件

日志文件位置：

```
website/logs/
├── pm2-error.log          # 错误日志
└── pm2-out.log            # 标准输出日志
```

查看日志：

```bash
# 实时查看输出日志
tail -f logs/pm2-out.log

# 实时查看错误日志
tail -f logs/pm2-error.log

# 查看最近 50 行
tail -n 50 logs/pm2-out.log
```

## 🔍 故障排查

### 问题1: PM2 未安装

**错误信息**:
```
command not found: pm2
```

**解决方案**:
```bash
npm install -g pm2
```

### 问题2: 端口被占用

**错误信息**:
```
Error: listen EADDRINUSE: address already in use :::55655
```

**解决方案**:
```bash
# 查找占用端口的进程
lsof -i :55655

# 或
netstat -tuln | grep 55655

# 杀死进程（替换 PID）
kill -9 <PID>

# 然后重新启动
npm run pm2:restart
```

### 问题3: 应用无法启动

**检查步骤**:

1. 查看日志
```bash
npm run pm2:logs
```

2. 检查构建文件
```bash
ls -la .next/
```

3. 重新构建
```bash
npm run build
npm run pm2:restart
```

### 问题4: 内存不足

**错误信息**:
```
max_memory_restart exceeded
```

**解决方案**:

编辑 `scripts/ecosystem.config.js`，增加内存限制：
```javascript
max_memory_restart: '2G',  // 增加到 2G
```

### 问题5: 自动重启次数过多

**检查**:
```bash
pm2 info mingxi-website
```

如果看到 `restart_time` 很高，说明应用反复崩溃。

**排查**:
1. 查看错误日志找出根本原因
2. 检查依赖是否完整安装
3. 验证环境变量配置

## ⚙️ 高级配置

### 多实例集群模式

编辑 `scripts/ecosystem.config.js`:

```javascript
{
  instances: 'max',  // 使用所有 CPU 核心
  exec_mode: 'cluster'
}
```

### 自定义环境变量

```javascript
env: {
  NODE_ENV: 'production',
  PORT: 55655,
  HOSTNAME: '0.0.0.0',
  DATABASE_URL: 'your-database-url',
  API_KEY: 'your-api-key'
}
```

### 监听文件变化（开发模式）

```javascript
{
  watch: true,
  ignore_watch: ['node_modules', 'logs', '.next']
}
```

### Cron 重启

每天凌晨 3 点重启：

```javascript
{
  cron_restart: '0 3 * * *'
}
```

## 🚢 生产环境最佳实践

### 1. 使用非 root 用户

```bash
# 创建专用用户
sudo useradd -m -s /bin/bash nodeapp

# 切换用户
su - nodeapp
```

### 2. 使用进程管理器守护

```bash
# 设置开机自启
pm2 startup
pm2 save
```

### 3. 配置反向代理（Nginx）

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:55655;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. 设置日志轮转

安装 pm2-logrotate:
```bash
pm2 install pm2-logrotate

# 配置
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### 5. 监控和告警

使用 PM2 Plus (可选):
```bash
pm2 link <secret> <public>
```

## 📊 性能优化

### 优化构建

```bash
# 分析 bundle 大小
npm run build -- --analyze

# 清理缓存
rm -rf .next
npm run build
```

### 内存优化

在 `ecosystem.config.js` 中:
```javascript
{
  node_args: '--max-old-space-size=2048'  // 增加 Node.js 堆内存
}
```

### CPU 优化

```javascript
{
  instances: 2,  // 根据服务器配置调整
  exec_mode: 'cluster'
}
```

## 🔐 安全建议

1. **使用环境变量存储敏感信息**
```javascript
env: {
  DATABASE_URL: process.env.DATABASE_URL
}
```

2. **限制文件访问权限**
```bash
chmod 600 scripts/ecosystem.config.js
```

3. **使用防火墙**
```bash
# 只允许特定 IP 访问
sudo ufw allow from 192.168.1.0/24 to any port 55655
```

4. **启用 HTTPS**（通过 Nginx 反向代理）

## 📞 技术支持

遇到问题时：

1. 查看本文档的故障排查部分
2. 检查日志文件：`npm run pm2:logs`
3. 查看 PM2 状态：`npm run pm2:status`
4. 检查系统资源：`pm2 monit`

## 🔗 相关资源

- [PM2 官方文档](https://pm2.keymetrics.io/docs/)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [PM2 Plus 监控](https://app.pm2.io/)

---

最后更新: 2026-02-03
版本: 1.0.0
