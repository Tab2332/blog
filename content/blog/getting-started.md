---
title: Cloudflare Workers 部署避坑清单
description: 这是一份我在真实部署中踩过坑后的最小可行清单，按顺序执行几乎不会翻车。
date: 2026-05-07
category: Deployment
image: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80
---

这篇给准备上线个人博客的同学，重点是“少走弯路”。

## 1) 先确认三项绑定

- Worker 脚本
- D1 数据库
- R2 存储桶

三者账号必须一致，否则会出现“本地能过、线上报权限错误”的情况。

## 2) 优先排查 `wrangler.jsonc`

最常见问题都在这：

- `database_id` 不匹配  
- `bucket_name` 不存在  
- `routes` 指向了不在当前账号下的域名  
- `logpush: true` 但账号没有对应权限

## 3) 区分构建变量和运行变量

以 `VITE_BASE_URL` 为例，它是构建期变量。  
如果只配在 runtime variables，页面里还是会出现 `localhost:3000`。

## 4) 上线后立刻做的两个验证

```bash
curl -s 'https://你的域名/' | grep localhost
curl -i 'https://你的域名/api/auth/get-session'
```

第一条确认 SEO 元标签不再是本地地址；  
第二条确认鉴权接口能正常返回 `null` 或 session JSON。
