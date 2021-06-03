This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 启动数据库

```bash
mkdir blog-data

docker run -v "PATH/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres

#一些postgres命令
\l #list database
\c  # connect to database
\dt # display table
```

## 创建数据库

```bash
# 创建开发环境的数据库
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';

# 创建生产环境的数据库
CREATE DATABASE blog_production ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';

# 创建测试环境的数据库
CREATE DATABASE blog_test ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 创建表

```bash
# 创建migration
yarn m:create -n CreatePosts
# 运行migration 创建表
yarn m:run 
# 回退
yarn m:revert
```

## 创建实体

```bash
yarn e:create -n <entityName>
```



















