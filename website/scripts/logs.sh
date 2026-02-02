#!/bin/bash

# 查看日志脚本

# 检查 PM2
if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 未安装"
    exit 1
fi

echo "📝 查看应用日志..."
echo "提示: 按 Ctrl+C 退出日志查看"
echo ""

# 实时查看日志
pm2 logs mingxi-website
