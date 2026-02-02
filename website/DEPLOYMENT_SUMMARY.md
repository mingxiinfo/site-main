# PM2 部署配置 - 完成总结

## ✅ 已完成的配置

为项目添加了完整的 PM2 部署支持，配置为在 **端口 55655** 运行，监听 **所有 IP 地址 (0.0.0.0)**。

## 📂 创建的文件

### 部署脚本 (scripts/)

```
scripts/
├── README.md                  ✅ 脚本目录说明
├── ecosystem.config.js        ✅ PM2 配置文件
├── deploy.sh                  ✅ 完整部署脚本
├── start.sh                   ✅ 快速启动脚本
├── stop.sh                    ✅ 停止脚本
├── restart.sh                 ✅ 重启脚本
└── logs.sh                    ✅ 日志查看脚本
```

### 文档文件

```
website/
├── PM2_DEPLOYMENT_GUIDE.md    ✅ 完整部署指南
├── PM2_QUICK_START.md         ✅ 快速开始指南
└── DEPLOYMENT_SUMMARY.md      ✅ 本文件
```

### 配置更新

- ✅ `package.json` - 添加了 PM2 相关 npm 脚本
- ✅ `.gitignore` - 添加了日志文件忽略规则

## 🎯 核心配置

### PM2 配置 (ecosystem.config.js)

```javascript
{
  name: 'mingxi-website',
  script: 'node_modules/next/dist/bin/next',
  args: 'start -H 0.0.0.0 -p 55655',
  instances: 1,
  autorestart: true,
  max_memory_restart: '1G',
  env: {
    NODE_ENV: 'production',
    PORT: 55655,
    HOSTNAME: '0.0.0.0'
  }
}
```

### 关键特性

- **端口**: 55655
- **监听地址**: 0.0.0.0 (所有 IP)
- **进程名**: mingxi-website
- **自动重启**: 启用
- **内存限制**: 1GB
- **日志记录**: 自动记录到 logs/ 目录

## 🚀 使用方法

### 快速部署（推荐）

```bash
npm run pm2:deploy
```

这个命令会自动完成：
1. 检查依赖（Node.js, PM2）
2. 安装项目依赖
3. 设置符号链接
4. 构建生产版本
5. 启动 PM2 进程
6. 配置开机自启

### NPM 命令一览

| 命令 | 功能 |
|------|------|
| `npm run pm2:deploy` | 完整部署流程 |
| `npm run pm2:start` | 启动应用 |
| `npm run pm2:stop` | 停止应用 |
| `npm run pm2:restart` | 重启应用 |
| `npm run pm2:logs` | 查看日志 |
| `npm run pm2:status` | 查看状态 |
| `npm run pm2:monit` | 监控面板 |

### 直接使用脚本

```bash
# 完整部署
bash scripts/deploy.sh

# 快速启动
bash scripts/start.sh

# 停止
bash scripts/stop.sh

# 重启
bash scripts/restart.sh

# 查看日志
bash scripts/logs.sh
```

## 🌐 访问地址

部署成功后，可通过以下方式访问：

### 本地访问
```
http://localhost:55655
```

### 局域网访问
```
http://[服务器IP]:55655
```

例如：
- `http://192.168.1.100:55655`
- `http://10.0.0.50:55655`

### 获取服务器 IP

```bash
# Linux/Mac
hostname -I

# 或
ifconfig | grep "inet "
```

## 📊 部署流程

### 首次部署

```bash
# 1. 克隆项目（如果还没有）
git clone <repository-url>
cd website

# 2. 安装 PM2（如果还没有）
npm install -g pm2

# 3. 一键部署
npm run pm2:deploy

# 4. 验证
npm run pm2:status
```

### 代码更新部署

```bash
# 1. 拉取最新代码
git pull

# 2. 重新部署
npm run pm2:deploy

# 或快速重启（不重新构建）
npm run pm2:restart
```

### 检查运行状态

```bash
# 查看进程列表
npm run pm2:status

# 查看详细信息
pm2 info mingxi-website

# 实时监控
npm run pm2:monit

# 查看日志
npm run pm2:logs
```

## 📝 日志管理

### 日志文件位置

```
logs/
├── pm2-error.log    # 错误日志
└── pm2-out.log      # 标准输出日志
```

### 查看日志

```bash
# 实时查看（推荐）
npm run pm2:logs

# 查看最近输出
tail -f logs/pm2-out.log

# 查看错误日志
tail -f logs/pm2-error.log

# 查看最近 100 行
tail -n 100 logs/pm2-out.log
```

### 清空日志

```bash
pm2 flush
```

## 🔧 故障排查

### 问题1: PM2 未安装

```bash
npm install -g pm2
```

### 问题2: 端口被占用

```bash
# 查找占用进程
lsof -i :55655

# 杀死进程
kill -9 <PID>

# 重启应用
npm run pm2:restart
```

### 问题3: 应用启动失败

```bash
# 查看错误日志
npm run pm2:logs

# 检查构建
ls -la .next/

# 重新构建
npm run build
npm run pm2:restart
```

### 问题4: 访问不到应用

检查：
1. 防火墙是否开放 55655 端口
2. 应用是否正在运行 (`npm run pm2:status`)
3. 端口是否被其他程序占用

```bash
# 检查端口监听
netstat -tuln | grep 55655

# 或
lsof -i :55655
```

## ⚙️ 高级配置

### 修改端口

编辑 `scripts/ecosystem.config.js`:

```javascript
env: {
  PORT: 8080,  // 改为你想要的端口
  HOSTNAME: '0.0.0.0'
},
args: 'start -H 0.0.0.0 -p 8080',  // 同步修改
```

### 增加实例数（集群模式）

```javascript
instances: 2,  // 或 'max' 使用所有 CPU
exec_mode: 'cluster'
```

### 调整内存限制

```javascript
max_memory_restart: '2G',  // 增加到 2GB
```

### 添加环境变量

```javascript
env: {
  NODE_ENV: 'production',
  PORT: 55655,
  HOSTNAME: '0.0.0.0',
  DATABASE_URL: 'your-database-url',  // 添加其他变量
  API_KEY: 'your-api-key'
}
```

## 🔐 生产环境建议

### 1. 配置防火墙

```bash
# UFW (Ubuntu)
sudo ufw allow 55655/tcp

# firewalld (CentOS/RHEL)
sudo firewall-cmd --add-port=55655/tcp --permanent
sudo firewall-cmd --reload
```

### 2. 使用 Nginx 反向代理

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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 3. 启用 SSL (HTTPS)

```bash
# 使用 Certbot
sudo certbot --nginx -d yourdomain.com
```

### 4. 设置日志轮转

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### 5. 配置开机自启

```bash
pm2 startup
pm2 save
```

## 📚 完整文档

详细信息请参考：

1. **PM2_QUICK_START.md** - 快速开始（5分钟上手）
2. **PM2_DEPLOYMENT_GUIDE.md** - 完整部署指南（深入了解）
3. **scripts/README.md** - 脚本说明文档

## 🎯 测试部署

在实际部署前，建议先在本地测试：

```bash
# 1. 构建项目
npm run build

# 2. 启动 PM2
npm run pm2:start

# 3. 测试访问
curl http://localhost:55655

# 4. 查看状态
npm run pm2:status

# 5. 停止
npm run pm2:stop
```

## ✅ 部署检查清单

部署前确认：

- [ ] Node.js 版本 >= 18
- [ ] PM2 已全局安装
- [ ] 项目依赖已安装 (`npm install`)
- [ ] 符号链接已创建 (`public/content -> ../content`)
- [ ] 防火墙开放 55655 端口
- [ ] 构建成功 (`npm run build`)

部署后验证：

- [ ] PM2 进程运行中 (`pm2 list`)
- [ ] 应用可访问 (`curl http://localhost:55655`)
- [ ] 日志正常 (`pm2 logs`)
- [ ] 内存/CPU 正常 (`pm2 monit`)

## 🎉 总结

已成功为项目配置 PM2 部署支持：

✅ **部署脚本完整** - 7个脚本文件，覆盖所有场景
✅ **配置优化** - 端口 55655，监听所有 IP
✅ **文档齐全** - 3份详细文档，快速上手
✅ **NPM 集成** - 7个便捷命令，开箱即用
✅ **日志管理** - 自动记录，便于排查
✅ **自动重启** - 进程守护，稳定运行

现在你可以使用 `npm run pm2:deploy` 一键部署项目到生产环境！

---

部署配置 | 端口: 55655 | 监听: 0.0.0.0 | 创建时间: 2026-02-03
