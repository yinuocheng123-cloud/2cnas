/*
文件说明：该文件实现 CNAS 首页的轻量交互。
功能说明：负责 FAQ 展开状态管理、CTA 焦点状态增强、路径判断问卷线索提交和初步诊断结果生成。

结构概览：
  第一部分：FAQ 单项展开逻辑
  第二部分：CTA 可访问状态增强
  第三部分：路径判断规则配置
  第四部分：线索提交接口封装
  第五部分：路径判断问卷提交状态与结果展示
*/

// ========== 第一部分：FAQ 单项展开逻辑 ==========
// 为什么这样做：FAQ 同时展开会拉长页面，单项展开能保持咨询转化区更快被看到。
const faqItems = document.querySelectorAll(".faq-list details");

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) {
      return;
    }

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});

// ========== 第二部分：CTA 可访问状态增强 ==========
// 为什么这样做：所有核心 CTA 都进入问卷区，因此保留键盘焦点状态能帮助用户确认当前操作位置。
const actionLinks = document.querySelectorAll(".btn, .nav-cta, .text-link");

actionLinks.forEach((link) => {
  link.addEventListener("focus", () => {
    link.setAttribute("data-focused", "true");
  });

  link.addEventListener("blur", () => {
    link.removeAttribute("data-focused");
  });
});

// ========== 第三部分：路径判断规则配置 ==========
// 为什么这样做：当前不需要复杂算法，把规则集中配置，后续接后端或扩展问卷时更容易替换。
const stageRules = {
  刚开始了解: {
    current:
      "当前更适合先做认可路径判断，而不是直接进入体系文件编写。需要先确认实验室类型、认可范围和投入边界是否清晰。",
    risk:
      "如果跳过路径判断，后续容易出现申请范围过大、资源投入不足或建设顺序错误，导致周期被反复拉长。",
    action:
      "优先梳理检测或校准能力边界、目标标准、关键人员、设备资源和预计启动窗口。",
    next:
      "建议先完成一次路径可行性判断，再决定是否进入体系建设和评审准备阶段。",
  },
  已准备建设: {
    current:
      "当前已经进入建设准备期，重点不是马上铺开材料，而是先核对人员、设备、环境和方法标准。",
    risk:
      "若基础资源与目标认可范围不匹配，实验室可能在建设中途发现方向偏差，形成设备补配、人员补授权或范围收缩。",
    action:
      "优先建立资源差距清单，明确哪些能力可以先建、哪些项目需要延后或调整申请边界。",
    next:
      "建议把建设计划拆成能力确认、体系搭建、运行记录和评审预警四个阶段推进。",
  },
  已做体系文件: {
    current:
      "当前重点应从“有没有体系文件”转向“文件是否能支撑真实运行记录”。文件完整不等于评审准备充分。",
    risk:
      "如果文件与实际检测活动脱节，评审时容易暴露记录不闭环、职责不清晰或程序要求无法落地。",
    action:
      "优先抽查人员授权、方法验证、设备校准、质量控制和原始记录，确认文件要求是否真正运行。",
    next:
      "建议围绕真实业务做一次体系适配检查，再决定是局部修订还是重建关键程序。",
  },
  准备申请: {
    current:
      "当前已接近申请窗口，重点应转向评审准备度检查，而不是继续零散补材料。",
    risk:
      "内审、管理评审、能力验证、设备校准和记录完整性若存在缺口，容易在现场评审阶段集中暴露。",
    action:
      "优先开展评审前扫描，形成高风险不符合项清单，并按影响程度安排整改顺序。",
    next:
      "建议在提交申请前完成一次模拟评审式复核，确认关键证据链能够支撑申请范围。",
  },
  评审后整改: {
    current:
      "当前不宜只按条目机械整改，应先区分一般问题、系统性问题和反复性问题，再制定整改闭环。",
    risk:
      "如果没有复盘问题根因，整改可能只停留在补文件或补记录，后续复评或监督评审仍会重复出现。",
    action:
      "优先梳理不符合项根因、责任边界、纠正措施、预防措施和验证证据。",
    next:
      "建议建立整改闭环表，并对系统性问题追加一次体系运行有效性复核。",
  },
};

const concernRiskTips = {
  周期太长: "周期太长：建议先排查前置条件，否则认可周期会被补资源、补记录和重复整改拉长。",
  不知道从哪开始:
    "不知道从哪开始：建议先做路径判断，不要直接购买模板或照抄文件。",
  体系文件不会做:
    "体系文件不会做：体系文件只是表层，真实运行证据和业务闭环更关键。",
  人员设备不清楚:
    "人员设备不清楚：人员授权、设备配置、校准状态和环境条件需要先核清。",
  担心评审不过:
    "担心评审不过：评审不是临场发挥，而是前期体系运行质量的结果。",
  已经返工过:
    "已经返工过：需要复盘返工原因，不能继续按原路径推进。",
};

// ========== 第四部分：线索提交接口封装 ==========
// TODO：正式上线前必须替换 WECOM_QR_IMAGE、WECOM_CONTACT_TEXT 和 LEAD_FORM_ENDPOINT。
// 后续可接入企业微信活码、企微客户联系API、飞书表格、金数据或自有增长中台API。
const WECOM_QR_IMAGE = "./assets/wecom-qr-placeholder.png";
const WECOM_CONTACT_TEXT = "企业微信：待填写";
const LEAD_FORM_ENDPOINT = "https://cnaszhinan.com/api/lead";

const wecomQrBox = document.querySelector("#wecomQrBox");
const wecomContactText = document.querySelector("#wecomContactText");

if (wecomContactText) {
  wecomContactText.textContent = WECOM_CONTACT_TEXT;
}

if (wecomQrBox && WECOM_QR_IMAGE) {
  wecomQrBox.innerHTML = `<img src="${WECOM_QR_IMAGE}" alt="企业微信顾问二维码" />`;
}

async function submitLeadForm(payload) {
  if (!LEAD_FORM_ENDPOINT) {
    console.info("TODO: replace LEAD_FORM_ENDPOINT before production launch.", payload);
    return { ok: true, simulated: true };
  }

  const response = await fetch(LEAD_FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Lead form submission failed.");
  }

  return { ok: true, simulated: false };
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  return keys.reduce((utm, key) => {
    utm[key] = params.get(key) || "";
    return utm;
  }, {});
}

// ========== 第五部分：路径判断问卷提交状态与结果展示 ==========
// 为什么这样做：先生成本地即时诊断，再提交线索；无真实接口时模拟成功，避免测试部署阶段阻断用户体验。
const assessmentForm = document.querySelector("#pathAssessmentForm");
const assessmentMessage = document.querySelector("#assessmentMessage");
const assessmentResult = document.querySelector("#assessmentResult");
const resultCurrent = document.querySelector("#resultCurrent");
const resultRisk = document.querySelector("#resultRisk");
const resultAction = document.querySelector("#resultAction");
const resultNext = document.querySelector("#resultNext");
const resultGrade = document.querySelector("#resultGrade");
const resultGradeTitle = document.querySelector("#resultGradeTitle");
const resultGradeDescription = document.querySelector("#resultGradeDescription");
const submitButton = assessmentForm?.querySelector(".form-submit");
const defaultSubmitText = submitButton?.textContent || "提交路径判断信息";

function setSubmitState(state, message) {
  assessmentMessage.textContent = message;
  assessmentMessage.dataset.state = state;
  assessmentMessage.classList.add("is-visible");

  if (!submitButton) {
    return;
  }

  const isSubmitting = state === "submitting";
  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting ? "提交中" : defaultSubmitText;
}

function buildDiagnosisGrade(payload) {
  if (
    payload.stage === "刚开始了解" &&
    (payload.scopeClarity === "还不清楚" ||
      payload.resourceReadiness === "不确定" ||
      payload.resourceReadiness === "明显不足")
  ) {
    return {
      grade: "C",
      title: "C类：暂不适合直接启动申请",
      description: "当前更适合先补清认可范围、资源条件和准备边界，再决定是否进入正式申请节奏。",
    };
  }

  if (
    payload.stage === "准备申请" ||
    payload.stage === "评审后整改" ||
    payload.timeline === "立即启动" ||
    payload.timeline === "1个月内"
  ) {
    return {
      grade: "A",
      title: "A类：适合进入认可路径设计阶段",
      description: "当前已经接近启动或评审节点，建议尽快完成完整路径判断，明确范围、资源和评审准备重点。",
    };
  }

  if (payload.stage === "已准备建设" || payload.stage === "已做体系文件" || payload.timeline === "3个月内") {
    return {
      grade: "B",
      title: "B类：适合先准备，不建议马上申请",
      description: "当前可以推进基础准备，但应先收拢认可范围、人员设备和体系运行证据，再进入申请动作。",
    };
  }

  return {
    grade: "C",
    title: "C类：暂不适合直接启动申请",
    description: "当前信息仍需补充，建议先完成基础判断，再决定是否进入认可路径设计阶段。",
  };
}

if (assessmentForm && assessmentMessage && assessmentResult) {
  assessmentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(assessmentForm);
    const concerns = formData.getAll("concern");
    const submittedAt = new Date().toISOString();
    const leadPayload = {
      company: formData.get("company"),
      contact: formData.get("contact"),
      phone: formData.get("phone"),
      labType: formData.get("labType"),
      stage: formData.get("stage"),
      scopeClarity: formData.get("scopeClarity"),
      resourceReadiness: formData.get("resourceReadiness"),
      wecomAdded: formData.get("wecomAdded"),
      concerns,
      timeline: formData.get("timeline"),
      notes: formData.get("notes"),
      source: "cnas-homepage-path-assessment",
      sourcePage: window.location.href,
      utm: getUtmParams(),
      submittedAt,
    };

    const rule = stageRules[leadPayload.stage] || stageRules["刚开始了解"];
    const concernTips = concerns
      .map((concern) => concernRiskTips[concern])
      .filter(Boolean);
    const riskText = [rule.risk, ...concernTips].join(" ");
    const diagnosisSummary = {
      grade: buildDiagnosisGrade(leadPayload),
      current: rule.current,
      risk: riskText,
      action: rule.action,
      next: rule.next,
    };
    leadPayload.diagnosisSummary = diagnosisSummary;

    resultCurrent.textContent = diagnosisSummary.current;
    resultRisk.textContent = diagnosisSummary.risk;
    resultAction.textContent = diagnosisSummary.action;
    resultNext.textContent = diagnosisSummary.next;
    resultGrade.textContent = diagnosisSummary.grade.grade;
    resultGradeTitle.textContent = diagnosisSummary.grade.title;
    resultGradeDescription.textContent = diagnosisSummary.grade.description;
    assessmentResult.classList.add("is-visible");
    assessmentResult.scrollIntoView({ behavior: "smooth", block: "start" });

    setSubmitState("submitting", "提交中：正在生成初步路径判断并提交线索信息。");

    try {
      const submitResult = await submitLeadForm(leadPayload);
      const successMessage = submitResult.simulated
        ? "提交成功：已生成初步路径判断结果。当前为模拟成功，正式上线前需替换真实提交接口。"
        : "提交成功：已收到您的路径判断信息，我们会根据您当前阶段，初步判断CNAS认可准备重点。";
      setSubmitState("success", successMessage);
    } catch (error) {
      console.error(error);
      setSubmitState(
        "error",
        "提交失败：初步路径判断结果已生成，但线索暂未提交成功，请稍后再试。"
      );
    }
  });
}
