# game_admin
基于Ant Design Vue的后台管理系统


## 运行
1、 node 20.4.0 以上版本  
[下载地址](https://nodejs.org/)

2、 全局安装安装 pnpm
```
npm install -g pnpm --registry=http://registry.npmmirror.com
```

3、 使用pnpm安装依赖
```
pnpm install
```

4、修改环境变量（可选）  
* 缺省环境变量： .env
* dev环境变量： .env.dev
* prod环境变量： .env.prod

5、本地运行
* dev环境：  
```
npm run start:dev
```
* prod环境：  
```
npm run start
```

运行后，浏览器访问 [http://localhost:11011](http://localhost:11011/#/) 即可访问  

6、编译
（npde、pnpm环境与上述相同）
```
npm run build
```

## 其他常用命令
1、 清除依赖
删除node_modules文件夹，并执行npm cache clean -f

2、 清除编译缓存
npm run clean
