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
