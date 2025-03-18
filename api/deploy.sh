#!/bin/bash
SERVER_IP=8.129.24.250

# 获取当前路径
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

# 构建镜像
docker compose build
echo "构建镜像完成"

# 保存镜像
rm -rf cibf_api_image.tar
docker save -o cibf_api_image.tar cibf_api
echo "镜像已保存为 cibf_api_image.tar"

# 上传到服务器的 /data/docker_image 目录
echo "正在上传 cibf_api_image 到服务器..."
scp cibf_api_image.tar root@$SERVER_IP:/data/docker_image
rm -rf cibf_api_image.tar

# 连接到服务器
ssh root@$SERVER_IP << 'EOF'

# 停止cibf-api服务
cd /data/bin/cibf-api
docker compose down
echo "cibf-api 已停止"

# 删除旧镜像
docker rmi cibf_api:latest
echo "旧镜像已删除"

# 加载镜像
cd /data/docker_image
docker load -i cibf_api_image.tar
echo "镜像加载完成"

# 删除压缩文件
rm -rf cibf_api_image.tar

# 运行docker-compose
cd /data/bin
sh cibf-api-start.sh

# 退出服务器
exit
EOF

echo "cibf-api已经更新！"
