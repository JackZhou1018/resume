# 个人简历网站项目记录

## 当前状态

- 线上地址：https://jackzhou1018.github.io/resume/
- 类型：纯静态 GitHub Pages 简历网站
- 当前阶段：以原始 PDF 简历为内容源，按 v0 EinCode Digital Lab 结构重做，尚未发布
- 本地顶部入口：http://127.0.0.1:8093/index.html?cardtonecheck=20260830-cardtone1

## 2026-08-30 基于下载版 PDF 补充项目经历

- 以用户提供的 `jack-zhou-resume (1).pdf` 为内容与版式基准，保留原有详细履历，并新增同风格的项目补充页。
- 补充京东云及零售 GPU 服务器项目，以及美团 LongCat、中电科 DeepSeek-V4-Flash/Pro 与 GLM-5.1/5.2 SGLang 模型适配调优经历。
- 新文件为 `outputs/jack-zhou-resume.pdf`，共 6 页；已完成全页渲染检查，未发现明显截断或溢出。原下载版备份于 `work/jack-zhou-resume-source-download.pdf`。

## 2026-08-30 PDF 评审版调整

- 按用户反馈移除独立的“模型适配更新”区块，将 LongCat 放在美团项目段，将 DeepSeek-V4-Flash/Pro、GLM-5.1/5.2 与 SGLang 放在中电科项目段。
- 京东项目排在美团项目之前；当前 PDF 仅生成本地评审版，等待用户确认后再替换公网文件。

## 2026-08-30 PDF 公司业务描述优化

- 将工作经历第一页的岗位描述由“人工智能硬件”改为“GPU 服务器硬件与 AI 模型适配”，更准确体现公司业务和个人技术方向。
- 已重新渲染检查第一页，文字位置与原版层级一致，无覆盖或错位；仍未上线。

## 2026-08-30 PDF 模型能力概括

- 在第二页工作经历留白处补充一条自然的技术概括：覆盖 DeepSeek、GLM、Kimi、Qwen、MiniMax、Wan、Hunyuan 等国产开源大语言/多模态模型，主要使用 vLLM 与 SGLang P/D 分离推理框架。
- 已重新生成并检查第二页，新增内容未超出页面边界；当前仍为本地评审版。

## 2026-08-30 PDF 模型能力排版调整

- 按反馈将模型能力概括改为与上方工作经历一致的正文 bullet 层级和缩进，不再使用脚注式小字；内容保持在第二页工作经历留白区域。
- 已重新渲染检查第二页，新增两行与下方“测试运维”标题保持间距，当前仍未上线。

## 2026-08-30 PDF 模型能力 bullet 微调

- 将模型能力概括收敛为一条与上方一致的 bullet，句首使用清晰圆点，换行保持正文缩进；已完成第二页渲染复核。
- 根据复核再次缩小 bullet 并调整自然断行，模型名称不再被提前拆开；当前仍为本地评审版。

## 2026-08-30 PDF bullet 坐标复核

- 重新按原版正文坐标校准 bullet 左边距、圆点尺寸和字号，第一行延伸至正文可用宽度后再换行；第二页已重新渲染确认。

## 2026-08-30 PDF 补充京东项目经历

- 在 PDF 的“代表项目｜互联网与云”中补回京东云及零售 GPU 服务器项目，补充 POC、选型验证、批量部署、性能基准、大模型训练/推理验证及 500+ 台服务器交付内容。
- 对项目表述做了口语化精简，避免堆砌关键词；已重新生成并渲染检查第 3 页，文字完整、无明显溢出。

## 2026-08-30 PDF 简历模型适配内容同步

- 已将项目详情中的新增事实同步到 PDF 简历：美团项目加入 LongCat 模型适配调优；中电科项目加入 DeepSeek-V4-Flash/Pro、GLM-5.1/5.2 在 SGLang 框架下的模型适配调优。
- PDF 由 `work/build_resume_pdf.py` 生成，输出为 `outputs/jack-zhou-resume.pdf`；原 PDF 已备份至 `work/jack-zhou-resume-before-model-update.pdf`。
- 验收：PDF 共 5 页，已渲染检查项目经历页，新增文字均完整显示，无明显溢出或截断；本次仅更新本地 PDF，未提交、推送或重新发布网站。

## 2026-08-30 卡片 hover 底纹分色

- 根据用户要求“鼠标移到卡片时，卡片底纹颜色希望是不同的颜色”，将卡片 hover 背景、边框高亮、边缘扫光和点击态从全局强调色拆成每张卡独立的 `--card-tone` / `--card-tone-hot`。
- 现在同一页面里的能力卡、AI Coding 作品卡、项目卡、经历卡、联系卡、Workbench 面板等会按 Cyan、Rose、Golden、Purple、Emerald、Blue 循环使用不同 hover 底纹；顶部主题选择仍保留，但不会让所有卡片变成同一种底纹色。
- 本地验收：`node --check script.js` 通过；8093 首页与 `outputs/jack-zhou-resume.pdf` 均返回 200；浏览器实测 AI Coding 前三张作品卡 hover 底纹分别使用 Cyan、Rose、Golden，底纹、边框和扫光色一致；390px 移动端无横向溢出，导航左右边距正常，控制台无 error/warning。
- 当前静态资源版本参数更新为 `20260830-cardtone1`；本次仍为本地改动，尚未提交、推送或发布。

## 2026-08-30 联系入口图标化

- 将 Contact Terminal 中的 Mail、GitHub、Tel、WeChat、PDF 文字按钮改为对应的内联 SVG 应用图标 + 文字标签，增强识别度与视觉层级。
- 保留原有邮箱/电话/微信复制行为、GitHub 外链和 PDF 下载功能；图标使用本地内联 SVG，不引入外部依赖。
- 当前静态资源版本参数更新为 `20260830-contacticons1`；本次仍为本地改动，尚未提交、推送或发布。

## 2026-08-30 项目卡片移除“联系了解”

- 按用户要求移除 Project Matrix 项目卡片右下角的“联系了解”入口，避免重复 CTA 干扰项目事实阅读。
- 保留项目卡片、筛选、hover 底纹和其他导航/联系入口；同步清理对应样式与中英文映射。
- 当前仍为本地改动，尚未提交、推送或发布。

## 2026-08-30 AI Compute Core 首屏组件

- 在 Hero 左侧留白加入轻量 Canvas 3D 算力核心：粒子球、轨道、中心核心和状态标签，支持缓慢旋转、拖动视角、滚轮缩放与点击切换状态。
- 组件使用原生 Canvas 实现，不引入 Three.js 或外部 CDN；桌面端作为首屏视觉焦点，移动端改为流式居中布局，并保留 `prefers-reduced-motion` 降级。
- 当前静态资源版本参数更新为 `20260830-core1`；本次仍为本地改动，尚未提交、推送或发布。

## 2026-08-30 EdgeOne 国内公网部署

- 已通过腾讯云 EdgeOne Pages 直接上传静态站点资产，项目名为 `jack-zhou-resume-cn`。
- 国内公网地址：https://jack-zhou-resume-cn-eiw6qp1b.edgeone.cool/
- 已验证公网首页包含 AI Compute Core，PDF 路径返回 HTTP 200；GitHub Pages 地址继续保留作为备用入口。

## 2026-08-30 公网加载体验验收

- EdgeOne 公网桌面视口加载完成，Hero、AI Compute Core 和 PDF 入口均存在，控制台无 error/warning。
- 390×844 手机视口验证：`clientWidth=375`、`scrollWidth=375`，无横向溢出；Hero 与 3D 核心正常渲染。
- 静态资源体量保持克制（HTML/CSS/JS/头像/PDF 已上传）；背景视频为独立远程资源，不阻塞 HTML 首屏。后续如需进一步压缩首屏，可再做视频延迟加载或移动端静态背景策略。

## 2026-08-30 项目详情 Portal

- 将 Project Matrix 卡片底部原入口改为小箭头，点击后通过站内 Portal 反转进入项目详情，不刷新页面。
- 详情基于原始简历中的项目事实补充职责、技术链路、交付价值、指标和执行步骤；退出后返回原项目卡片。
- 详情页退出入口改为醒目的左箭头图标 + “返回项目”，避免与关闭弹窗混淆。
- 美团项目详情补充 LongCat 模型适配调优；中电科项目详情补充 DeepSeek-V4-Flash/Pro、GLM-5.1/5.2 的 SGLang 框架适配调优。
- 当前静态资源版本参数更新为 `20260830-detail3`；本地已完成交互验收，尚未重新发布 EdgeOne。

## 2026-08-30 入场动画后导航居中修复

- 修复用户反馈“导航页跑偏”：原因是入场后的通用组装动画 `labAssemble` 使用 `transform: translateY(...)`，覆盖了固定导航栏原本依赖的 `transform: translateX(-50%)` 居中定位。
- 为导航栏拆出专用 `navAssemble` 动画，始终保留 `translateX(-50%)`；同时在 `body.is-booting .nav` 隐藏态也保留水平居中。
- 本地验收：`node --check script.js` 通过；8093 首页与 PDF 均返回 200；桌面端入场结束后导航 `transform=translateX(-50%)`，按页面可用宽度居中且无横向溢出；390px 移动端导航左右各 10px、汉堡按钮可见、无横向溢出；控制台无 error/warning。
- 当前静态资源版本参数更新为 `20260830-boot2`；本次仍为本地改动，尚未提交、推送或发布。

## 2026-08-30 Digital Lab Boot 入场动效

- 根据用户要求“你做一个我看看”，将原有简单 glitch 欢迎层改为更适合当前简历站的 `Jack Zhou / Digital Lab Boot` 入场动画。
- 入场流程：深黑网格背景 → `JACK.ZHOU/LAB` boot 面板 → 三行终端日志写入 → 进度条加载 → 主题色扫描线 reveal → 首页导航、标题、描述、标签、CTA、右侧终端面板分层组装出现。
- 动效时长控制在约 1.5 秒内；不加入声音、不恢复 TTS、不做强制点击进入；系统 `prefers-reduced-motion` 开启时自动跳过入场。
- 本地验收：`node --check script.js` 通过；8093 首页与 PDF 均返回 200；浏览器实测加载 0.2s 时 boot overlay 可见且包含 `JACK.ZHOU/LAB`、三行 boot log、进度条和 `PROFILE ONLINE`；约 2s 后 overlay 隐藏、`body.is-booting` 移除、激活区块仍为 `hero`、`scrollY=0`；390px 移动端无横向溢出且 boot 面板宽度在屏幕内；控制台无 error/warning。
- 当前静态资源版本参数更新为 `20260830-boot1`；本次仍为本地改动，尚未提交、推送或发布。

## 2026-08-30 默认打开首页

- 根据用户要求“每次打开网页展示的应该是首页内容”，调整页面初始化逻辑：首次打开或刷新页面时不再读取 URL hash，统一激活 `#hero` 首页内容。
- 如果入口 URL 带有 `#workbench`、`#projects`、`#aicoding` 等 hash，页面会在注册 `hashchange` 监听前先清掉入口 hash，并保持在首页；用户在当前页面点击顶部导航时仍可正常切换到对应内容面板。
- 本地验收：`node --check script.js` 通过；8093 首页与 PDF 均返回 200；浏览器打开 `index.html?homecheck=20260830-home2#workbench` 后自动清为 `index.html?homecheck=20260830-home2`，激活区块为 `hero` 且 `scrollY=0`；随后点击顶部“实验台”导航仍能切换到 `#workbench`，控制台无 error/warning。
- 当前静态资源版本参数更新为 `20260830-home2`；本次仍为本地改动，尚未提交、推送或发布。

## 2026-08-30 卡片 hover 底色强度校准

- 根据用户补充截图，修正上一版“hover 底色变化偏弱”的问题：卡片 hover 现在不再只是透明光斑，而是整张卡片切换为明显的主题色深色渐变面，更接近参考站卡片从黑底变为蓝/主题色底的效果。
- 保留鼠标位置光斑、边框高亮和底部 rail 扫光，点击态进一步加强底色。
- 本地验收：8093 首页与 PDF 均返回 200；浏览器实测 Workbench 可见卡片 hover 后背景从灰黑 `linear-gradient(...)` 切换为主题色深渐变，`.is-card-hot=true`，边框变为主题色，底部 rail 仍为 `bottomRailSweep 1.85s`；控制台无 error/warning。
- 当前静态资源版本参数更新为 `20260830-cardbg2`；本次仍为本地改动，尚未提交、推送或发布。

## 2026-08-30 卡片 hover 底色动效增强

- 根据用户反馈“参考网站鼠标点到一些卡片时，卡片底色会有颜色变化”，将卡片 hover 底色从少数项目卡扩展到全部交互卡片，包括首屏数据卡、能力卡、AI Coding 作品卡、项目卡、经历卡、联系卡、终端/实验台面板等。
- 新增统一卡片底色变量 `--card-bg`、`--card-bg-hot`、`--card-bg-press`，hover 时使用当前强调色生成压暗填充和鼠标位置附近的柔和色斑，点击时短暂加强，跟随 Golden / Cyan / Purple / Emerald / Rose 主题切换。
- 保留此前卡片底部扫光 rail，并继续用较慢节奏展示，避免“太快看不清”。
- 本地验收：`node --check script.js` 通过；8093 首页与 `outputs/jack-zhou-resume.pdf` 均返回 200；浏览器实测 45 个交互卡片均挂载 `.card-rail`；AI Coding 工作卡 hover 后 `backgroundChanged=true`、`.is-card-hot=true`、底边动画仍为 `bottomRailSweep 1.85s`；390px 移动端无横向溢出；控制台无 error/warning。
- 当前静态资源版本参数更新为 `20260830-cardbg1`；本次仍为本地改动，尚未提交、推送或发布。

## 2026-08-30 作品卡链接样式调整

- 根据用户截图反馈，将 AI Coding 作品卡操作区从 `打开实验 →` 改为参考站式 `source / live` 图标链接。
- `source` 当前统一指向本项目 GitHub 源码仓库 `https://github.com/jackzhou1018/resume`；`live` 保持原有站内 Portal/作品预览交互。
- 已处理事件冒泡：点击 `source` 不会误触发作品 Portal；点击卡片其它位置或 `live` 仍进入作品详情。
- 本地验收：6 个可打开作品卡均显示 `source live`；可见 `打开实验` 数量为 0；点击首个 `live` 打开站内 Portal 并加载每日盯盘 iframe，关闭后仍停留在 AI Coding 面板；375px 移动端无横向溢出；控制台无 error/warning。
- 当前静态资源版本参数更新为 `20260830-linkfx1`。

## 2026-08-30 参考站交互继续补齐

- 根据用户 4 点反馈继续向参考站靠拢：首屏大标题增加打字/删除式动态光标，循环展示 `Jack Zhou`、AI 算力 FAE、GPU POC Solver、集群交付闭环等真实定位词。
- 顶部导航与首屏 CTA 改为“单区块显示”模式：点击后直接切换到对应内容面板并回到页面顶部，不再通过长页面滚动跳到中间位置。
- 卡片底部扫光动画从 `0.78s` 放慢到 `1.85s`，提高可见性；仍在鼠标 hover / 命中卡片时触发。
- 背景与面板底色进一步压暗：降低白色网格、背景视频、粒子和面板高光强度，整体从灰黑调整为更纯的高级黑。
- 本地验收：8093 首页与 PDF 均返回 200；标题打字采样显示已从 `Jack Zhou` 切到 `AI 算力 FAE`；点击 `AI Coding` 后仅显示 `#aicoding` 面板且 `scrollY=0`；主题菜单可展开；卡片底边扫光动画 `bottomRailSweep` 持续 `1.85s`；375px 移动端无横向溢出；控制台无 error/warning。
- 当前静态资源版本参数更新为 `20260830-viewfx1`。
- 说明：URL 后带 `#projects`、`#workbench` 这类 hash 时，浏览器会直接跳到对应区块；对外入口和最终发布链接不要带 hash，避免进入网页时停在中间位置。

## 2026-08-29 中英文切换

- 根据用户要求在顶部工具区新增 `EN / 中文` 语言切换按钮。
- 默认中文；切换英文后通过前端 i18n 字典替换页面可见文案，并将选择写入访问者本机 `localStorage`，刷新后保持语言选择。
- 导航中文模式恢复为：首页、能力、AI Coding、实验台、项目、经历、联系；英文模式切换为 Home、Systems、AI Coding、Workbench、Projects、Logs、Contact。
- 本地验收：`node --check script.js` 通过；首页与 `outputs/jack-zhou-resume.pdf` 均返回 200；桌面端完成“中文 → 英文 → 中文”切换；390px 移动端中英文均无横向溢出，语言按钮与汉堡菜单不重叠，英文菜单可打开。
- 当前静态资源版本参数更新为 `20260829-i18n1`。

## 2026-08-29 首屏姓名展示收敛

- 根据用户在浏览器截图中选中的首屏主标题区域，将 `h1#typeTarget` 从 `周猛 · Jack Zhou` 调整为仅显示 `Jack Zhou`，减少首屏视觉压迫。
- 右侧身份卡、联系区、PDF、页面标题和真实中文履历信息不受影响；中英文切换继续可用。
- 当前静态资源版本参数更新为 `20260829-name1`。

## 2026-08-29 参考站主题选择与卡片底边动效补齐

- 根据用户进一步反馈，将顶部调色盘从“单击循环切色”改为参考站式 `SELECT THEME` 浮层，可直接选择 Golden、Cyan、Purple、Emerald、Rose。
- 默认强调色调整为 Rose，并重新平衡页面背景光斑和强调色比例，让整体更接近参考站的黑底 + 少量高对比状态色，而不是大面积金色。
- 为工作卡、项目卡、能力卡、终端面板等交互模块追加底部扫光 rail，鼠标移入或命中卡片时底部亮条从左向右扫过，补齐参考站卡片底边动效。
- 本地验收：主题菜单可展开并显示 5 个主题；点击 Rose 后 `data-accent=rose` 且菜单关闭；45 个交互卡片均挂载 `.card-rail`；鼠标命中工作卡后 `.is-card-hot=true` 且底边动画为 `bottomRailSweep`；375px 移动端无横向溢出，主题菜单在屏幕内；控制台无 error/warning。
- 当前静态资源版本参数更新为 `20260829-refx1`。

## 2026-08-29 字体与字号收敛

- 根据用户反馈“字体不喜欢、字号扎眼”，将字体体系从通用 Inter/System 改为更有识别度的系统字体栈：标题优先 `Avenir Next Condensed / Avenir Next`，中文兜底 `Hiragino Sans GB / PingFang SC`；正文优先 `SF Pro Rounded / Avenir Next`；技术标签继续使用 `SF Mono / Menlo`。
- 收敛首屏姓名、区块标题、卡片标题、项目编号背景字号，降低超粗字重和过紧负字距，使页面更像专业 digital lab，而不是强刺激海报；二次校准后首屏姓名最高 88px、区块标题最高 50px、卡片标题最高 23px。
- 当前静态资源版本参数更新为 `20260829-type2`。

## 2026-08-29 原始 PDF 简历内容回填

- 用户明确要求：以 `/Users/jack/Downloads/周猛--个人简历.pdf` 原始简历为内容源，按参考 v0 EinCode Digital Lab 页面结构重构，而不是只使用上一版网页摘要。
- 已抽取原始 PDF 文本并渲染页面核对；PDF 共 5 页，站内 `outputs/jack-zhou-resume.pdf` 与原始 PDF 文件大小一致。
- 首页补入 PDF 基础信息与证件照：男、32、北京、FAE、35-45K、社招。
- Profile 补入 PDF 的四条核心优势：AI 算力全栈技术闭环、多行业头部客户实战沉淀、售前到量产全流程交付、标准化与长期价值沉淀。
- Project Matrix 在保留网页已有项目和 AI Coding 作品的基础上，补齐原始 PDF 中的东土科技工业机器人、雅江集团建研院国产图形工作站、公司大型展会产品支持。
- Career Logs 补充摩尔线程阶段更完整职责，并加入教育经历：辽宁地质工程职业学院，金属矿产地质与勘查技术，大专。
- TTS/语音功能继续按用户要求移除；当前页面无 TTS 可见入口或触发逻辑。

## 2026-08-29 参考站可见交互补齐

- 根据用户截图反馈，补齐参考站顶部工具区的等价交互：调色盘按钮用于切换强调色，月亮按钮用于切换明暗模式。
- 新增桌面端鼠标交互特效：鼠标跟随光晕、拖尾粒子、卡片/模块 hover 跟随高亮；触屏设备与减少动态偏好下自动关闭，避免影响移动端阅读。
- 主题与强调色写入访问者本机 `localStorage`，不涉及后端和外部数据传输。
- 为避免本地预览缓存导致看不到新交互，`index.html` 已给 `style.css` 与 `script.js` 加版本参数；当前版本参数为 `20260829-fx6`，同时为受限浏览器增加 `localStorage` 读写兜底。
- 鼠标特效启用条件从“必须识别为 fine pointer”调整为“非触屏且未开启减少动态”，避免桌面 WebView 误判后不显示。
- 窄屏顶部栏增加兜底：小屏隐藏 `/LAB` 后缀并缩小工具按钮，保证调色盘、明暗切换和汉堡菜单不互相挤压。
- 根据用户继续反馈补齐项目卡交互动效：AI Coding 作品卡、Project Matrix 项目卡、Systems、Workbench 等模块增加边框边缘扫光、hover 高亮、鼠标跟随面光斑与点击脉冲，不再只是底部静态线条。
- 针对浏览器 WebView 对 `:hover` / `pointerenter` 触发不稳定的问题，增加基于 `elementFromPoint()` 的全局指针命中检测，按鼠标实际坐标主动触发边框高亮。
- TTS/语音仍按用户要求保持移除状态。

## 2026-08-29 EinCode Digital Lab 结构级重做

- 用户明确纠正：不要只换色或追加 CSS 覆盖层，要按参考站的结构、排版与可见功能重新组织整站。
- 参考 `https://v0.app/templates/eincode-digital-lab-NjOUgG6VT7X` 的可见说明与页面资产线索：个人数字实验室、项目筛选、技术文章/实验记录、Workbench、GitHub/外链入口、状态标签与 CTA。
- 重建 `index.html` 主结构：首屏改为 Hero + 右侧终端工作台；新增 Systems 能力模块、Experiments 作品筛选、Workbench 标签面板、Project Matrix 项目筛选、Career Logs、Contact Terminal。
- 按用户追加要求移除 TTS/语音：不再展示齿轮、声音设置、语音按钮、数字人讲解、OpenAI TTS 入口；`script.js` 已删除语音识别、浏览器 TTS、OpenAI TTS 和 3D 数字人初始化逻辑。
- 保留真实简历事实、PDF 下载、移动端导航、作品 Portal 与现有作品详情；当前只做本地实现与验收，未提交、未 push、未发布。
- 本地验收：`node --check script.js` 通过；`outputs/jack-zhou-resume.pdf` 站内请求 200；CDP 强制桌面 1365×900 与手机 390×844 验证无横向溢出、移动菜单可打开、TTS 关键字/DOM 检测为 false。

## 2026-08-29 EinCode Digital Lab 风格本地改版

- 参考 `https://v0.app/templates/eincode-digital-lab-NjOUgG6VT7X` 的高层视觉语言，未复制其品牌、文案、Logo 或素材。
- 将页面从星云霓虹风改为黑色/炭黑数字实验室风：细网格背景、模块化细线面板、大号硬朗标题、少量橙色状态与按钮强调。
- 保留现有真实履历内容、项目内容、AI Coding 作品、PDF 下载入口和移动端菜单；TTS/语音入口已在后续结构级重做中按用户要求移除，以上方最新状态为准。
- 本地验证：桌面首屏、390px 手机首屏、移动端菜单打开、PDF 链接均通过；当前仅本地改版，未提交、未 push、未发布。

## 2026-08-28 首页体验优化

- 将首页可见的「声音设置」文字按钮改为低干扰齿轮入口，保留 TTS 手动调节能力，暂不改声线参数。
- 新增移动端汉堡导航，解决小屏幕下导航链接被隐藏且无入口的问题。
- 新增「下载 PDF 简历」首页 CTA，并将真实简历复制到 `outputs/jack-zhou-resume.pdf` 作为站内资源。
- 背景视频增加 `preload="metadata"` 和静态深色 fallback；本机暂未检测到 `ffmpeg`，未直接压缩 `bg.mp4`。

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
# 2026-08-30：原始 PDF 可编辑 Word 转换

- 输入：`/Users/jack/Downloads/周猛--个人简历.pdf`
- 输出：`outputs/周猛--个人简历-可编辑.docx`
- 处理：将 PDF 中的个人信息、求职意向、核心优势、工作经历、项目经历及教育经历重建为可编辑段落与项目小节，保留 Longcat、DeepSeek、GLM、Qwen 等模型适配内容。
- 验收：已用文档渲染器导出 3 页 PNG 做结构检查；当前渲染环境缺少中文字体，预览图中的中文显示为空框，但 DOCX 内文字已正常写入，使用本机 Word/WPS 打开可编辑。
- 发布状态：仅生成本地 Word 文件，未上传、未发布。
# 2026-08-30：联系区 Share 分享入口

- 在 Contact Terminal 末尾增加 `Share` 按钮，优先调用浏览器原生分享；不支持时复制当前简历网站链接。
- 样式沿用现有按钮、橙色强调和内联 SVG 图标，不引入第三方依赖。
- 当前为本地改动，尚未提交或发布。
