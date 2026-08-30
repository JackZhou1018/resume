/* ============================================================
   Jack Zhou Resume Lab
   交互：低干扰背景粒子 / 作品 Portal / 模块筛选 / Workbench 标签 /
   复制反馈 / 移动端导航 / 背景视频兜底
   ============================================================ */

const canvas = document.getElementById('bgCanvas');
const ctx = canvas?.getContext('2d');
let W = 0;
let H = 0;
const PI2 = Math.PI * 2;

/* ---------- 参考站等价功能：主题 / 配色 / 鼠标特效 ---------- */
const paletteToggle = document.getElementById('paletteToggle');
const themePicker = document.getElementById('themePicker');
const paletteMenu = document.getElementById('paletteMenu');
const paletteOptions = document.querySelectorAll('[data-accent-option]');
const themeToggle = document.getElementById('themeToggle');
const cursorAura = document.getElementById('cursorAura');
const cursorDot = document.getElementById('cursorDot');
const languageToggle = document.getElementById('languageToggle');
const labShell = document.querySelector('.lab-shell');
const THEME_KEY = 'jackResumeLabTheme';
const ACCENT_KEY = 'jackResumeLabAccent';
const LANG_KEY = 'jackResumeLabLang';
const accents = ['golden', 'cyan', 'purple', 'emerald', 'rose'];
const zhPageTitle = document.title;
const metaDescription = document.querySelector('meta[name="description"]');
const zhMetaDescription = metaDescription?.getAttribute('content') || '';
const translations = {
  en: {
    '周猛 Jack Zhou · FAE 工程师 · AI 算力技术支持': 'Jack Zhou · FAE Engineer · AI Compute Technical Support',
    '首页': 'Home',
    '能力': 'Systems',
    '实验台': 'Workbench',
    '项目': 'Projects',
    '经历': 'Logs',
    '联系': 'Contact',
    'AI Compute FAE / Beijing': 'AI Compute FAE / Beijing',
    'PERSONAL DIGITAL LAB': 'PERSONAL DIGITAL LAB',
    'Jack Zhou': 'Jack Zhou',
    '近 10 年服务器硬件与 AI 算力技术服务经验，覆盖联想、同方、摩尔线程。长期负责大客户 POC、OEM 适配、GPU 服务器交付、RoCE 组网、故障闭环与跨部门项目推进。': 'Nearly 10 years of server hardware and AI compute technical service experience across Lenovo, Tongfang, and Moore Threads. Focused on key-account POC, OEM adaptation, GPU server delivery, RoCE networking, issue closure, and cross-functional project execution.',
    'GPU 服务器 POC': 'GPU Server POC',
    '大模型训推适配': 'LLM Training / Inference Adaptation',
    '国产化集群交付': 'Domestic Compute Cluster Delivery',
    '进入 Workbench →': 'Enter Workbench →',
    '下载 PDF 简历 ↓': 'Download PDF Resume ↓',
    '联系我': 'Contact Me',
    '男 · 32 · 北京 · 社招': 'Male · 32 · Beijing · Experienced Hire',
    'AI 算力现场攻坚 / FAE 交付': 'AI Compute Field Troubleshooting / FAE Delivery',
    '把客户需求翻译成测试项、交付流程、上线标准和可复用 SOP。': 'Translate customer requirements into test items, delivery processes, launch criteria, and reusable SOPs.',
    'AI 服务器交付': 'AI Servers Delivered',
    '头部客户 POC': 'Key-Account POCs',
    'GPU 图形卡订单': 'GPU Graphics Card Orders',
    '展会 Demo 支持': 'Demo Events Supported',
    '现场攻坚型 FAE': 'Field-Ready FAE for AI Compute',
    '定位': 'Positioning',
    '以原始 PDF 简历为内容源：聚焦 GPU 服务器 / 加速卡 POC 验证、主流大模型适配、集群部署与故障闭环，覆盖从客户需求对接、方案设计、POC 验证到订单落地和量产交付的完整技术链路。': 'Based on the original PDF resume: focused on GPU server / accelerator POC validation, mainstream LLM adaptation, cluster deployment, and issue closure across the full technical chain from customer requirement alignment and solution design to POC validation, order conversion, and mass delivery.',
    '北京': 'Beijing',
    'FAE 工程师': 'FAE Engineer',
    '35-45K · 社招': '35-45K · Experienced Hire',
    'AI 算力全栈技术闭环': 'Full-Cycle AI Compute Delivery',
    '精通 GPU 服务器 / 加速卡 POC 验证、主流大模型适配、集群部署与故障闭环，覆盖从选型到量产的完整技术链路。': 'Strong in GPU server / accelerator POC validation, mainstream LLM adaptation, cluster deployment, and issue closure from selection to mass delivery.',
    '多行业头部客户实战沉淀': 'Key-Account Experience Across Industries',
    '主导互联网、央国企、金融、工业机器人等多场景标杆项目，具备国产化信创与 AI 平台落地经验。': 'Led benchmark projects across internet, state-owned enterprise, finance, and industrial robotics scenarios, with practical experience in domestic computing and AI platform delivery.',
    '售前到量产全流程交付': 'From Presales to Mass Production',
    '兼具方案设计、现场攻坚、跨部门协同与批量交付管理能力，可独立推进 POC 到订单落地。': 'Combines solution design, onsite troubleshooting, cross-functional coordination, and batch delivery management to drive POCs through order conversion.',
    '标准化与长期价值沉淀': 'Standardization and Reusable Value',
    '擅长将项目经验转化为可复用适配流程、测试规范与上线标准，为规模化部署提供稳定支撑。': 'Turns project experience into reusable adaptation workflows, test standards, and launch criteria for scalable deployments.',
    '能力系统': 'Capability Systems',
    'GPU POC 与客户验证': 'GPU POC and Customer Validation',
    '测试环境搭建、用例设计、基准准入、模型训推适配、结果复盘和客户选型闭环。': 'Test environment setup, case design, benchmark entry, model training/inference adaptation, result review, and customer selection closure.',
    'AI 集群交付': 'AI Cluster Delivery',
    '机房从 0 搭建、硬件开箱验货、系统安装、GPU 驱动、RoCE 组网、基础测试和验收支持。': 'Data-room setup from zero, hardware inspection, OS installation, GPU driver deployment, RoCE networking, baseline testing, and acceptance support.',
    '硬件测试与故障闭环': 'Hardware Testing and Issue Closure',
    'CPU、内存、存储、背板、BIOS/BMC、网络压测、多系统兼容、可靠性测试和 RMA 闭环。': 'CPU, memory, storage, backplane, BIOS/BMC, network stress testing, multi-OS compatibility, reliability testing, and RMA closure.',
    '大模型部署适配': 'LLM Deployment Adaptation',
    'Llama3、DeepSeek、GLM、Qwen、WAN 等模型训练/推理适配、接口验证、日志定位和 SOP 沉淀。': 'Training/inference adaptation, API validation, log diagnosis, and SOP building for Llama3, DeepSeek, GLM, Qwen, WAN, and other models.',
    '麒麟 / Ubuntu / Linux': 'Kylin / Ubuntu / Linux',
    'MUSA / GPU 驱动': 'MUSA / GPU Drivers',
    'RoCE 网络': 'RoCE Networking',
    'RMA 故障闭环': 'RMA Issue Closure',
    'AI 辅助脚本与工具化': 'AI-Assisted Scripts and Tooling',
    'AI Coding 实验室': 'AI Coding Lab',
    '把 FAE 现场重复劳动快速工具化': 'Turn Repetitive FAE Field Work into Tools',
    '熟练使用自然语言驱动的 AI 辅助编程，把 GPU 环境检测、集群巡检、测试脚本生成、故障诊断、数据看板和产品资料制作变成可复用工具。': 'Use natural-language AI coding to turn GPU environment checks, cluster inspection, test script generation, issue diagnosis, data dashboards, and product materials into reusable tools.',
    '运维脚本沉淀': 'Ops Scripts Built',
    '项集群检查': 'Cluster Checks',
    '套推理部署手册': 'Inference Deployment Guides',
    '可视化交付': 'Visual Deliverables',
    'Python / 集群巡检': 'Python / Cluster Inspection',
    'KIMI3 集群节点巡检工具': 'KIMI3 Cluster Node Inspection Tool',
    '面向 8 节点 MUSA/GPU 集群的“起飞门禁”巡检：单入口完成宿主机取证、MUSA/通信检查、门禁判定、离线 HTML 报告、证据包与节点隔离建议。': 'A launch-gate inspection tool for 8-node MUSA/GPU clusters: one entry for host evidence collection, MUSA/communication checks, GO/NO-GO judgment, offline HTML reports, evidence packages, and node isolation advice.',
    '8 节点': '8 Nodes',
    '43 项检查': '43 Checks',
    'Bash / 故障取证': 'Bash / Issue Evidence',
    '服务器故障日志一键收集': 'One-Click Server Fault Log Collection',
    'S5000 服务器故障现场一键取证：系统信息、dmesg、journalctl、GPU 状态、驱动模块、GCD 错误转存、容器与网络日志自动采集打包。': 'One-click field evidence collection for S5000 server faults: system info, dmesg, journalctl, GPU status, driver modules, GCD error dumps, containers, and network logs packaged automatically.',
    '8+ 类证据': '8+ Evidence Types',
    '一键打包': 'One-Click Package',
    '故障定位': 'Fault Diagnosis',
    'Shell / SOP 沉淀': 'Shell / SOP Assets',
    'GPU 集群运维脚本集': 'GPU Cluster Ops Script Suite',
    '25+ 个可复用集群运维脚本，cluster_ops.sh 统一入口：巡检、SSH 全互信、hostname 治理、yum/dkms 修复、SDK 同步、模型下载监控与 RoCE/IB 诊断。': '25+ reusable cluster ops scripts with cluster_ops.sh as the unified entry: inspection, SSH mutual trust, hostname governance, yum/dkms repair, SDK sync, model download monitoring, and RoCE/IB diagnosis.',
    '25+ 脚本': '25+ Scripts',
    '统一入口': 'Unified Entry',
    'Web / 3D 可视化': 'Web / 3D Visualization',
    '每日盯盘 · 3D Market Deck': 'Daily Market Watch · 3D Market Deck',
    '国内盘每日盯盘网页：自动抓取行情并以 3D 可视化呈现，深色科技风实时看板，用自动化替代人工盯盘。': 'A daily A-share market watch page that automatically fetches market data and presents it in a dark, technology-style 3D dashboard, replacing manual monitoring with automation.',
    '实时行情': 'Live Market Data',
    '3D 可视化': '3D Visualization',
    '自动盯盘': 'Automated Watch',
    '打开实验 →': 'Open Experiment →',
    'source': 'source',
    'live': 'live',
    '3D / 工程制图': '3D / Engineering Drawings',
    '星舰 V3 · 工程级 3D 交付': 'Starship V3 · Engineering-Grade 3D Delivery',
    '从零完成星舰 V3 参数化 3D 建模、交互式查看器、爆炸图、零件图、装配图与 18 章维修手册，整套由 AI 编程生成并本地自检。': 'Built a parametric 3D Starship V3 model from scratch, including an interactive viewer, exploded views, part drawings, assembly drawings, and an 18-chapter maintenance manual, generated with AI coding and locally validated.',
    '12 部件': '12 Parts',
    '18 章手册': '18-Chapter Manual',
    '摩尔线程产品介绍 · 互动演示': 'Moore Threads Product Introduction · Interactive Deck',
    '用 AI 编程完成摩尔线程 GPU 产品介绍：28 页 HTML 互动演示与可编辑 PPTX 双版本，覆盖 S5000、万卡集群、软件生态与资本市场资料。': 'Created a Moore Threads GPU product introduction with AI coding: 28-page interactive HTML and editable PPTX versions covering S5000, ten-thousand-card clusters, software ecosystem, and capital-market materials.',
    '28 页': '28 Pages',
    'S5000 专题': 'S5000 Focus',
    'Three.js / 3D 全息': 'Three.js / 3D Hologram',
    'JARVIS 全息人形 · 3D Preview': 'JARVIS Holographic Figure · 3D Preview',
    '基于 AI 生成参考图，用 Three.js 程序化重建半透明淡蓝白全息人形：胸口核心、环形数据轨道、粒子流、数据雨、冷蓝 Bloom 和可交互旋转视角。': 'Based on an AI-generated reference image, procedurally rebuilt a translucent blue-white holographic figure with Three.js: chest core, circular data orbits, particle streams, data rain, cool-blue Bloom, and interactive rotation.',
    '全息粒子': 'Holographic Particles',
    '可交互 3D': 'Interactive 3D',
    'SGLang / PD 分离': 'SGLang / P-D Separation',
    'DeepSeek V4 Flash PD 分离部署手册': 'DeepSeek V4 Flash P-D Separated Deployment Guide',
    '将 DeepSeek V4 Flash 在 MUSA/SGLang 环境下的 Prefill、Decode、Router 分离部署流程整理成客户可执行手册，覆盖容器创建、一键拉起、日志定位、OpenAI 兼容接口验证和停服回滚。': 'Turned the DeepSeek V4 Flash Prefill, Decode, and Router separated deployment flow on MUSA/SGLang into a customer-executable guide covering container creation, one-click startup, log diagnosis, OpenAI-compatible API validation, shutdown, and rollback.',
    '容器化部署': 'Containerized Deployment',
    '客户手册': 'Customer Guide',
    'P3D4 / 长上下文': 'P3D4 / Long Context',
    'GLM5.2 PD 部署操作手册': 'GLM5.2 P-D Deployment Guide',
    '面向 GLM5.2 FP8 模型的多节点 P/D 分离推理部署，沉淀拓扑说明、容器启动、通用环境变量、Prefill/Decode/Router 脚本、流式问答验证与日志排障路径。': 'A multi-node P/D separated inference deployment guide for the GLM5.2 FP8 model, covering topology, container startup, common environment variables, Prefill/Decode/Router scripts, streaming QA validation, and log troubleshooting.',
    'P3D4 拓扑': 'P3D4 Topology',
    '256K 上下文': '256K Context',
    '流式验证': 'Streaming Validation',
    '实验台与交付记录': 'Workbench and Delivery Logs',
    '交付链路': 'Delivery Flow',
    '自动化沉淀': 'Automation Assets',
    '文档化输出': 'Documentation Output',
    '从 POC 到批量交付': 'From POC to Batch Delivery',
    '覆盖需求拆解、测试计划、服务器环境、GPU 驱动、RoCE 组网、模型验证、验收和问题闭环。': 'Covers requirement breakdown, test planning, server environment, GPU drivers, RoCE networking, model validation, acceptance, and issue closure.',
    '客户需求 → 可执行测试项': 'Customer Needs → Executable Test Items',
    'POC 现场 → 数据和问题闭环': 'POC Site → Data and Issue Closure',
    '项目交付 → SOP 与复盘沉淀': 'Project Delivery → SOP and Review Assets',
    '把现场经验变成工具': 'Turn Field Experience into Tools',
    '用 AI Coding 把巡检、日志采集、部署脚本、产品资料和可视化页面沉淀为可复用资产。': 'Use AI Coding to turn inspection, log collection, deployment scripts, product materials, and visualization pages into reusable assets.',
    '脚本统一入口与 dry-run': 'Unified Script Entry and dry-run',
    '故障证据自动打包': 'Automatic Fault Evidence Packaging',
    '交付页面和报告自动生成': 'Automatic Delivery Pages and Reports',
    '客户可执行文档': 'Customer-Executable Documentation',
    '把复杂部署流程写成客户能照着做的操作手册，减少现场沟通成本，并便于售后复用。': 'Turn complex deployment workflows into step-by-step customer manuals, reducing onsite communication cost and enabling after-sales reuse.',
    '拓扑说明与启动顺序': 'Topology and Startup Order',
    '接口验证与日志路径': 'API Validation and Log Paths',
    '异常处理和回滚步骤': 'Exception Handling and Rollback Steps',
    '代表项目': 'Representative Projects',
    '信创': 'Domestic Computing',
    '机器人': 'Robotics',
    '2026.06 至今 · 云/零售': '2026.06 - Present · Cloud / Retail',
    '京东云及零售 GPU 服务器项目': 'JD Cloud and Retail GPU Server Project',
    '主导 POC、送测准入、基准验证、大模型训推适配，负责 500+ 台 AI 服务器批量交付。': 'Led POC, test-entry qualification, benchmark validation, LLM training/inference adaptation, and batch delivery of 500+ AI servers.',
    'FAE 技术支持': 'FAE Technical Support',
    '2025.10 至今 · 互联网': '2025.10 - Present · Internet',
    '美团互联网客户 POC': 'Meituan Internet Customer POC',
    '覆盖 Llama3 训练、DeepSeek 671B 双机推理、AI 平台和搜广推模型适配，客户满意度 98%。': 'Covered Llama3 training, DeepSeek 671B two-machine inference, AI platform adaptation, and search/ads/recommendation model adaptation, with 98% customer satisfaction.',
    '年度算力集采中标': 'Annual Compute Procurement Win',
    '2025.04 至今 · POC 负责人': '2025.04 - Present · POC Lead',
    '快手 GPU 板卡/服务器 POC': 'Kuaishou GPU Card / Server POC',
    '统筹送测准入、整机联调、功耗温控基线、大模型训练/推理适配，输出上线校验标准。': 'Coordinated test-entry qualification, system integration, power/thermal baselines, LLM training/inference adaptation, and launch validation standards.',
    '客户选型验收通过': 'Customer Selection Accepted',
    '2025.10 至今 · 央国企': '2025.10 - Present · State-Owned Enterprise',
    '中电科智能院 AI 算力集群': 'CETC Intelligent Institute AI Compute Cluster',
    '技术评分第一中标，完成 Qwen、DeepSeek-R1、WAN、GLM 等 9 款主流大模型适配调优。': 'Won with the highest technical score and completed adaptation/tuning for 9 mainstream models including Qwen, DeepSeek-R1, WAN, and GLM.',
    '集群交付': 'Cluster Delivery',
    '2022.03-2022.09 · 金融': '2022.03-2022.09 · Finance',
    '邮储银行 GPU 图形卡集采': 'Postal Savings Bank GPU Graphics Card Procurement',
    '协助信创 GPU 产品需求调研、兼容性测试与投标材料筹备，支撑 10 万张订单落地。': 'Supported domestic GPU requirement research, compatibility testing, and bid material preparation, helping land 100K card orders.',
    '信创适配': 'Domestic Compatibility',
    '2023.02-2024.11 · 金融/运营商': '2023.02-2024.11 · Finance / Carrier',
    '工行/移动终端集采': 'ICBC / China Mobile Terminal Procurement',
    '自研 GPU 图形卡终端场景适配验证与问题排查，通过集采技术资质审核，约 30 万张订单。': 'Validated and troubleshot self-developed GPU graphics cards in terminal scenarios, passed procurement technical qualification, and supported about 300K card orders.',
    '技术资质审核': 'Technical Qualification Review',
    '2024.02-2024.10 · 工业机器人': '2024.02-2024.10 · Industrial Robotics',
    '东土科技工业机器人项目': 'Kyland Industrial Robotics Project',
    '协助对接 ODM 与工业自动化合作伙伴，推进摩尔线程自研高算力 SOC 芯片与工业机器人场景的软硬件适配、采购需求梳理和落地交付。': 'Supported ODM and industrial automation partner alignment, driving Moore Threads self-developed high-compute SOC adaptation for industrial robotics scenarios, procurement requirement sorting, and delivery.',
    '1 款工业机器人适配验证': '1 Industrial Robot Adaptation Validated',
    '2025.12 至今 · 建筑设计': '2025.12 - Present · Architecture Design',
    '雅江集团建研院国产图形工作站项目': 'Yajiang Group Research Institute Domestic Graphics Workstation Project',
    '主导项目统筹，携手紫光计算机拉通需求、方案、测试链路，设计国产化图形工作站方案和多场景测试验证体系。': 'Led project coordination with Unis Computer, aligning requirements, solution, and testing workflow to design a domestic graphics workstation solution and multi-scenario validation system.',
    '预计 3D 建模效率提升 90%': 'Expected 90% 3D Modeling Efficiency Improvement',
    '2021.12 至今 · 产品支持': '2021.12 - Present · Product Support',
    '公司大型展会产品支持': 'Major Company Event Product Support',
    '负责新品发布会、MDC 2025 医疗板块、紫光销售大会、WAIC、中移动装备供应链大会等展会 Demo 部署与现场讲解。': 'Handled demo deployment and onsite explanation for product launches, MDC 2025 medical section, Unis sales conference, WAIC, and China Mobile equipment supply-chain conference.',
    '50+ 讲解 / 30+ 意向线索': '50+ Presentations / 30+ Leads',
    '工作经历': 'Career Experience',
    '2021.11 - 至今': '2021.11 - Present',
    '摩尔线程智能科技（北京）股份有限公司': 'Moore Threads Intelligent Technology (Beijing) Co., Ltd.',
    'FAE · 人工智能硬件': 'FAE · AI Hardware',
    '负责 AI GPU 产品全生命周期技术服务，覆盖大客户 POC、OEM 适配、服务器交付与故障闭环。': 'Responsible for full-lifecycle technical service for AI GPU products, covering key-account POCs, OEM adaptation, server delivery, and issue closure.',
    '聚焦互联网、央国企等头部客户 AI GPU 服务器场景，提供整机基础测试、模型训推测试方案制定与执行。': 'Focused on AI GPU server scenarios for top internet and state-owned enterprise customers, providing system baseline testing and model training/inference test planning and execution.',
    '累计支持 5+ 个 POC 项目，推进 3 家头部 OEM 客户量产，支撑 10+ 个 OEM 大型项目落地。': 'Supported 5+ POC projects, drove mass production for 3 top OEM customers, and supported 10+ major OEM projects.',
    '主导大客户 GPU 服务器交付：机房搭建、硬件验货、系统安装、GPU 驱动部署、RoCE 组网、基础测试和交付验收。': 'Led key-account GPU server delivery: data-room setup, hardware inspection, OS installation, GPU driver deployment, RoCE networking, baseline testing, and delivery acceptance.',
    '负责 GPU RMA 流程全管控，接收客户故障反馈，协调内部资源完成检测、分析、定位和解决方案落地。': 'Managed the full GPU RMA process, received customer fault feedback, and coordinated internal resources for testing, analysis, diagnosis, and solution delivery.',
    '北京同方信息安全股份有限公司': 'Beijing Tongfang Information Security Co., Ltd.',
    '测试运维 · 计算机硬件': 'Test Operations · Computer Hardware',
    '负责硬件产品测试计划、功能/性能/兼容性验证、故障定位与测试报告输出。': 'Responsible for hardware test planning, functional/performance/compatibility validation, issue diagnosis, and test report output.',
    '联动研发、生产、质量团队处理交付问题，保障产品稳定上线。': 'Worked with R&D, production, and quality teams to resolve delivery issues and ensure stable product launch.',
    '联想北京信息技术有限公司': 'Lenovo Beijing Information Technology Co., Ltd.',
    '测试开发 · 计算机硬件': 'Test Development · Computer Hardware',
    '完成 30+ 款服务器硬件测试，覆盖 CPU、内存、存储、背板、BIOS/BMC、系统兼容性与可靠性。': 'Completed testing for 30+ server hardware models, covering CPU, memory, storage, backplane, BIOS/BMC, OS compatibility, and reliability.',
    '开展网卡适配、网络压测、整机高负载稳定性、多操作系统兼容性和高低温、震动、跌落等可靠性测试。': 'Performed NIC adaptation, network stress testing, full-system high-load stability, multi-OS compatibility, and reliability tests including high/low temperature, vibration, and drop.',
    '熟悉 IPMI、WebUI、远程部署和 Windows、Linux、麒麟等多操作系统测试环境。': 'Familiar with IPMI, WebUI, remote deployment, and multi-OS testing environments including Windows, Linux, and Kylin.',
    '辽宁地质工程职业学院': 'Liaoning Geology Engineering Vocational College',
    '2012.09 - 2015.06 · 金属矿产地质与勘查技术 · 大专': '2012.09 - 2015.06 · Metallic Mineral Geology and Exploration Technology · Associate Degree',
    '与我联系': 'Contact Me',
    'FAE 工程师 · AI 算力技术支持 · 北京': 'FAE Engineer · AI Compute Technical Support · Beijing',
    '电话和微信号一致；按钮点击后会复制到剪贴板。': 'Phone and WeChat use the same number; click a button to copy it to the clipboard.',
    '作品详情': 'Work Details',
    '返回项目': 'Back to Projects',
    '作品预览': 'Work Preview',
    '原作品页面会在这里直接打开；如果浏览器限制嵌入，可使用备用入口新窗口查看。': 'The original work opens here directly; if browser embedding is restricted, use the fallback link to open it in a new window.',
    '新窗口打开原作品 ↗': 'Open Original in New Window ↗',
    '把 Prefill、Decode、Router 拆成可执行部署链路，用工程化 SOP 覆盖容器环境、启动顺序、OpenAI 兼容验证、日志定位和停服回滚。公开展示版已脱敏处理，保留方法论和交付结构。': 'Break Prefill, Decode, and Router into an executable deployment workflow, using engineering SOPs to cover container environment, startup order, OpenAI-compatible validation, log diagnosis, shutdown, and rollback. The public version is sanitized while preserving methodology and delivery structure.',
    '推理拓扑': 'Inference Topology',
    '服务框架': 'Service Framework',
    '客户可执行': 'Customer Executable',
    '交付价值': 'Delivery Value',
    '把复杂模型部署拆成“环境确认 → 容器启动 → 服务拉起 → 接口验证 → 日志排障 → 停服回滚”的闭环，减少现场沟通成本。': 'Break complex model deployment into a closed loop of environment check, container startup, service launch, API validation, log troubleshooting, shutdown, and rollback to reduce onsite communication cost.',
    '技术重点': 'Technical Focus',
    '关注 P/D 分离拓扑、Router 转发关系、GPU 资源隔离、服务健康检查和 OpenAI 兼容接口验证，便于客户按步骤复现。': 'Focus on P/D separation topology, Router forwarding, GPU resource isolation, service health checks, and OpenAI-compatible API validation so customers can reproduce the process step by step.',
    '可复用沉淀': 'Reusable Assets',
    '把一次部署经验整理成标准手册模板，后续同类型模型、同类集群、同类客户 POC 可以快速复用。': 'Turn one deployment experience into a standard manual template that can be reused for similar models, clusters, and customer POCs.',
    '确认基础环境、容器镜像和模型目录。': 'Confirm base environment, container image, and model directory.',
    '按 Prefill、Decode、Router 顺序拉起服务。': 'Start services in Prefill, Decode, and Router order.',
    '用兼容接口完成非流式、流式和异常路径验证。': 'Validate non-streaming, streaming, and exception paths through compatible APIs.',
    '定位日志、保存证据、执行停服或回滚。': 'Locate logs, save evidence, and execute shutdown or rollback.',
    '面向长上下文推理场景，整理多节点 P/D 分离部署流程，覆盖拓扑规划、容器启动、通用环境变量、脚本化拉起、流式问答验证与日志排障。': 'For long-context inference scenarios, organize multi-node P/D separated deployment covering topology planning, container startup, shared environment variables, scripted launch, streaming QA validation, and log troubleshooting.',
    '多节点拓扑': 'Multi-Node Topology',
    '长上下文': 'Long Context',
    '模型部署': 'Model Deployment',
    '把多节点推理部署从“经验口述”变成结构化手册，明确角色分工、启动顺序、验证方法和排障入口。': 'Turn multi-node inference deployment from spoken experience into a structured manual with clear roles, startup order, validation methods, and troubleshooting entry points.',
    '强调 Prefill/Decode/Router 的分工、跨节点协同、长上下文能力验证、流式响应稳定性和日志链路。': 'Emphasize Prefill/Decode/Router roles, cross-node collaboration, long-context validation, streaming response stability, and log chains.',
    '沉淀为客户交付模板后，可用于同类大模型 POC、集群扩容、售后复盘和新人交接。': 'After being packaged as a customer delivery template, it can support similar LLM POCs, cluster expansion, after-sales review, and onboarding.',
    '规划 P/D 节点角色、模型位置和服务端口。': 'Plan P/D node roles, model locations, and service ports.',
    '统一环境变量与容器参数，降低节点差异。': 'Unify environment variables and container parameters to reduce node differences.',
    '逐层验证 Router、Decode、Prefill 的健康状态。': 'Validate Router, Decode, and Prefill health status layer by layer.',
    '完成长上下文与流式问答测试，输出验收结论。': 'Complete long-context and streaming QA tests, then output acceptance conclusions.',
    '© 2026 周猛 Jack Zhou · FAE Engineer · AI Compute': '© 2026 Jack Zhou · FAE Engineer · AI Compute'
  }
};

translations.en['切换强调色'] = 'Switch Accent';
translations.en['选择强调色'] = 'Select Accent';
translations.en['切换明暗模式'] = 'Switch Theme';
translations.en['切换到深色模式'] = 'Switch to Dark Mode';
translations.en['切换到浅色模式'] = 'Switch to Light Mode';
translations.en['切换为英文'] = 'Switch to English';
translations.en['切换为中文'] = 'Switch to Chinese';
translations.en['打开导航菜单'] = 'Open Navigation Menu';
translations.en['关闭导航菜单'] = 'Close Navigation Menu';

let currentLanguage = 'zh';
let i18nTextNodes = [];
let heroTypeTimer = null;

const interactiveCardSelector = [
  '.console-card',
  '.brief-main',
  '.brief-card',
  '.advantage-grid article',
  '.system-card',
  '.work-card',
  '.proj-card',
  '.timeline-card',
  '.contact-card',
  '.terminal-panel',
  '.bench-panel',
  '.education-card'
].join(', ');

function readPreference(key, fallback) {
  try {
    return window.localStorage?.getItem(key) || fallback;
  } catch (error) {
    return fallback;
  }
}

function writePreference(key, value) {
  try {
    window.localStorage?.setItem(key, value);
  } catch (error) {
    // 个别嵌入式浏览器会限制 localStorage；交互状态仍在当前页面即时生效。
  }
}

function translateLabel(label, lang = currentLanguage) {
  if (lang !== 'en') return label;
  return translations.en[label] || label;
}

function collectI18nTargets() {
  if (i18nTextNodes.length) return;
  const ignoredTags = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'CANVAS']);
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
        if (ignoredTags.has(node.parentElement?.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  while (walker.nextNode()) {
    i18nTextNodes.push({
      node: walker.currentNode,
      original: walker.currentNode.nodeValue
    });
  }
}

function translateNodeValue(original, lang) {
  if (lang !== 'en') return original;
  const trimmed = original.trim();
  const translated = translations.en[trimmed];
  if (!translated) return original;
  return original.replace(trimmed, translated);
}

function setTranslatedAttribute(el, attr, zhValue, lang = currentLanguage) {
  if (!el || !zhValue) return;
  el.setAttribute(attr, translateLabel(zhValue, lang));
}

function applyLanguage(lang) {
  const value = lang === 'en' ? 'en' : 'zh';
  currentLanguage = value;
  collectI18nTargets();

  document.documentElement.lang = value === 'en' ? 'en' : 'zh-CN';
  document.body.dataset.lang = value;
  document.title = value === 'en'
    ? 'Jack Zhou · FAE Engineer · AI Compute Technical Support'
    : zhPageTitle;
  if (metaDescription) {
    metaDescription.setAttribute('content', value === 'en'
      ? 'Jack Zhou, FAE Engineer focused on AI compute technical support, GPU server POC, domestic computing adaptation, LLM training/inference, cluster delivery, and key-account support.'
      : zhMetaDescription);
  }

  i18nTextNodes.forEach(item => {
    item.node.nodeValue = translateNodeValue(item.original, value);
  });

  if (languageToggle) {
    languageToggle.textContent = value === 'en' ? '中文' : 'EN';
    setTranslatedAttribute(languageToggle, 'aria-label', value === 'en' ? '切换为中文' : '切换为英文', value);
    setTranslatedAttribute(languageToggle, 'title', value === 'en' ? '切换为中文' : '切换为英文', value);
  }

  setTranslatedAttribute(paletteToggle, 'aria-label', '选择强调色', value);
  setTranslatedAttribute(paletteToggle, 'title', '选择强调色', value);
  setTranslatedAttribute(themeToggle, 'aria-label', '切换明暗模式', value);
  applyTheme(document.documentElement.dataset.theme);
  setMobileNav(navLinks?.classList.contains('is-open'));
  startHeroTypewriter();
}

function applyTheme(theme) {
  const value = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = value;
  themeToggle?.setAttribute('aria-pressed', String(value === 'light'));
  themeToggle?.setAttribute('title', value === 'light'
    ? translateLabel('切换到深色模式')
    : translateLabel('切换到浅色模式'));
}

function applyAccent(accent) {
  const alias = { amber: 'golden', violet: 'purple', green: 'emerald' };
  const normalized = alias[accent] || accent;
  const value = accents.includes(normalized) ? normalized : 'rose';
  document.documentElement.dataset.accent = value;
  paletteToggle?.setAttribute('data-accent-current', value);
  paletteOptions.forEach(option => {
    const active = option.dataset.accentOption === value;
    option.classList.toggle('is-active', active);
    option.setAttribute('aria-checked', String(active));
  });
}

function setPaletteMenu(open) {
  if (!paletteToggle || !paletteMenu) return;
  paletteMenu.hidden = !open;
  paletteToggle.setAttribute('aria-expanded', String(open));
  themePicker?.classList.toggle('is-open', open);
}

applyTheme(readPreference(THEME_KEY, 'dark'));
applyAccent(readPreference(ACCENT_KEY, 'rose'));

themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(next);
  writePreference(THEME_KEY, next);
});

paletteToggle?.addEventListener('click', () => {
  setPaletteMenu(paletteMenu?.hidden !== false);
});

paletteOptions.forEach(option => {
  option.addEventListener('click', () => {
    const next = option.dataset.accentOption || 'rose';
    applyAccent(next);
    writePreference(ACCENT_KEY, next);
    setPaletteMenu(false);
  });
});

languageToggle?.addEventListener('click', () => {
  const next = currentLanguage === 'en' ? 'zh' : 'en';
  applyLanguage(next);
  writePreference(LANG_KEY, next);
});

document.addEventListener('click', event => {
  if (!paletteMenu || paletteMenu.hidden) return;
  if (themePicker?.contains(event.target)) return;
  setPaletteMenu(false);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setPaletteMenu(false);
});

function setupCursorEffects() {
  if (!cursorAura || !cursorDot) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.body.classList.add('has-cursor-fx');
  let lastTrail = 0;
  let activeCard = null;

  const setActiveCard = card => {
    if (card === activeCard) return;
    activeCard?.classList.remove('is-card-hot');
    activeCard = card;
    activeCard?.classList.add('is-card-hot');
  };

  document.addEventListener('pointermove', event => {
    const x = event.clientX;
    const y = event.clientY;
    document.documentElement.style.setProperty('--mx', `${x}px`);
    document.documentElement.style.setProperty('--my', `${y}px`);
    cursorAura.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    cursorDot.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    const now = performance.now();
    if (now - lastTrail > 36) {
      lastTrail = now;
      const trail = document.createElement('span');
      trail.className = 'cursor-trail';
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      document.body.appendChild(trail);
      window.setTimeout(() => trail.remove(), 680);
    }

    setActiveCard(document.elementFromPoint(x, y)?.closest(interactiveCardSelector));
  }, { passive: true });

  document.addEventListener('pointerleave', () => setActiveCard(null));

  document.addEventListener('pointerover', event => {
    if (event.target.closest('a, button, [role="button"], .work-card, .proj-card, .system-card, .bench-panel, .contact-card')) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('pointerout', event => {
    if (event.target.closest('a, button, [role="button"], .work-card, .proj-card, .system-card, .bench-panel, .contact-card')) {
      document.body.classList.remove('cursor-hover');
    }
  });

  document.querySelectorAll(`.lab-section, ${interactiveCardSelector}`).forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--card-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--card-y', `${event.clientY - rect.top}px`);
    }, { passive: true });
  });
}

setupCursorEffects();

function setupCardInteractions() {
  document.addEventListener('pointerdown', event => {
    const card = document.elementFromPoint(event.clientX, event.clientY)?.closest(interactiveCardSelector);
    if (!card) return;
    card.classList.remove('is-pressing');
    void card.offsetWidth;
    card.classList.add('is-pressing');
    window.setTimeout(() => card.classList.remove('is-pressing'), 420);
  });

  document.querySelectorAll(interactiveCardSelector).forEach(card => {
    if (!card.querySelector(':scope > .card-rail')) {
      const rail = document.createElement('span');
      rail.className = 'card-rail';
      rail.setAttribute('aria-hidden', 'true');
      card.appendChild(rail);
    }

    card.addEventListener('pointerenter', () => {
      card.classList.add('is-card-hot');
    });

    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-card-hot', 'is-pressing');
    });

  });
}

setupCardInteractions();

function resizeCanvas() {
  if (!canvas || !ctx) return;
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function makeParticles() {
  const count = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 13000));
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    z: 0.35 + Math.random() * 0.9,
    vx: -0.00008 + Math.random() * 0.00016,
    vy: 0.00008 + Math.random() * 0.00022,
    size: 0.7 + Math.random() * 1.8,
    alpha: 0.12 + Math.random() * 0.28
  }));
}

let particles = makeParticles();
window.addEventListener('resize', () => { particles = makeParticles(); });

function drawBackground() {
  if (!ctx || !W || !H) return;
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < -0.04) p.x = 1.04;
    if (p.x > 1.04) p.x = -0.04;
    if (p.y > 1.04) p.y = -0.04;
    const x = p.x * W;
    const y = p.y * H;
    ctx.beginPath();
    ctx.arc(x, y, p.size * p.z, 0, PI2);
    ctx.fillStyle = `rgba(216,166,58,${p.alpha})`;
    ctx.fill();
  });
  ctx.restore();
  window.requestAnimationFrame(drawBackground);
}

drawBackground();

/* ---------- AI Compute Core：轻量 3D 算力核心 ---------- */
function setupComputeCore() {
  const host = document.getElementById('computeCore');
  const coreCanvas = document.getElementById('computeCoreCanvas');
  const modeEl = document.getElementById('computeCoreMode');
  const coreCtx = coreCanvas?.getContext('2d');
  if (!host || !coreCanvas || !coreCtx) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = 0;
  let height = 0;
  let angle = 0;
  let pitch = -0.22;
  let zoom = 1;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let stateIndex = 0;
  const states = ['AI COMPUTE CORE // READY', 'GPU POC // VALIDATING', 'CLUSTER DELIVERY // ONLINE'];
  const points = Array.from({ length: 62 }, (_, index) => {
    const t = (index + .5) / 62;
    const y = 1 - 2 * t;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = Math.PI * (3 - Math.sqrt(5)) * index;
    return { x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius, size: 1 + (index % 4) * .35 };
  });

  function resize() {
    const rect = host.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    coreCanvas.width = Math.round(width * dpr);
    coreCanvas.height = Math.round(height * dpr);
    coreCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function project(point) {
    const cy = Math.cos(angle), sy = Math.sin(angle);
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    const x1 = point.x * cy - point.z * sy;
    const z1 = point.x * sy + point.z * cy;
    const y1 = point.y * cp - z1 * sp;
    const z2 = point.y * sp + z1 * cp;
    const scale = (Math.min(width, height) * .27) * zoom;
    return { x: width / 2 + x1 * scale, y: height / 2 + y1 * scale, z: z2, r: point.size * (1.2 + z2 * .55) };
  }

  function draw() {
    coreCtx.clearRect(0, 0, width, height);
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim() || '#f6bd16';
    const hot = getComputedStyle(document.documentElement).getPropertyValue('--orange-hot').trim() || '#ff4f7b';
    const glow = coreCtx.createRadialGradient(width / 2, height / 2, 2, width / 2, height / 2, width * .36);
    glow.addColorStop(0, `${hot}55`); glow.addColorStop(.5, `${accent}18`); glow.addColorStop(1, 'transparent');
    coreCtx.fillStyle = glow; coreCtx.fillRect(0, 0, width, height);

    const ring = Math.min(width, height) * .28 * zoom;
    coreCtx.save(); coreCtx.translate(width / 2, height / 2); coreCtx.rotate(angle * .35);
    coreCtx.strokeStyle = `${accent}66`; coreCtx.lineWidth = 1;
    coreCtx.beginPath(); coreCtx.ellipse(0, 0, ring, ring * .34, 0, 0, Math.PI * 2); coreCtx.stroke();
    coreCtx.strokeStyle = `${hot}55`; coreCtx.setLineDash([3, 7]);
    coreCtx.beginPath(); coreCtx.ellipse(0, 0, ring * .8, ring * .23, Math.PI * .48, 0, Math.PI * 2); coreCtx.stroke(); coreCtx.setLineDash([]); coreCtx.restore();

    const projected = points.map(project).sort((a, b) => a.z - b.z);
    projected.forEach((p, index) => {
      const alpha = .28 + (p.z + 1) * .28;
      coreCtx.fillStyle = index % 7 === 0 ? hot : accent;
      coreCtx.globalAlpha = alpha;
      coreCtx.beginPath(); coreCtx.arc(p.x, p.y, Math.max(.7, p.r), 0, PI2); coreCtx.fill();
    });
    coreCtx.globalAlpha = 1;
    coreCtx.strokeStyle = `${accent}44`; coreCtx.lineWidth = 1;
    coreCtx.beginPath(); coreCtx.moveTo(width * .26, height * .72); coreCtx.lineTo(width * .74, height * .28); coreCtx.stroke();
    coreCtx.fillStyle = hot; coreCtx.globalAlpha = .95; coreCtx.beginPath(); coreCtx.arc(width / 2, height / 2, 3.5 + Math.sin(angle * 2) * 1.2, 0, PI2); coreCtx.fill(); coreCtx.globalAlpha = 1;
    if (!reduceMotion && !dragging) angle += .0038;
    window.requestAnimationFrame(draw);
  }

  host.addEventListener('pointerdown', event => { dragging = true; lastX = event.clientX; lastY = event.clientY; host.setPointerCapture?.(event.pointerId); });
  host.addEventListener('pointermove', event => { if (!dragging) return; angle += (event.clientX - lastX) * .009; pitch = Math.max(-.9, Math.min(.9, pitch + (event.clientY - lastY) * .006)); lastX = event.clientX; lastY = event.clientY; });
  host.addEventListener('pointerup', () => { dragging = false; });
  host.addEventListener('pointercancel', () => { dragging = false; });
  host.addEventListener('wheel', event => { event.preventDefault(); zoom = Math.max(.72, Math.min(1.34, zoom - event.deltaY * .0008)); }, { passive: false });
  host.addEventListener('click', () => { if (modeEl) { stateIndex = (stateIndex + 1) % states.length; modeEl.textContent = states[stateIndex]; } });
  window.addEventListener('resize', resize);
  resize(); draw();
}

setupComputeCore();

/* ---------- 首页姓名兜底 ---------- */
const typeEl = document.getElementById('typeTarget');
if (typeEl && !typeEl.textContent.trim()) {
  typeEl.textContent = 'Jack Zhou';
}

function startHeroTypewriter() {
  if (!typeEl) return;
  window.clearTimeout(heroTypeTimer);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phrases = currentLanguage === 'en'
    ? ['Jack Zhou', 'AI Compute FAE', 'GPU POC Solver', 'Cluster Delivery']
    : ['Jack Zhou', 'AI 算力 FAE', 'GPU POC Solver', '集群交付闭环'];

  if (reducedMotion) {
    typeEl.classList.remove('is-typing');
    typeEl.textContent = phrases[0];
    return;
  }

  typeEl.classList.add('is-typing');
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const write = () => {
    const phrase = phrases[phraseIndex];
    typeEl.textContent = phrase.slice(0, charIndex);

    if (!deleting && charIndex < phrase.length) {
      charIndex += 1;
      heroTypeTimer = window.setTimeout(write, 76 + Math.random() * 28);
      return;
    }

    if (!deleting) {
      deleting = true;
      heroTypeTimer = window.setTimeout(write, 1500);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      heroTypeTimer = window.setTimeout(write, 38 + Math.random() * 20);
      return;
    }

    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    heroTypeTimer = window.setTimeout(write, 90);
  };

  charIndex = phrases[0].length;
  typeEl.textContent = phrases[0];
  heroTypeTimer = window.setTimeout(write, 1300);
}

/* ---------- 作品卡片：站内 Portal 详情 ---------- */
const workReader = document.getElementById('workReader');
const readerClose = document.getElementById('readerClose');
const readerTitle = document.getElementById('readerTitle');
const externalWorkContent = document.getElementById('externalWorkContent');
const externalWorkFrame = document.getElementById('externalWorkFrame');
const externalWorkTitle = document.getElementById('externalWorkTitle');
const externalWorkDesc = document.getElementById('externalWorkDesc');
const externalWorkLink = document.getElementById('externalWorkLink');
const projectReaderContent = document.getElementById('projectReaderContent');
const projectReaderMeta = document.getElementById('projectReaderMeta');
const projectReaderHeading = document.getElementById('projectReaderHeading');
const projectReaderSummary = document.getElementById('projectReaderSummary');
const projectReaderMetrics = document.getElementById('projectReaderMetrics');
const projectReaderGrid = document.getElementById('projectReaderGrid');
const projectReaderSteps = document.getElementById('projectReaderSteps');
const portalCards = document.querySelectorAll('.work-card-portal[data-manual]');
let activeManualCard = null;
let readerCloseTimer = null;

const manualTitles = {
  market: '每日盯盘 · 3D Market Deck',
  starship: '星舰 V3 · 工程级 3D 交付',
  moore: '摩尔线程产品介绍 · 互动演示',
  jarvis: 'JARVIS 全息人形 · 3D Preview',
  deepseek: 'DeepSeek V4 Flash PD 分离部署手册',
  glm: 'GLM5.2 PD 部署操作手册'
};

const projectDetails = {
  jd: { meta:'2026.06 至今 · 云 / 零售', title:'京东云及零售 GPU 服务器项目', summary:'围绕 GPU 服务器从 POC、送测准入到批量交付建立完整闭环，长期协调客户、研发、供应链和交付团队。', metrics:['500+ 台 AI 服务器','POC / 基准验证','批量交付'], grid:[['项目职责','主导客户需求澄清、测试项拆解、基准验证和大模型训推适配，推动结果进入选型与订单阶段。'],['技术链路','覆盖服务器硬件、GPU 驱动、模型环境、性能基线、稳定性验证与现场问题闭环。'],['交付沉淀','将现场经验整理为验收清单、上线标准和可复用 SOP，降低批量交付中的重复沟通成本。']], steps:['梳理客户场景与服务器 / 加速卡配置，明确验收目标。','搭建测试环境并完成硬件、驱动、模型和网络基线。','根据结果定位瓶颈，组织研发、供应链和客户联合复测。','输出验收结论与交付文档，推进批量上线。']},
  meituan: { meta:'2025.10 至今 · 互联网', title:'美团互联网客户 POC', summary:'面向互联网推荐和大模型场景，完成训练、推理、平台适配与客户验收，支撑年度算力集采落地。', metrics:['满意度 98%','Llama3 / LongCat 适配','DeepSeek 671B 双机推理'], grid:[['验证范围','覆盖 Llama3 训练、DeepSeek 671B 双机推理、LongCat 模型适配调优，以及 AI 平台和搜广推模型适配。'],['现场协同','把客户模型、数据、网络和平台约束拆解成可复现测试项，协调多方完成问题闭环。'],['交付结果','以性能、稳定性和可维护性证据支撑客户选型，推动 POC 结果进入年度集采。']], steps:['确认模型版本、并行策略、节点配置和验收指标。','完成 Llama3、LongCat 等模型训练 / 推理链路部署，记录吞吐、时延和显存数据。','针对异常日志和性能波动组织复测与参数调优。','提交验收报告，支撑客户决策和后续交付。']},
  kuaishou: { meta:'2025.04 至今 · POC 负责人', title:'快手 GPU 板卡 / 服务器 POC', summary:'统筹 GPU 板卡与服务器送测准入、整机联调、功耗温控基线及大模型适配，输出可上线的校验标准。', metrics:['POC 负责人','整机联调','上线校验标准'], grid:[['需求对接','将客户业务场景、卡型选择、服务器配置和平台要求转化为送测计划。'],['验证重点','覆盖功耗温控、稳定性、驱动兼容、模型训练 / 推理和整机协同。'],['标准化输出','整理送测记录、问题清单、复测结论和上线校验标准，便于后续复制。']], steps:['建立送测准入表和环境基线，确认软硬件版本。','完成整机联调、温控功耗和稳定性验证。','执行模型训练 / 推理适配并定位问题根因。','形成上线校验标准与客户验收结论。']},
  cetc: { meta:'2025.10 至今 · 央国企', title:'中电科智能院 AI 算力集群', summary:'参与技术评分与集群交付，完成 Qwen、DeepSeek-R1、WAN、GLM 等 9 款主流大模型适配调优，并补充 DeepSeek-V4-Flash/Pro 与 GLM-5.1/5.2 的 SGLang 框架适配。', metrics:['技术评分第一','DeepSeek-V4-Flash/Pro','GLM-5.1/5.2 · SGLang'], grid:[['方案工作','结合客户模型和集群资源，规划节点角色、部署方式、网络与验收路径。'],['适配调优','完成 Qwen、DeepSeek-R1、WAN、GLM 等模型适配，并针对 DeepSeek-V4-Flash/Pro、GLM-5.1/5.2 在 SGLang 框架下完成部署验证与参数调优。'],['交付闭环','从环境准备、集群部署到问题定位和验收材料，推动项目按节点交付。']], steps:['确认集群拓扑、节点资源、模型清单和验收口径。','完成操作系统、驱动、运行时、SGLang 与网络环境准备。','逐模型验证训练 / 推理能力，记录性能与稳定性证据。','整理适配结论和交付文档，完成客户验收。']},
  psbc: { meta:'2022.03 - 2022.09 · 金融', title:'邮储银行 GPU 图形卡集采', summary:'协助信创 GPU 产品需求调研、兼容性测试与投标材料筹备，支撑 10 万张订单落地。', metrics:['10 万张订单','信创适配','投标技术支持'], grid:[['需求调研','围绕金融终端场景梳理图形卡规格、系统环境和兼容性要求。'],['测试验证','配合完成产品兼容性、稳定性与终端场景验证，沉淀测试结果。'],['项目支持','参与投标材料、技术应答和跨团队沟通，为集采决策提供依据。']], steps:['梳理终端、系统和图形应用的兼容性要求。','建立测试矩阵并完成关键场景验证。','汇总测试证据，配合投标技术材料编制。','跟进问题澄清与采购落地。']},
  icbc: { meta:'2023.02 - 2024.11 · 金融 / 运营商', title:'工行 / 移动终端集采', summary:'负责 GPU 图形卡终端场景适配验证与问题排查，通过集采技术资质审核，支撑约 30 万张订单。', metrics:['约 30 万张','技术资质审核','终端适配'], grid:[['场景验证','覆盖金融和运营商终端的驱动、显示、应用兼容与稳定性问题。'],['问题排查','结合日志、复现环境和版本差异定位问题，协调研发输出修复方案。'],['采购支撑','完成技术资质审核相关材料和验证结论，支撑大规模集采。']], steps:['收集终端型号、系统版本和应用清单。','执行兼容性、稳定性和显示效果验证。','复现问题并完成版本 / 驱动排查。','提交资质审核证据和集采技术结论。']},
  robotics: { meta:'2024.02 - 2024.10 · 工业机器人', title:'东土科技工业机器人项目', summary:'协助对接 ODM 与工业自动化合作伙伴，推进摩尔线程高算力 SOC 芯片与工业机器人场景的软硬件适配和落地交付。', metrics:['工业机器人场景','SOC 适配','ODM 协同'], grid:[['合作协同','对接 ODM、工业自动化伙伴和芯片团队，拉通需求、方案与验证节奏。'],['适配工作','围绕机器人场景完成软硬件接口、图形能力和系统稳定性验证。'],['交付推进','梳理采购需求、问题清单和落地条件，推动方案进入实际应用。']], steps:['确认机器人控制、视觉和图形计算场景。','完成硬件、驱动、系统和应用接口适配。','记录现场问题并组织 ODM 与研发联合排查。','输出适配结论和采购 / 交付建议。']},
  bim: { meta:'2025.12 至今 · 建筑设计', title:'雅江集团建研院国产图形工作站项目', summary:'主导项目统筹，携手紫光计算机拉通需求、方案、测试链路，设计国产化图形工作站和多场景测试验证体系。', metrics:['国产化图形工作站','多场景验证','预计建模效率提升 90%'], grid:[['方案统筹','将建筑设计软件、模型规模和工作流要求拆解为工作站配置与测试方案。'],['协同推进','联合紫光计算机及相关团队推进需求、方案、测试和问题收敛。'],['价值验证','围绕 3D 建模等典型场景建立验证基线，评估国产化方案的可用性。']], steps:['调研建模、渲染、协同等典型工作流。','完成国产硬件、驱动和软件环境配置。','执行多场景性能、稳定性和兼容性测试。','沉淀选型建议、测试报告与交付方案。']},
  events: { meta:'2021.12 至今 · 产品支持', title:'公司大型展会产品支持', summary:'负责新品发布会、MDC 2025 医疗板块、紫光销售大会、WAIC、中移动装备供应链大会等展会 Demo 部署与现场讲解。', metrics:['50+ 场讲解','30+ 意向线索','Demo 部署支持'], grid:[['现场交付','根据展会场地、设备和演示脚本完成 Demo 部署、联调与现场保障。'],['产品讲解','面向客户和合作伙伴讲解 GPU、服务器及 AI 算力产品能力和应用场景。'],['线索沉淀','记录现场反馈、客户问题和意向线索，为销售和产品迭代提供输入。']], steps:['确认展会主题、演示设备、网络和脚本。','完成设备部署、模型 / 应用调试和故障预案。','现场演示并根据观众问题调整讲解路径。','汇总反馈、线索和复盘结论。']}
};

function openManual(manual, card) {
  if (!workReader || !manual) return;
  clearTimeout(readerCloseTimer);
  activeManualCard = card || document.querySelector(`.work-card-portal[data-manual="${manual}"]`);
  const externalUrl = activeManualCard?.dataset.workUrl;
  const cardTitle = activeManualCard?.querySelector('h3')?.textContent?.trim();
  const cardDesc = activeManualCard?.querySelector('p')?.textContent?.trim();

  portalCards.forEach(item => {
    item.classList.remove('is-returning');
    item.classList.toggle('is-diving', item === activeManualCard);
  });

  document.querySelectorAll('[data-manual-content]').forEach(content => {
    content.classList.toggle('is-active', !externalUrl && content.dataset.manualContent === manual);
  });
  projectReaderContent?.classList.remove('is-active');
  externalWorkContent?.classList.toggle('is-active', Boolean(externalUrl));

  if (externalUrl) {
    if (externalWorkTitle) externalWorkTitle.textContent = cardTitle || translateLabel(manualTitles[manual] || '作品预览');
    if (externalWorkDesc) externalWorkDesc.textContent = cardDesc || translateLabel('原作品页面会在这里直接打开；如果浏览器限制嵌入，可使用备用入口新窗口查看。');
    if (externalWorkLink) externalWorkLink.href = externalUrl;
    if (externalWorkFrame && externalWorkFrame.src !== externalUrl) externalWorkFrame.src = externalUrl;
  } else if (externalWorkFrame) {
    externalWorkFrame.removeAttribute('src');
  }

  if (readerTitle) readerTitle.textContent = translateLabel(manualTitles[manual] || '作品详情');
  workReader.hidden = false;
  workReader.setAttribute('aria-hidden', 'false');
  workReader.classList.remove('is-closing');
  workReader.classList.toggle('has-frame', Boolean(externalUrl));
  document.body.classList.add('reader-open');

  window.requestAnimationFrame(() => {
    workReader.classList.add('is-open');
    readerClose?.focus({ preventScroll: true });
  });
}

function openProjectDetail(key, card) {
  const detail = projectDetails[key];
  if (!workReader || !detail) return;
  clearTimeout(readerCloseTimer);
  activeManualCard = card || document.querySelector(`[data-project-open="${key}"]`)?.closest('.proj-card');
  document.querySelectorAll('.work-card-portal').forEach(item => item.classList.remove('is-diving', 'is-returning'));
  document.querySelectorAll('[data-manual-content]').forEach(content => content.classList.remove('is-active'));
  projectReaderContent?.classList.add('is-active');
  if (projectReaderMeta) projectReaderMeta.textContent = detail.meta;
  if (projectReaderHeading) projectReaderHeading.textContent = detail.title;
  if (projectReaderSummary) projectReaderSummary.textContent = detail.summary;
  if (projectReaderMetrics) projectReaderMetrics.innerHTML = detail.metrics.map(item => `<span><strong>${item}</strong></span>`).join('');
  if (projectReaderGrid) projectReaderGrid.innerHTML = detail.grid.map(item => `<section><h4>${item[0]}</h4><p>${item[1]}</p></section>`).join('');
  if (projectReaderSteps) projectReaderSteps.innerHTML = detail.steps.map((item, index) => `<li><b>${String(index + 1).padStart(2, '0')}</b><span>${item}</span></li>`).join('');
  if (activeManualCard) activeManualCard.classList.add('is-diving');
  if (readerTitle) readerTitle.textContent = detail.title;
  workReader.hidden = false;
  workReader.setAttribute('aria-hidden', 'false');
  workReader.classList.remove('is-closing', 'has-frame');
  document.body.classList.add('reader-open');
  window.requestAnimationFrame(() => { workReader.classList.add('is-open'); readerClose?.focus({ preventScroll: true }); });
}

function closeManual() {
  if (!workReader || workReader.hidden) return;
  workReader.classList.add('is-closing');
  workReader.classList.remove('is-open');

  if (activeManualCard) {
    activeManualCard.classList.remove('is-diving');
    activeManualCard.classList.add('is-returning');
  }

  readerCloseTimer = window.setTimeout(() => {
    workReader.hidden = true;
    workReader.setAttribute('aria-hidden', 'true');
    workReader.classList.remove('is-closing', 'has-frame');
    document.body.classList.remove('reader-open');
    document.querySelectorAll('[data-manual-content]').forEach(content => content.classList.remove('is-active'));
    projectReaderContent?.classList.remove('is-active');
    externalWorkContent?.classList.remove('is-active');
    if (externalWorkFrame) externalWorkFrame.removeAttribute('src');
    if (activeManualCard) {
      activeManualCard.focus({ preventScroll: true });
      activeManualCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => activeManualCard?.classList.remove('is-returning'), 420);
    }
  }, 300);
}

portalCards.forEach(card => {
  card.addEventListener('click', event => {
    if (event.target.closest('.work-source')) return;
    const manual = event.target.closest('[data-manual-open]')?.dataset.manualOpen || card.dataset.manual;
    openManual(manual, card);
  });
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openManual(card.dataset.manual, card);
    }
  });
});

readerClose?.addEventListener('click', closeManual);
workReader?.addEventListener('click', event => {
  if (event.target === workReader) closeManual();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && workReader && !workReader.hidden) closeManual();
});

document.querySelectorAll('[data-project-open]').forEach(button => {
  button.addEventListener('click', event => {
    event.stopPropagation();
    openProjectDetail(button.dataset.projectOpen, button.closest('.proj-card'));
  });
});

/* ---------- 参考站等价功能：作品/项目筛选 ---------- */
function setupFilter(buttonSelector, itemSelector, attrName) {
  const buttons = document.querySelectorAll(buttonSelector);
  const items = document.querySelectorAll(itemSelector);
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.dataset[attrName];
      buttons.forEach(item => item.classList.toggle('is-active', item === button));
      items.forEach(item => {
        const kinds = (item.dataset.workKind || item.dataset.projectKind || '').split(/\s+/);
        const visible = value === 'all' || kinds.includes(value);
        item.hidden = !visible;
      });
    });
  });
}

setupFilter('[data-work-filter]', '[data-work-kind]', 'workFilter');
setupFilter('[data-project-filter]', '[data-project-kind]', 'projectFilter');

/* ---------- 参考站等价功能：Workbench 标签切换 ---------- */
const benchTabs = document.querySelectorAll('[data-bench-tab]');
const benchPanels = document.querySelectorAll('[data-bench-panel]');
benchTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.benchTab;
    benchTabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    benchPanels.forEach(panel => {
      panel.classList.toggle('is-active', panel.dataset.benchPanel === key);
    });
  });
});

/* ---------- 项目卡片轻量倾斜 ---------- */
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${px * 4}deg) rotateX(${-py * 4}deg) translateY(-2px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ---------- 联系按钮：复制反馈 ---------- */
const copyTip = document.getElementById('copyTip');
document.querySelectorAll('.contact-btn[data-copy]').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.copy;
    navigator.clipboard.writeText(val).then(() => {
      if (copyTip) copyTip.textContent = currentLanguage === 'en' ? '✓ Copied: ' + val : '✓ 已复制：' + val;
      window.setTimeout(() => { if (copyTip) copyTip.textContent = ''; }, 2000);
    }).catch(() => {
      if (copyTip) copyTip.textContent = currentLanguage === 'en' ? 'Copy failed. Please copy manually: ' + val : '复制失败，请手动复制：' + val;
    });
  });
});

/* ---------- 分享简历链接 ---------- */
const shareResume = document.getElementById('shareResume');
shareResume?.addEventListener('click', async () => {
  const host = window.location.hostname.toLowerCase();
  const currentUrl = window.location.href.split('#')[0];
  const shareUrl = /^(127\.0\.0\.1|localhost)$/i.test(host)
    ? 'https://jackzhou1018.github.io/resume/'
    : host.includes('netlify.app')
      ? 'https://jack-zhou-resume-global.netlify.app/'
      : host.includes('github.io')
        ? 'https://jackzhou1018.github.io/resume/'
        : currentUrl;
  try {
    await navigator.clipboard.writeText(shareUrl);
    if (copyTip) copyTip.textContent = currentLanguage === 'en' ? '✓ Link copied: ' + shareUrl : '✓ 已复制简历链接';
  } catch (error) {
    if (copyTip) copyTip.textContent = currentLanguage === 'en' ? 'Copy failed. Please copy the URL manually.' : '复制失败，请手动复制网址';
  }
  window.setTimeout(() => { if (copyTip) copyTip.textContent = ''; }, 2400);
});

/* ---------- 移动端导航 ---------- */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const viewSections = document.querySelectorAll('.lab-section[id]');
window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 40));

function setMobileNav(open) {
  navToggle?.classList.toggle('is-open', open);
  navLinks?.classList.toggle('is-open', open);
  navToggle?.setAttribute('aria-expanded', String(open));
  navToggle?.setAttribute('aria-label', open ? translateLabel('关闭导航菜单') : translateLabel('打开导航菜单'));
}

navToggle?.addEventListener('click', event => {
  event.stopPropagation();
  setMobileNav(!navLinks?.classList.contains('is-open'));
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMobileNav(false));
});

function activateView(sectionId, pushState = true) {
  const id = sectionId || 'hero';
  const target = document.getElementById(id);
  if (!target?.classList.contains('lab-section')) return false;

  labShell?.setAttribute('data-view-mode', 'single');
  viewSections.forEach(section => {
    section.classList.toggle('is-view-active', section === target);
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const linkId = link.getAttribute('href')?.slice(1);
    link.classList.toggle('is-active', linkId === id);
  });

  if (workReader && !workReader.hidden) closeManual();
  setMobileNav(false);
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

  if (pushState) {
    const clean = `${window.location.pathname}${window.location.search}#${id}`;
    window.history.replaceState(null, '', clean);
  }

  return true;
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href')?.slice(1);
    if (activateView(id, true)) event.preventDefault();
  });
});

window.addEventListener('hashchange', () => {
  activateView(window.location.hash.slice(1) || 'hero', false);
});

document.addEventListener('click', event => {
  if (!navLinks?.classList.contains('is-open')) return;
  if (nav?.contains(event.target)) return;
  setMobileNav(false);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMobileNav(false);
});

applyLanguage(readPreference(LANG_KEY, 'zh'));
activateView(window.location.hash.slice(1) || 'hero', false);

/* ---------- 入场动效：Digital Lab Boot ---------- */
const bootOverlay = document.getElementById('glitchOverlay');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finishBoot = () => {
  document.body.classList.remove('is-booting');
  if (bootOverlay) bootOverlay.style.display = 'none';
};

if (prefersReducedMotion) {
  finishBoot();
} else {
  window.setTimeout(() => {
    document.body.classList.remove('is-booting');
  }, 2200);
  window.setTimeout(finishBoot, 2800);
}

/* ---------- 背景视频加载兜底 ---------- */
const bgVideo = document.getElementById('bgVideo');
bgVideo?.addEventListener('error', () => {
  bgVideo.classList.add('is-unavailable');
});
