#!/bin/bash

# Mingxi-Info Website Deployment Script
# 部署到端口 55655，监听所有 IP

set -e  # 遇到错误立即退出

echo "🚀 开始部署 Mingxi-Info 网站..."

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ 错误: 未找到 package.json，请在项目根目录运行此脚本${NC}"
    exit 1
fi

# 1. 检查依赖
echo -e "\n${BLUE}📦 检查依赖...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js 未安装${NC}"
    exit 1
fi

if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}⚠️  PM2 未安装，正在安装...${NC}"
    npm install -g pm2
fi

echo -e "${GREEN}✓ Node.js 版本: $(node --version)${NC}"
echo -e "${GREEN}✓ npm 版本: $(npm --version)${NC}"
echo -e "${GREEN}✓ PM2 版本: $(pm2 --version)${NC}"

# 2. 安装依赖
echo -e "\n${BLUE}📥 安装项目依赖...${NC}"
npm install

# 3. 创建符号链接
echo -e "\n${BLUE}🔗 设置内容目录符号链接...${NC}"
cd public
if [ -L "content" ]; then
    echo -e "${YELLOW}符号链接已存在，跳过${NC}"
elif [ -e "content" ]; then
    echo -e "${YELLOW}content 已存在但不是符号链接，备份...${NC}"
    mv content content.backup.$(date +%Y%m%d_%H%M%S)
    ln -s ../content content
    echo -e "${GREEN}✓ 符号链接已创建${NC}"
else
    ln -s ../content content
    echo -e "${GREEN}✓ 符号链接已创建${NC}"
fi
cd ..

# 4. 构建项目
echo -e "\n${BLUE}🔨 构建生产版本...${NC}"
npm run build

# 5. 创建日志目录
echo -e "\n${BLUE}📁 创建日志目录...${NC}"
mkdir -p logs
echo -e "${GREEN}✓ 日志目录已创建${NC}"

# 6. 停止现有进程
echo -e "\n${BLUE}⏹️  停止现有 PM2 进程...${NC}"
if pm2 describe mingxi-website > /dev/null 2>&1; then
    pm2 stop mingxi-website
    pm2 delete mingxi-website
    echo -e "${GREEN}✓ 已停止旧进程${NC}"
else
    echo -e "${YELLOW}未找到运行中的进程${NC}"
fi

# 7. 启动 PM2
echo -e "\n${BLUE}🚀 使用 PM2 启动应用...${NC}"
pm2 start scripts/ecosystem.config.js --env production

# 8. 保存 PM2 配置
echo -e "\n${BLUE}💾 保存 PM2 配置...${NC}"
pm2 save

# 9. 设置开机自启（可选）
echo -e "\n${BLUE}⚙️  设置 PM2 开机自启...${NC}"
pm2 startup || echo -e "${YELLOW}请手动运行 PM2 提示的命令来设置开机自启${NC}"

# 10. 显示状态
echo -e "\n${BLUE}📊 应用状态:${NC}"
pm2 list

echo -e "\n${BLUE}📊 应用详情:${NC}"
pm2 info mingxi-website

# 11. 显示日志路径
echo -e "\n${GREEN}✅ 部署完成！${NC}"
echo -e "\n${BLUE}📝 日志文件:${NC}"
echo -e "  错误日志: $(pwd)/logs/pm2-error.log"
echo -e "  输出日志: $(pwd)/logs/pm2-out.log"

echo -e "\n${BLUE}🌐 访问地址:${NC}"
echo -e "  本地: ${GREEN}http://localhost:55655${NC}"
echo -e "  局域网: ${GREEN}http://$(hostname -I | awk '{print $1}'):55655${NC}"
echo -e "  所有IP: ${GREEN}http://0.0.0.0:55655${NC}"

echo -e "\n${BLUE}🔧 常用命令:${NC}"
echo -e "  查看日志: ${YELLOW}pm2 logs mingxi-website${NC}"
echo -e "  停止应用: ${YELLOW}pm2 stop mingxi-website${NC}"
echo -e "  重启应用: ${YELLOW}pm2 restart mingxi-website${NC}"
echo -e "  查看状态: ${YELLOW}pm2 status${NC}"
echo -e "  查看详情: ${YELLOW}pm2 info mingxi-website${NC}"
echo -e "  监控面板: ${YELLOW}pm2 monit${NC}"

echo -e "\n${GREEN}🎉 部署成功！应用正在端口 55655 运行${NC}\n"
