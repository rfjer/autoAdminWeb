## 在测试环境下搭建 autoAdminWeb

### 安装nodejs

nodejs下载地址： https://nodejs.org/zh-cn/

建议下载8.x版本

#### 在windows上安装nodejs

下载  `node-v8.xx.msi`文件，然后双击运行，下一步、下一步即可安装成功，安装完成后需要将nodejs安装路径加入到系统环境变量里即可

在`cmd`下运行node命令，检查是否安装成功

```
C:\>node -v
v8.11.3
```





### 部署autoAdminWeb

#### 下载源码

```
git clone https://github.com/rfjer/autoAdminWeb.git
```



#### 安装autoAdminWeb相关依赖包

```
cd autoAdminWeb
npm install --registry=https://registry.npm.taobao.org
```

> npm install 这步可能会出错， `WARN`可以直接忽略，如果出现`ERR` ， 大家可以截图发群里，寻求帮助



#### 修改配置

开发环境的配置文件为： autoAdminWeb/config/dev.env.js

只需要配置下后端的API域名就可以了

```
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://127.0.0.1:8000/"'
})
```

> 修改`BASE_API`指向的后端地址就可以了， 注意这里的引号，





#### 起动服务

```
npm run dev
```



然后就可通过浏览器访问：`http://127.0.0.1:8080`

