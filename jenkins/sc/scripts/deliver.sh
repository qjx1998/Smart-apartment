#!/usr/bin/env bash

# 删除旧项目
rm -rf /root/nginx/html/admin
# 创建多层目录
mkdir -p /root/nginx/html/admin
# 拷贝新项目到nginx目录下
cp -r dist/. /root/nginx/html/admin
