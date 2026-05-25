# CNAS认可指南成交页部署配置说明

## 1. 本轮目标

本轮进入上线配置阶段，只整理部署配置说明和真实配置替换准备，不新增业务功能，不接增长中台，不新增数据库，不重构页面。

成交页推荐作为 `https://path.cnaszhinan.com` 的路径判断成交页，用于承接投放、私域和主站跳转流量。

## 2. 推荐部署平台

成交页是纯静态 HTML/CSS/JS 项目，不需要 `npm run dev`，不需要 build。

推荐部署方式：

- Vercel 静态站点
- Netlify 静态站点
- Cloudflare Pages 静态站点
- 宝塔 / Nginx 静态目录
- 对象存储 + CDN

如果希望最快试运行，可以直接将仓库文件部署为静态站点，确保站点根目录直接包含 `index.html`。

## 3. 推荐域名

推荐正式域名：

```text
https://path.cnaszhinan.com
```

也可以后续按主站路由规划部署到：

```text
https://cnaszhinan.com/path
```

本轮推荐先使用独立子域名，便于投放统计、静态缓存和成交页快速调整。

## 4. GitHub 仓库与部署分支

- GitHub 仓库地址：`https://github.com/yinuocheng123-cloud/2cnas`
- 部署分支：`main`
- 部署平台需要从 GitHub 仓库 `yinuocheng123-cloud/2cnas` 拉取代码。

静态部署时站点根目录应包含：

```text
index.html
styles.css
script.js
assets/
robots.txt
sitemap.xml
site.webmanifest
404.html
```

## 5. 需要替换的真实信息

不要把真实密钥或私密接口写入文档。本节只记录替换位置和配置方法。

### 5.1 企业微信二维码

当前占位图：

```text
assets/wecom-qr-placeholder.png
```

推荐做法：

1. 将真实企业微信二维码图片放入 `assets/`，例如 `assets/wecom-qr.png`。
2. 打开 `script.js`，替换：

```js
const WECOM_QR_IMAGE = "./assets/wecom-qr-placeholder.png";
```

为真实图片路径：

```js
const WECOM_QR_IMAGE = "./assets/wecom-qr.png";
```

如果暂时没有真实二维码，保留占位图即可，但主承接能力会受到影响。

### 5.2 企业微信承接文案

打开 `script.js`，替换：

```js
const WECOM_CONTACT_TEXT = "企业微信：待填写";
```

可以替换为真实承接说明，例如企业微信名称或添加提示。不要写入不确定或无法兑现的信息。

### 5.3 真实电话、微信、邮箱

当前联系方式在 `index.html` 中仍为占位文本：

```text
电话：待填写
微信：待填写
邮箱：待填写
企业微信：待填写
```

上线前需要统一替换为真实联系方式。

### 5.4 表单提交接口

打开 `script.js`，替换：

```js
const LEAD_FORM_ENDPOINT = "";
```

为真实表单接口地址。

可选接口形式：

- 主站 `/api/lead` 对应的线上完整 URL。
- 第三方表单服务接口。
- 自有轻量接收 API。

如果暂时没有真实接口，表单只能作为模拟兜底，提交后不会保存真实线索；主承接应以企业微信为准。

## 6. 线上测试步骤

1. 打开 `https://path.cnaszhinan.com`，确认首页正常展示。
2. 确认 CSS、JS 和图片资源正常加载。
3. 查看企业微信卡片，确认二维码显示为真实二维码，不是占位图。
4. 点击“添加顾问，领取CNAS认可路径判断问卷”，确认能定位到企业微信承接区。
5. 点击“我已添加，继续填写基础信息”，确认能继续填写在线表单。
6. 填写一条测试线索，确认 A/B/C 诊断等级正常生成。
7. 确认 payload 包含 UTM 参数、来源页面、提交时间和初步诊断结果摘要。
8. 如果已配置真实 `LEAD_FORM_ENDPOINT`，确认接口收到测试线索。
9. 如果未配置真实接口，确认页面提示为模拟提交，并让运营人员主要依赖企业微信承接。
10. 手机端打开页面，确认首屏、企业微信卡片、表单和维护模块展示正常。
11. 检查页面没有 `CNAS认证` 等错误表述。
12. 检查页面没有 `包过`、`保证通过`、`官方指定` 等风险表述。

## 7. 常见错误排查

### 7.1 打开页面后样式丢失

原因可能是站点根目录不正确，导致 `styles.css` 没有和 `index.html` 位于同一层级。

处理方式：确认部署后的根目录直接包含 `index.html`、`styles.css`、`script.js` 和 `assets/`。

### 7.2 二维码仍显示占位图

原因可能是：

- 未替换 `assets/wecom-qr-placeholder.png`。
- `script.js` 中 `WECOM_QR_IMAGE` 仍指向占位图。
- 浏览器或 CDN 缓存未刷新。

处理方式：替换真实二维码路径，重新部署，并清理缓存。

### 7.3 表单提交后没有真实线索

原因：`LEAD_FORM_ENDPOINT` 仍为空。

处理方式：配置真实接口；如果暂时没有接口，应把运营承接重点放在企业微信二维码。

### 7.4 UTM 参数没有进入线索

原因可能是投放链接没有携带 UTM 参数。

处理方式：投放链接统一带上：

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

### 7.5 资源 404

原因通常是静态资源路径或部署目录层级错误。

处理方式：确认页面使用相对路径部署，且 `assets/` 与 `index.html` 在同一站点根目录下。

## 8. 上线配置结论

成交页下一步可以进入域名绑定和静态部署。上线前必须由用户提供：

- 真实企业微信二维码
- 真实电话
- 真实微信 / 企业微信
- 真实邮箱
- 真实 `LEAD_FORM_ENDPOINT`
- 是否使用 `https://path.cnaszhinan.com` 作为正式成交页域名
