#!/bin/bash

# 停止应用脚本

set -e

echo "⏹️  停止 Mingxi-Info 网站..."

# 检查 PM2
if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 未安装"
    exit 1
fi

# 停止应用
if pm2 describe mingxi-website > /dev/null 2>&1; then
    pm2 stop mingxi-website
    echo "✅ 应用已停止"
    pm2 list
else
    echo "⚠️  应用未在运行"
fi
