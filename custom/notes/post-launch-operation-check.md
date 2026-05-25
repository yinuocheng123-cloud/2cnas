# CNAS认可指南成交页上线后运营检查

## 检查时间

2026-05-25 22:24:55 CST

## 当前上线状态

- 成交页地址：https://path.cnaszhinan.com
- 部署目录：/www/wwwroot/cnas-path
- 项目类型：纯静态 HTML/CSS/JS
- 当前状态：已上线，HTTPS 可访问。

## HTTPS 状态

- http://path.cnaszhinan.com：301 跳转 HTTPS。
- https://path.cnaszhinan.com：200 OK。
- SSL 证书已配置，到期时间：2026-08-23。

## 主站接口状态

- 主站线索接口：https://cnaszhinan.com/api/lead
- 成交页 LEAD_FORM_ENDPOINT 已配置为该接口。
- 主站已允许 https://path.cnaszhinan.com 对 /api/lead 发起跨域 POST。

## 成交页提交状态

- 成交页表单不再是模拟提交。
- 已用成交页字段格式提交联调测试线索。
- 主站后台可看到测试线索。
- 当前 deliveryStatus 为 local_backup_only，因为 webhook 未配置。

## 后台查看状态

- 后台地址格式：https://cnaszhinan.com/admin/leads?key=ADMIN_KEY
- ADMIN_KEY 不写入本记录。
- 后台可看到包含“成交页联调测试企业”的测试线索。

## webhook 状态

- LEAD_WEBHOOK_FEISHU：未配置。
- LEAD_WEBHOOK_WECHAT：未配置。

结论：当前线索会进入主站本地备份和后台，但不会主动通知运营人员。

## 占位信息状态

- 企业微信二维码：仍为 assets/wecom-qr-placeholder.png 占位图。
- WECOM_CONTACT_TEXT：仍为“企业微信：待填写”。
- 电话：仍为“待填写”。
- 微信 / 企业微信：仍为“待填写”。
- 邮箱：仍为“待填写”。

## payload 状态

成交页提交 payload 包含：

- sourcePage：来源页。
- utm：UTM 参数。
- submittedAt：提交时间。
- diagnosisSummary：诊断摘要。

## 备案号状态

未检测到备案号。不要编造备案号。待用户提供真实备案号后，应在成交页 footer 添加备案号，并链接到 https://beian.miit.gov.cn/。

## 服务器资源状态

- /www/wwwroot/cnas-path：约 3.5M。
- 80、443 端口由 Nginx 正常监听。
- 未发现本轮检查对其它网站造成影响。

## 下一步需要用户补齐的真实资料

1. 真实企业微信二维码。
2. 真实电话。
3. 真实邮箱。
4. 真实微信 / 企业微信文案。
5. 主站 webhook。
6. 真实备案号。
7. 浏览器端真实表单提交复测。

## 真实运营配置补齐记录：2026-05-25 22:44:38 CST

本轮只处理真实运营入口，不新增功能、不重构系统、不修改其它网站。

### 企业微信二维码状态

- 已将用户提供的真实企业微信二维码替换到 /www/wwwroot/cnas-path/assets/wecom-qr-placeholder.png。
- 已备份原占位图到 /www/wwwroot/cnas-path/assets/wecom-qr-placeholder.backup.png。
- 保持文件名和路径不变，页面结构未修改。
- 线上二维码图片返回 200，Content-Type 为 image/png。
- 手机扫码：服务器侧无法代替用户手机扫码，仍需用户用手机确认是否能识别并正常添加企业微信。

### webhook 状态

- LEAD_WEBHOOK_FEISHU：未配置。
- LEAD_WEBHOOK_WECHAT：未配置。
- webhook 测试：未执行，原因是用户尚未提供真实 webhook。
- deliveryStatus：仍为 local_backup_only。

### 成交页表单状态

- LEAD_FORM_ENDPOINT 仍为 https://cnaszhinan.com/api/lead。
- 二维码替换后已提交测试线索。
- 主站后台已能看到“二维码替换后成交页测试企业”测试线索。
- A/B/C 诊断逻辑未改动。

### 真实联系方式状态

- 电话：仍为占位。
- 邮箱：仍为占位。
- 微信 / 企业微信文案：仍为占位。
- 页面联系方式说明：仍为占位。

### 备案号状态

- 未添加备案号。
- 待用户提供真实备案号后，按以下格式添加：
  <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">用户真实备案号</a>

### 仍待用户补齐

- LEAD_WEBHOOK_FEISHU 或 LEAD_WEBHOOK_WECHAT，至少配置一个。
- 真实电话。
- 真实邮箱。
- 真实微信 / 企业微信文案。
- 真实备案号。
- 用户手机扫码确认二维码可识别并能正常添加企业微信。

## 底部咨询联系方式二维码补充记录：2026-05-25

本次按用户确认，仅在成交页底部咨询 / 联系方式区域补充企业微信二维码展示，不新增功能、不重构页面、不修改主站、不改 Nginx。

### 实际改动

- 在页面底部最终 CTA 的联系方式区域补充企业微信二维码展示块。
- 在页面底部“添加顾问，获取完整路径建议”的联系方式区域补充企业微信二维码展示块。
- 复用现有图片路径 /assets/wecom-qr-placeholder.png，避免修改二维码资源引用规则。
- 保留电话、邮箱、微信 / 企业微信文案占位，待用户提供真实信息后再替换。

### 验证结果

- https://path.cnaszhinan.com 返回 200。
- /assets/wecom-qr-placeholder.png 返回 200，Content-Type 为 image/png。
- 页面源码已包含 bottom-wecom-card 和 handoff-wecom-card。
- 本次未修改表单接口，LEAD_FORM_ENDPOINT 仍指向 https://cnaszhinan.com/api/lead。

### 仍待确认

- 用户使用手机扫码确认二维码能正常识别并添加企业微信。
- 用户提供真实电话、邮箱、微信 / 企业微信文案和备案号。

## ICP 备案号补充记录：2026-05-25

本轮只补充备案号展示与链接，不新增功能、不重构页面、不影响企业微信二维码、不影响表单提交、不改动其它网站。

### 备案号信息

- 用户提供备案号：浙ICP备2020044218号-3。
- 链接地址：https://beian.miit.gov.cn/。
- 本轮按用户提供文本添加，不编造 “-1” 或其它网站序号。
- 提醒：用户已补充准确完整网站备案号为“浙ICP备2020044218号-3”，当前页面已按该编号展示；后续如备案信息发生变化，再以工信部备案系统查询结果为准替换。

### 成交页处理结果

- 已在成交页首页 footer 底部添加备案号链接。
- https://path.cnaszhinan.com 已可在页面 HTML 中读取到备案号和备案链接。
- 备案号位于 footer 区域，未放入隐藏区域，移动端同样会输出该 footer。
- 企业微信二维码资源仍返回 200，页面二维码展示未改动。
- 已提交备案号补充后的测试线索，接口返回 success，主站后台数据文件已记录该测试企业。

### 未改动项

- 未修改 LEAD_FORM_ENDPOINT。
- 未修改 A/B/C 诊断逻辑。
- 未修改主站密钥或 webhook。
- 未修改其它网站目录。
- 未新增数据库。

## Footer 转化区与企业微信二维码更新记录：2026-05-25

本轮只处理成交页 footer 与公开展示的企业微信二维码，不修改主站、不修改 Nginx、不修改 PM2、不修改其它网站。

### 实际改动

- 已使用用户最新提供的企业微信二维码替换 assets/wecom-qr-placeholder.png。
- 已将成交页 footer 优化为“品牌信任 + 服务内容 + 企业微信承接 + 备案号”的结构。
- footer 右栏已增加清晰二维码承接区，文案为“扫码领取《CNAS认可路径判断问卷》”。
- 备案号继续保持为：浙ICP备2020044218号-3，并继续链接到 https://beian.miit.gov.cn/。
- 未修改 LEAD_FORM_ENDPOINT，仍指向 https://cnaszhinan.com/api/lead。
- 未修改 A/B/C 诊断逻辑。

### 验证要求

- 线上二维码图片应返回 200，且文件大小应与旧二维码不同。
- 成交页表单需继续提交成功，主站后台需能看到测试线索。
- 手机扫码仍需用户最终确认是否能正常识别并添加企业微信。
