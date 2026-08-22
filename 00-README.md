# 个人简历网站项目记录

## 当前状态

- 线上地址：https://jackzhou1018.github.io/resume/
- 类型：纯静态 GitHub Pages 简历网站
- 当前阶段：AI Coding 作品集交互优化

## 2026-08-22 更新

- 将 DeepSeek V4 Flash PD 与 GLM5.2 PD 两个作品卡片改为站内 Portal 阅读器。
- 点击卡片后播放翻转/坠入动画，在当前页面打开作品详情。
- 退出作品后关闭详情层、恢复原卡片焦点和滚动位置，不触发首页欢迎动画。
- 已本地验证：两张卡片均可打开/退出，URL 保持 `#aicoding`，欢迎层未重新出现。

## 2026-08-22 追加更新

- 将每日盯盘、星舰 V3、摩尔线程产品介绍三张作品卡片也接入同一套 Portal 交互。
- 三个外部作品保留原始内容与原始 URL，通过站内 iframe 大窗口打开，并保留“新窗口打开原作品”兜底入口。
- 已本地验证：五张 Portal 卡片均可打开/退出，URL 保持 `#aicoding`，退出后回到原卡片正面。

## 2026-08-22 JARVIS 3D 更新

- 基于生成图参考，新增 `docs/jarvis-hologram-3d.html` 独立 Three.js 交互页面。
- 新增 AI Coding 作品卡片「JARVIS 全息人形 · 3D Preview」，点击后通过 Portal 在当前页面打开。
- 3D 页面包含半透明人形、胸口核心、环形数据轨道、粒子流、数据雨、Bloom 光效和 OrbitControls 旋转缩放。
- 已本地验证：3D 页面 canvas 正常生成，控制台无 error/warning；Portal 打开/退出正常，URL 保持 `#aicoding`。

## 2026-08-22 Apogee 背景更新

- 根据用户提供的 Apogee hero 提示词，替换全站背景为指定 CloudFront 深蓝/红色星云视频。
- 将页面底色改为 `#080A19`，移除首页原重暗遮罩，降低星空 canvas 干扰。
- 将核心内容卡片、AI Coding 卡片、项目卡片、时间线和联系按钮统一为 Apogee 风格玻璃拟态：`rgba(17,16,15,.35)` + 20px blur + 弱白边。
- 已本地验证：视频实际加载 CloudFront URL，播放状态正常；Portal 交互未受影响；控制台无 error/warning。

## 2026-08-22 3D 数字人语音入口

- 将首页原圆形“周”头像改为可点击 3D 全息数字人入口。
- 使用 Three.js 程序化生成轻量半透明人形、胸口核心、环形轨道和粒子流，适合 GitHub Pages 静态部署。
- 接入浏览器 Web Speech API：点击后可询问“项目、经历、AI Coding、能力、联系方式”，页面会跳转到对应区块并用 TTS 回复。
- 语音识别不支持或麦克风未授权时保留降级提示，不影响页面浏览和作品 Portal 交互。

## 2026-08-23 语音助手甜妹声线优化

- 将数字人 TTS 从普通中文声线改为中文女声优先选择，优先匹配 Xiaoxiao、Xiaoyi、Tingting、Meijia、中文女声等系统/浏览器声线。
- 调整语音参数为更柔和的甜妹模式：语速降低、音调提高、音量略收。
- 精简语音回复文案，减少播报感，让语音交互更自然。

## 2026-08-23 声音手动调节面板

- 在首页 3D 数字人下方新增「声音设置」按钮。
- 面板可选择当前浏览器可用 TTS 声线，调节语速和音调，并支持试听、保存、重置。
- 保存结果写入访问者本机浏览器 `localStorage`，不影响其他访问者。
- 默认语音参数回退为更自然的 `rate=0.96`、`pitch=1.0`，避免高音调造成尖锐感。

## 2026-08-23 OpenAI TTS 真人声接入

- 首页声音设置面板新增「OpenAI TTS 代理地址」和「OpenAI 声线」。
- 前端优先请求后端代理播放 OpenAI TTS 音频，失败或未配置时自动回退浏览器 TTS。
- 新增 `server/openai-tts-worker.js` Cloudflare Worker 代理模板，API Key 只从后端环境变量 `OPENAI_API_KEY` 读取，不进入 GitHub Pages 前端。
- 新增 `docs/openai-tts-worker部署说明.md`，记录部署与配置方法。
