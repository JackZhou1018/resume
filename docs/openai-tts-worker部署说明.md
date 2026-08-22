# OpenAI TTS 真人声代理部署说明

## 为什么需要代理

个人简历网站部署在 GitHub Pages，属于纯前端静态网页。OpenAI API Key 不能写进 `script.js` 或任何前端文件，否则访问者可以直接看到并盗用。

正确结构：

```text
简历网页 -> 你的 TTS 代理 Worker -> OpenAI /v1/audio/speech
```

## Cloudflare Worker 部署

1. 新建 Cloudflare Worker。
2. 把 `server/openai-tts-worker.js` 的内容复制进去。
3. 在 Worker 环境变量中添加：

```text
OPENAI_API_KEY=你的 OpenAI API Key
```

注意：这个变量必须设置为 secret，不要写进代码仓库。

4. 部署后拿到 Worker URL，例如：

```text
https://jack-resume-tts.xxx.workers.dev
```

5. 打开简历网站首页，点击「声音设置」。
6. 把 Worker URL 填到「OpenAI TTS 代理地址」。
7. 选择声线，例如 `coral`、`nova`、`shimmer`。
8. 点「试听」，满意后点「保存」。

## 当前前端行为

- 配置了代理地址：优先播放 OpenAI TTS 音频。
- 代理失败或未配置：自动回退浏览器 TTS。
- 保存结果写入访问者本机浏览器 `localStorage`，不上传任何个人设置。

## 默认 OpenAI 参数

- model: `gpt-4o-mini-tts`
- voice: `coral`
- response_format: `mp3`
- instructions: 年轻、亲切、自然中文女声，避免夹子音和播音腔。
