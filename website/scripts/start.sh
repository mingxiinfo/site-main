#!/bin/bash

# 快速启动脚本 - 使用 PM2 启动应用

set -e

echo "🚀 启动 Mingxi-Info 网站..."

# 检查是否已构建
if [ ! -d ".next" ]; then
    echo "❌ 错误: 未找到构建文件，请先运行 npm run build"
    exit 1
fi

# 检查 PM2
if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 未安装，请先安装: npm install -g pm2"
    exit 1
fi

# 创建日志目录
mkdir -p logs

# 启动应用
pm2 start scripts/ecosystem.config.js --env production

# 显示状态
pm2 list

echo ""
echo "✅ 应用已启动！"
echo "🌐 访问地址: http://0.0.0.0:55655"
echo "📝 查看日志: pm2 logs mingxi-website"
