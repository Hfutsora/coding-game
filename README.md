## 项目简介
+ Code Frog是一款面对7-14周岁青少年的编程学习游戏，以当前很火的佛系青蛙游戏——《旅行青蛙》为背景，让孩子在娱乐中训练编程的逻辑化思维能力。

<div align=center>
<img src="https://se.jisuanke.com/code-game/HFUT_Group4/raw/master/browser_code/src/assets/logo.png">
</div>

## 文档导航
+ [功能测试文档](功能测试文档2.0)
+ [部署文档](部署文档)
+ [接口文档正式版](接口文档v3.0)
+ [接口文档测试版](接口文档v2.0)
+ [接口文档预置版](接口文档v1.0)

## 安装node环境
+ 安装nvm
```
windows
    在以下链接下载安装包，完成安装
    https://github.com/coreybutler/nvm-windows
linux
    curl方式：curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
    wget方式：wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```
+ 用nvm安装node
```
nvm install --lts
```

## 安装MySql
+ 安装方法见官网

## 试运行项目
+ 安装依赖
```
git clone https://se.jisuanke.com/code-game/HFUT_Group4.git
cd HFUT_Group4
cd server_code
npm install
cd browser_code
npm install
```
+ 修改配置
```
cd server_code/config
vim database.js
    将数据库的用户名、密码修改维自己的用户名密码
vim server.js
    修改服务器运行端口，保证没有冲突
```
+ 创建数据库
```
cd server_ceode
node tools/create_database.js 创建数据库
node tools/addMap.js 创建数据库中初始数据
```
+ 运行后台
```
node与pm2二者择一
node:
    cd server_code
    node server
pm2
    cd server_code
    pm2 start server
```
+ 运行前台
```
cd server_code
npm start
```