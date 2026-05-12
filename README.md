# CNAS认可路径判断静态网站

## 项目说明
这是一个纯静态 HTML 网站，用于展示 CNAS 认可路径判断、实验室体系建设、评审准备与整改陪跑服务。

当前版本包含：

- 首页解决方案内容
- CNAS认可路径判断问卷
- 提交后初步路径判断结果
- 提交中、提交成功、提交失败状态
- UTM 参数采集
- 私域承接联系方式占位
- CNAS知识库入口
- robots、sitemap、manifest、404 页面

## 如何本地查看
本项目不需要 `npm run dev`，也不需要 build。

直接打开：

`index.html`

## 如何部署到宝塔/Nginx
将本目录内所有文件上传到网站根目录即可。

网站根目录应直接包含：

- `index.html`
- `styles.css`
- `script.js`
- `assets/`
- `README.md`
- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
- `404.html`

如果通过宝塔上传压缩包，解压后请确认 `index.html` 位于网站根目录，而不是多一层目录。

## 如何替换表单接口
打开 `script.js`，找到：

```js
const LEAD_FORM_ENDPOINT = "";
```

正式投放前必须替换为真实 Formspree、Getform 或自有后端接口，否则线索不会保存。

当前提交逻辑使用 `fetch` 发送 JSON payload。payload 包含企业名称、联系人、手机号、实验室类型、当前阶段、最担心的问题、计划启动时间、补充说明、来源页面、UTM 参数、提交时间和初步诊断结果摘要。

如使用第三方表单服务，请根据服务要求调整请求格式。

## 如何替换真实域名
正式绑定域名后，需要替换以下文件中的 `https://example.com/`：

- `robots.txt`
- `sitemap.xml`

如需更完整的分享卡片，也应在 `index.html` 中补充真实 `og:url`。

## 如何替换联系方式
当前联系方式均为占位：

- 电话：待填写
- 微信：待填写
- 邮箱：待填写
- 企业微信：待填写

正式投放前请在 `index.html` 中搜索以上占位并替换为真实信息。

## 正式投放前提醒
本页面提供 CNAS 认可路径判断与准备建议，不代表 CNAS 官方审核意见，也不承诺认可结果。
