# CNAS认可指南 v1.0 试运行版上线运营清单

## 1. 当前版本定位

当前版本定位为：CNAS认可指南 v1.0 试运行版。

本轮只围绕成交页能上线试运行做最终检查和配置清单整理，不新增复杂后台，不新增数据库，不接企业微信增长中台，不重构页面。

## 2. 本次读取的历史记录

- `custom/notes/v3.1-wecom-and-maintenance-upgrade.md`

延续结论：

- 成交页仍是纯静态 HTML/CSS/JS 项目。
- 企业微信二维码先保留占位图，正式投放前替换真实二维码。
- 在线表单保留兜底能力；未配置真实 `LEAD_FORM_ENDPOINT` 时只模拟提交，不保存真实线索。
- A/B/C 诊断等级、UTM 参数、来源页面、提交时间和初步诊断结果摘要已经进入 payload。
- CNAS认可后维护模块已经存在，但不改变“先判断认可路径”的主线。

## 3. 最小上线运营闭环

```text
内容访问 → 添加企业微信 → 填写基础信息 → 生成初步诊断 → 线索通知 → 人工跟进
```

当前先保留人工跟进闭环，不做自动标签、自动分配顾问、复杂 CRM 或数据库重构。

## 4. 成交页检查结果

项目目录：

```text
D:/ceshi/shiyan/2cnas/
```

检查结果：

- `git status`：检查前后均为干净工作区。
- `git remote -v`：远程仓库为 `https://github.com/yinuocheng123-cloud/2cnas.git`。
- 页面结构：仍为纯静态 HTML/CSS/JS，不需要 `npm run dev`，不需要 build。
- 企业微信二维码：`script.js` 中 `WECOM_QR_IMAGE` 统一指向 `./assets/wecom-qr-placeholder.png`，正式投放前替换为真实二维码图片路径。
- 联系方式：企业微信承接文案由 `WECOM_CONTACT_TEXT` 控制；电话、微信、邮箱仍为 `index.html` 中的占位文本，上线前需要统一替换。
- 表单接口：`LEAD_FORM_ENDPOINT` 在 `script.js` 统一配置。
- 在线表单：保留兜底能力，未配置真实接口时模拟提交并在控制台输出 payload。
- A/B/C 诊断：`buildDiagnosisGrade` 已按当前阶段、计划启动时间、认可范围和人员设备状态生成等级。
- 来源参数：UTM 参数、来源页、提交时间进入 payload。
- CNAS认可后维护模块：`#maintenance` 模块已存在。

## 5. 主站必须配置

主站目录：

```text
C:/Users/Administrator/Documents/New project 10/
```

正式上线前必须在主站部署平台配置：

- `SITE_URL`：真实正式域名，例如 `https://cnaszhinan.com`。
- `ADMIN_KEY`：足够长、不可猜的随机访问 key。
- `LEAD_WEBHOOK_FEISHU` 或 `LEAD_WEBHOOK_WECHAT`：至少配置一个。
- `NEXT_PUBLIC_GA_ID`：可选，如需统计访问来源再配置。

## 6. 成交页必须配置

- 真实企业微信二维码。
- 真实电话。
- 真实微信 / 企业微信。
- 真实邮箱。
- 真实 `LEAD_FORM_ENDPOINT`。
- 正式域名。
- 线上真实表单提交测试。

## 7. 暂缓事项

- 企业微信增长中台。
- 自动标签。
- 自动分配顾问。
- 复杂 CRM。
- 数据库重构。
- 自动报告生成。

## 8. 上线前人工测试清单

- 打开主站首页。
- 打开成交页。
- 点击添加企业微信按钮。
- 查看二维码是否正确。
- 提交一条测试线索。
- 确认 webhook 是否收到通知。
- 确认后台是否能看到线索。
- 确认手机端展示正常。
- 确认页面没有 `CNAS认证` 等错误表述。
- 确认没有 `包过`、`保证通过`、`官方指定` 等风险表述。

## 9. 当前上线建议

成交页具备静态试运行上线基础，但必须先替换真实企业微信二维码、联系方式和 `LEAD_FORM_ENDPOINT`，并完成线上真实表单提交测试。

主站具备试运行上线基础，但必须先配置真实 `SITE_URL`、`ADMIN_KEY` 和至少一个 webhook。

当前建议进入域名与部署配置阶段，暂不推进复杂后台或增长中台。
