#!/bin/bash

# 重启应用脚本

set -e

echo "🔄 重启 Mingxi-Info 网站..."

# 检查 PM2
if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 未安装"
    exit 1
fi

# 重启应用
if pm2 describe mingxi-website > /dev/null 2>&1; then
    pm2 restart mingxi-website
    echo "✅ 应用已重启"
    pm2 list
else
    echo "⚠️  应用未在运行，尝试启动..."
    ./scripts/start.sh
fi
