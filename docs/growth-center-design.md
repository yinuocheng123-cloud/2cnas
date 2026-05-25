# 增长中台接入设计：CNAS路径判断成交页

## 1. 目标

本文件说明当前静态成交页如何与后续增长中台衔接。当前页面优先引导用户添加企业微信顾问，在线表单作为兜底入口；暂不接入真实数据库，也不编造真实接口。

## 2. 当前线索路径

1. 用户进入页面后，主 CTA 引导添加企业微信顾问。
2. 用户也可以填写在线路径判断问卷。
3. 表单提交后，前端生成 A/B/C 初步诊断等级。
4. payload 保留来源页面、UTM 参数、提交时间、表单字段和初步诊断结果摘要。
5. 未配置真实 `LEAD_FORM_ENDPOINT` 时，页面执行模拟提交并在控制台输出 payload。

## 3. 建议中台字段

- company：企业名称
- contact：联系人
- phone：手机号
- labType：实验室类型
- stage：当前阶段
- scopeClarity：认可范围是否明确
- resourceReadiness：人员设备是否基本具备
- wecomAdded：是否已添加企业微信
- concerns：最担心的问题
- timeline：计划启动时间
- notes：补充说明
- source：来源标识
- sourcePage：来源页面
- utm：UTM 参数
- submittedAt：提交时间
- diagnosisSummary：初步诊断摘要与 A/B/C 等级

## 4. 正式接入前配置

需要替换：

- `WECOM_QR_IMAGE`：真实企业微信二维码图片路径。
- `WECOM_CONTACT_TEXT`：真实企业微信承接文案。
- `LEAD_FORM_ENDPOINT`：真实表单提交接口。

未配置真实接口前，页面只能模拟提交，不会保存线索。

## 5. 后续建议

1. 优先完成真实企业微信二维码和表单接口配置。
2. 在投放链接中统一使用 `utm_source`、`utm_medium`、`utm_campaign`、`utm_content`、`utm_term`。
3. 在增长中台按 A/B/C 等级设置跟进优先级。
4. 上线后使用真实表单提交测试验证 payload 字段完整性。
