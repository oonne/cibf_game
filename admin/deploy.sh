#!/bin/bash
# 更新前端项目。在本地编译打包，上传到服务器。

# 获取当前路径
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

# 服务器配置
SERVER_IP=8.129.24.250

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
zip -r cibf_admin.zip dist -x "*.DS_Store"
rm -rf dist

# 上传到服务器的 /data/web 目录
echo "正在上传 cibf_admin.zip 到服务器..."
scp cibf_admin.zip root@$SERVER_IP:/data/web
rm -rf cibf_admin.zip

# 连接到服务器
ssh root@$SERVER_IP << 'EOF'

# 打开 /data/web 目录
cd /data/web

# 解压 cibf_admin.zip 到 /data/web 目录
echo "正在解压 cibf_admin.zip..."
unzip cibf_admin.zip

# 删除压缩文件
rm -rf cibf_admin.zip

# 删除原有的 cibf_admin 目录
rm -rf cibf_admin

# 将 dist 目录重命名为 cibf_admin
mv dist cibf_admin

# 退出服务器
exit
EOF

echo "cibf_admin 已经更新！"
