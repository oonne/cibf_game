#!/bin/bash
# 更新前端项目。在本地编译打包，上传到服务器。

# 获取当前路径
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

# 服务器配置
SERVER_IP=39.99.146.30

# 编译项目
echo "正在编译 web 项目..."
npm run build

# 判断 ./dist 目录是否存在
if [ ! -d ./dist/ ]; then
    echo "编译失败，找不到 dist 目录"
    exit 1
fi

# 压缩本地 dist 目录
echo "正在压缩 dist 目录..."
zip -r toolbox.zip dist -x "*.DS_Store"
rm -rf dist

# 上传到服务器的 /data/web 目录
echo "正在上传 toolbox.zip 到服务器..."
scp toolbox.zip root@$SERVER_IP:/data/web
rm -rf toolbox.zip

# 连接到服务器
ssh root@$SERVER_IP << 'EOF'

# 打开 /data/web 目录
cd /data/web

# 解压 toolbox.zip 到 /data/web 目录
echo "正在解压 toolbox.zip..."
unzip toolbox.zip

# 删除压缩文件
rm -rf toolbox.zip

# 删除原有的 toolbox 目录
rm -rf toolbox

# 将 dist 目录重命名为 toolbox
mv dist toolbox

# 退出服务器
exit
EOF

echo "toolbox 已经更新！"
