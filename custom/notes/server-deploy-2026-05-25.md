# 服务器部署记录：CNAS成交页 2026-05-25

## 部署时间

2026-05-25 20:47:55 CST

## 服务器信息

- 服务器 IP：123.60.14.103
- 部署目录：/www/wwwroot/cnas-path
- Git 仓库：https://github.com/yinuocheng123-cloud/2cnas.git
- 分支：main
- 最新 commit：1ee3738735548f14a998d6038a40d86d8f06e664

## 部署方式

服务器到 GitHub HTTPS clone 连续出现 TLS 连接中断，本次改用本地已推送版本生成 git bundle，经 SCP 上传到服务器后从 bundle 克隆，并将 origin 设置回 GitHub 仓库。

## 静态站状态

- 项目类型：纯静态 HTML/CSS/JS
- PM2：不需要
- 端口：不需要单独端口
- 静态文件检查：index.html、styles.css、script.js、assets/wecom-qr-placeholder.png 均存在。

## Nginx 配置

- 配置文件：/www/server/panel/vhost/nginx/path.cnaszhinan.com.conf
- 监听：80
- 域名：path.cnaszhinan.com
- root：/www/wwwroot/cnas-path

## 环境与真实配置

- 企业微信二维码：当前保留 assets/wecom-qr-placeholder.png 占位图。
- 真实电话：暂未替换。
- 真实微信 / 企业微信：暂未替换。
- 真实邮箱：暂未替换。
- LEAD_FORM_ENDPOINT：暂未配置，成交页表单只能模拟提交。

## SSL 状态

已配置 SSL。证书路径：/etc/letsencrypt/live/path.cnaszhinan.com/fullchain.pem；到期时间：2026-08-23。HTTP 已跳转 HTTPS。

## 测试结果

- Nginx Host 测试 path.cnaszhinan.com：200 OK。
- HTTPS 测试 path.cnaszhinan.com：200 OK；HTTP 已 301 跳转 HTTPS。
- 静态首页返回 index.html 正常。
- 风险词扫描：未发现 CNAS认证、包过、保证通过、官方指定、唯一、最权威、100%通过、必过。
- 真实线上表单提交未完成，因为 LEAD_FORM_ENDPOINT 暂未配置。

## 未完成项

- DNS 解析到 123.60.14.103。
- SSL 证书申请与强制 HTTPS：已完成。
- 替换真实企业微信二维码。
- 替换真实电话、微信 / 企业微信、邮箱。
- 配置真实 LEAD_FORM_ENDPOINT。
- 完成线上真实表单提交测试。
