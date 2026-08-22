/* ============================================================
   硬核科技风个人主页 · 脚本
   背景：逼真黑洞（引力透镜 + 光子环 + 吸积盘）+ 3D 星空 + 星系
   交互：打字机 / 环形进度 / 3D倾斜 / 复制反馈 / 导航模糊 / 故障转场
   ============================================================ */

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
const PI2 = Math.PI * 2;
let W, H;
function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
resize();
addEventListener('resize', resize);

/* ============================================================
   逼真黑洞（《星际穿越》卡冈图雅风格）
   视觉层次：体积光晕 → 吸积盘（倾斜+多普勒亮度差）→ 事件视界
   → 光子环 → 引力透镜上下光弧
   ============================================================ */
function drawBlackHole(t) {
  const cx = W / 2, cy = H / 2;
  const R = Math.min(W, H) * 0.19;          // 事件视界半径
  const tilt = -0.16;                        // 吸积盘倾斜角
  const pulse = 0.9 + 0.1 * Math.sin(t * 0.0012);

  // 1) 体积光晕：暖橙，从内核向外衰减（模拟吸积盘辐射的光）
  let bloom = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 3.4);
  bloom.addColorStop(0.00, `rgba(255,190,110,${0.6 * pulse})`);
  bloom.addColorStop(0.25, `rgba(255,130,60,${0.28 * pulse})`);
  bloom.addColorStop(0.55, `rgba(140,50,20,${0.10 * pulse})`);
  bloom.addColorStop(1.00, 'rgba(0,0,0,0)');
  ctx.fillStyle = bloom;
  ctx.beginPath(); ctx.arc(cx, cy, R * 3.4, 0, PI2); ctx.fill();

  // 2) 吸积盘：倾斜椭圆环，左右亮度不对称（多普勒束效应，接近侧更亮）
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(tilt);
  const rx = R * 2.05, ry = R * 0.74;
  let disk = ctx.createLinearGradient(-rx, 0, rx, 0);
  disk.addColorStop(0.00, 'rgba(255,235,190,0.95)');  // 左：接近侧，白热
  disk.addColorStop(0.35, 'rgba(255,175,90,0.80)');
  disk.addColorStop(0.65, 'rgba(200,90,40,0.55)');
  disk.addColorStop(1.00, 'rgba(120,45,20,0.30)');     // 右：远离侧，暗红
  ctx.strokeStyle = disk;
  ctx.lineWidth = R * 0.55;
  ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, PI2); ctx.stroke();

  // 3) 盘内缘：一圈白热细环（高温气体）
  ctx.strokeStyle = 'rgba(255,250,235,0.95)';
  ctx.lineWidth = R * 0.10;
  ctx.beginPath(); ctx.ellipse(0, 0, rx * 0.70, ry * 0.70, 0, 0, PI2); ctx.stroke();
  ctx.restore();

  // 4) 事件视界：纯黑球体
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, PI2);
  ctx.fillStyle = '#000';
  ctx.fill();

  // 5) 光子环：事件视界外一圈极细极亮的光（引力透镜标志）
  ctx.strokeStyle = `rgba(255,255,255,${0.95 * pulse})`;
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, R * 1.05, 0, PI2); ctx.stroke();

  // 6) 引力透镜光弧：盘背面的光被弯曲，在黑洞上下形成两道竖弧
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = `rgba(255,225,170,${0.85 * pulse})`;
  ctx.lineWidth = 2.5;
  const arx = R * 1.34, ary = R * 0.62;
  // 上弧：椭圆顶部一段
  ctx.beginPath();
  ctx.ellipse(0, 0, arx, ary, 0, Math.PI, PI2);
  ctx.stroke();
  // 下弧：椭圆底部一段
  ctx.beginPath();
  ctx.ellipse(0, 0, arx, ary, 0, 0, Math.PI);
  ctx.stroke();
  ctx.restore();
}

/* ============================================================
   真实感恒星：预渲染发光星斑（柔光晕 + 十字衍射星芒）
   ============================================================ */
// 生成一颗带光晕（可选十字星芒）的恒星精灵
function makeStarSprite(color, spike = false) {
  const S = 64;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  const r = S / 2;

  // 柔光晕
  let halo = g.createRadialGradient(r, r, 0, r, r, r);
  halo.addColorStop(0.0, 'rgba(255,255,255,1)');
  halo.addColorStop(0.22, color);
  halo.addColorStop(0.6, hexToRgba(color, 0.25));
  halo.addColorStop(1.0, 'rgba(0,0,0,0)');
  g.fillStyle = halo;
  g.fillRect(0, 0, S, S);

  // 十字衍射星芒（亮星特有）
  if (spike) {
    g.strokeStyle = 'rgba(255,255,255,0.55)';
    g.lineWidth = 1.2;
    const L = r * 0.9;
    g.beginPath(); g.moveTo(r - L, r); g.lineTo(r + L, r); g.stroke();      // 横
    g.beginPath(); g.moveTo(r, r - L); g.lineTo(r, r + L); g.stroke();      // 竖
  }
  return c;
}
function hexToRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`;
}

// 恒星光谱：白 / 淡黄 / 蓝白 / 青 / 橙红，比例接近真实
const STAR_TYPES = [
  ['#ffffff', 0.60],   // 白
  ['#ffe9c4', 0.15],   // 淡黄（类太阳）
  ['#cfe0ff', 0.12],   // 蓝白（高温）
  ['#aef7ff', 0.08],   // 青
  ['#ffc98f', 0.04],   // 橙（冷巨星）
  ['#ff9d9d', 0.01]    // 红（超巨星）
];
const sprites = {};
STAR_TYPES.forEach(([color]) => {
  sprites[color + ':n'] = makeStarSprite(color, false);
  sprites[color + ':s'] = makeStarSprite(color, true);   // 带星芒
});

const N = Math.min(700, Math.floor(innerWidth * innerHeight / 2000));
const stars = [];
for (let i = 0; i < N; i++) {
  const r = 260 + Math.random() * 740;
  const theta = Math.random() * PI2;
  const phi = Math.acos(2 * Math.random() - 1);
  // 按概率选颜色
  let rnd = Math.random(), color = '#ffffff';
  for (const [c, p] of STAR_TYPES) { rnd -= p; if (rnd <= 0) { color = c; break; } }
  const bright = Math.random() < 0.10;   // 10% 亮星（大、带星芒）
  stars.push({
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.sin(phi) * Math.sin(theta),
    z: r * Math.cos(phi),
    color,
    bright,
    size: bright ? 0.9 + Math.random() * 1.1 : 0.4 + Math.random() * 0.7,
    tw: Math.random() * PI2,
    ts: 0.4 + Math.random() * 1.8,
    base: 0.5 + Math.random() * 0.5
  });
}

/* ---------- 远处星系 ---------- */
const galaxies = [];
function initGalaxies() {
  galaxies.length = 0;
  const seeds = [
    [0.12, 0.20, 0.10, '#78b4ff'], [0.88, 0.26, 0.12, '#c882ff'],
    [0.80, 0.74, 0.08, '#8cdcff'], [0.20, 0.80, 0.11, '#ff96be']
  ];
  for (const [fx, fy, fr, color] of seeds) {
    galaxies.push({ x: W * fx, y: H * fy, r: Math.min(W, H) * fr, color });
  }
}
initGalaxies();
addEventListener('resize', initGalaxies);

function drawGalaxies() {
  for (const g of galaxies) {
    const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
    grad.addColorStop(0, hexToRgba(g.color, 0.16));
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(g.x, g.y, g.r, g.r * 0.5, -0.4, 0, PI2);
    ctx.fill();
  }
}

/* ---------- 3D 星空渲染 ---------- */
let rotY = 0, rotX = -0.12;
const mouse = { x: 0, y: 0 };
const FOV = 700;
addEventListener('mousemove', e => {
  mouse.x = e.clientX / W - 0.5;
  mouse.y = e.clientY / H - 0.5;
});

function frame(t) {
  rotX += (-mouse.y * 0.5 - rotX) * 0.04;
  rotY += 0.0012 + mouse.x * 0.0006;

  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const cx = W / 2, cy = H / 2;

  ctx.clearRect(0, 0, W, H);
  // 若使用视频背景，只画星空（透明画布，视频从下方透出）；黑洞/星系已由视频替代
  // drawBlackHole(t);   // 已由 bg.mp4 视频背景替代
  // drawGalaxies();     // 已由 bg.mp4 视频背景替代

  // 最前层：3D 星空（透视投影，星星掠过黑洞前方）
  for (const s of stars) {
    let x = s.x * cosY + s.z * sinY;
    let z = -s.x * sinY + s.z * cosY;
    let y = s.y;
    const y2 = y * cosX - z * sinX;
    const z2 = y * sinX + z * cosX;
    y = y2; z = z2;

    if (z < -FOV + 60) continue;
    const scale = FOV / (FOV + z);
    const sx = cx + x * scale;
    const sy = cy + y * scale;
    if (sx < -40 || sx > W + 40 || sy < -40 || sy > H + 40) continue;

    const depth = Math.max(0.12, 1 - z / 1000);
    const twinkle = s.base * (0.7 + 0.3 * Math.sin(s.tw + t * 0.001 * s.ts));
    const alpha = Math.max(0.05, twinkle * depth);
    const sprite = sprites[s.color + (s.bright ? ':s' : ':n')];
    // 近大远小：显示尺寸随深度缩放
    const drawSize = s.size * depth * 14;

    ctx.globalAlpha = alpha;
    ctx.drawImage(sprite, sx - drawSize / 2, sy - drawSize / 2, drawSize, drawSize);
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/* ---------- 打字机姓名 ---------- */
const nameText = '周猛 · Jack Zhou';
const typeEl = document.getElementById('typeTarget');
let idx = 0;
function typeName() {
  if (idx <= nameText.length) {
    typeEl.innerHTML = nameText.slice(0, idx) + (idx < nameText.length ? '<span class="typing-caret">▊</span>' : '');
    idx++;
    setTimeout(typeName, 120);
  }
}
setTimeout(typeName, 1500);

/* ---------- 环形技能进度条 ---------- */
const RING_C = 327;
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const ring = entry.target;
      const value = parseInt(ring.dataset.value, 10);
      ring.querySelector('.progress').style.strokeDashoffset = RING_C * (1 - value / 100);
      skillObserver.unobserve(ring);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.skill-ring').forEach(ring => skillObserver.observe(ring));

/* ---------- 项目卡片 3D 倾斜 ---------- */
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${px * 12}deg) rotateX(${-py * 12}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = 'rotateY(0) rotateX(0)'; });
});

/* ---------- 作品卡片：翻转坠入详情 ---------- */
const workReader = document.getElementById('workReader');
const readerClose = document.getElementById('readerClose');
const readerTitle = document.getElementById('readerTitle');
const externalWorkContent = document.getElementById('externalWorkContent');
const externalWorkFrame = document.getElementById('externalWorkFrame');
const externalWorkTitle = document.getElementById('externalWorkTitle');
const externalWorkDesc = document.getElementById('externalWorkDesc');
const externalWorkLink = document.getElementById('externalWorkLink');
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
  externalWorkContent?.classList.toggle('is-active', Boolean(externalUrl));

  if (externalUrl) {
    if (externalWorkTitle) externalWorkTitle.textContent = cardTitle || manualTitles[manual] || '作品预览';
    if (externalWorkDesc) externalWorkDesc.textContent = cardDesc || '原作品页面会在这里直接打开；如果浏览器限制嵌入，可使用备用入口新窗口查看。';
    if (externalWorkLink) externalWorkLink.href = externalUrl;
    if (externalWorkFrame && externalWorkFrame.src !== externalUrl) externalWorkFrame.src = externalUrl;
  } else if (externalWorkFrame) {
    externalWorkFrame.removeAttribute('src');
  }

  if (readerTitle) readerTitle.textContent = manualTitles[manual] || '作品详情';
  workReader.hidden = false;
  workReader.setAttribute('aria-hidden', 'false');
  workReader.classList.remove('is-closing');
  workReader.classList.toggle('has-frame', Boolean(externalUrl));
  document.body.classList.add('reader-open');

  requestAnimationFrame(() => {
    workReader.classList.add('is-open');
    readerClose?.focus({ preventScroll: true });
  });
}

function closeManual() {
  if (!workReader || workReader.hidden) return;
  workReader.classList.add('is-closing');
  workReader.classList.remove('is-open');

  if (activeManualCard) {
    activeManualCard.classList.remove('is-diving');
    activeManualCard.classList.add('is-returning');
  }

  readerCloseTimer = setTimeout(() => {
    workReader.hidden = true;
    workReader.setAttribute('aria-hidden', 'true');
    workReader.classList.remove('is-closing');
    workReader.classList.remove('has-frame');
    document.body.classList.remove('reader-open');
    document.querySelectorAll('[data-manual-content]').forEach(content => content.classList.remove('is-active'));
    externalWorkContent?.classList.remove('is-active');
    if (externalWorkFrame) externalWorkFrame.removeAttribute('src');
    if (activeManualCard) {
      activeManualCard.focus({ preventScroll: true });
      activeManualCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => activeManualCard?.classList.remove('is-returning'), 520);
    }
  }, 430);
}

portalCards.forEach(card => {
  card.addEventListener('click', event => {
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

/* ---------- 首页 3D 数字人语音交互 ---------- */
const digitalHuman = document.getElementById('digitalHuman');
const digitalHumanCanvas = document.getElementById('digitalHumanCanvas');
const voiceStatus = document.getElementById('voiceStatus');
const voiceTranscript = document.getElementById('voiceTranscript');
const voiceSettingsToggle = document.getElementById('voiceSettingsToggle');
const voiceSettings = document.getElementById('voiceSettings');
const openaiTtsEndpoint = document.getElementById('openaiTtsEndpoint');
const openaiVoiceSelect = document.getElementById('openaiVoiceSelect');
const voiceSelect = document.getElementById('voiceSelect');
const voiceRate = document.getElementById('voiceRate');
const voicePitch = document.getElementById('voicePitch');
const voiceRateValue = document.getElementById('voiceRateValue');
const voicePitchValue = document.getElementById('voicePitchValue');
const voiceTest = document.getElementById('voiceTest');
const voiceSave = document.getElementById('voiceSave');
const voiceReset = document.getElementById('voiceReset');
let avatarSpeaking = false;
let avatarListening = false;
let preferredSweetVoice = null;
const VOICE_SETTINGS_KEY = 'jackResumeVoiceSettings';
const DEFAULT_VOICE_SETTINGS = {
  provider: 'openai',
  openaiEndpoint: '',
  openaiVoice: 'coral',
  voiceURI: '',
  rate: 0.96,
  pitch: 1.0,
  volume: 1.0
};
let currentVoiceSettings = { ...DEFAULT_VOICE_SETTINGS };

function loadVoiceSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(VOICE_SETTINGS_KEY) || 'null');
    currentVoiceSettings = {
      ...DEFAULT_VOICE_SETTINGS,
      ...(saved || {})
    };
  } catch (e) {
    currentVoiceSettings = { ...DEFAULT_VOICE_SETTINGS };
  }
}

function saveVoiceSettings() {
  localStorage.setItem(VOICE_SETTINGS_KEY, JSON.stringify(currentVoiceSettings));
}

function getAvailableVoices() {
  return window.speechSynthesis?.getVoices?.() || [];
}

function pickSweetChineseVoice() {
  const voices = getAvailableVoices();
  if (!voices.length) return null;
  if (currentVoiceSettings.voiceURI) {
    const savedVoice = voices.find(voice => voice.voiceURI === currentVoiceSettings.voiceURI);
    if (savedVoice) return savedVoice;
  }
  const sweetVoicePatterns = [
    /tingting/i,
    /meijia/i,
    /sinji/i,
    /mei-jia/i,
    /xiaoxiao/i,
    /xiaoyi/i,
    /xiaomo/i,
    /xiaorui/i,
    /google.*中文/i,
    /google.*普通话/i,
    /mandarin.*female/i,
    /chinese.*female/i,
    /zh.*female/i,
    /女声|女生|女性|甜|晓晓|晓伊|婷婷|美佳/i
  ];
  const zhVoices = voices.filter(voice => /zh|cmn|chinese|mandarin|中文|普通话|國語/i.test(`${voice.lang} ${voice.name}`));
  return sweetVoicePatterns
    .map(pattern => zhVoices.find(voice => pattern.test(`${voice.name} ${voice.lang}`)))
    .find(Boolean) || zhVoices[0] || voices.find(voice => /female|woman|samantha|karen|ting/i.test(voice.name)) || null;
}

function refreshSweetVoice() {
  preferredSweetVoice = pickSweetChineseVoice();
}

function syncVoiceControls() {
  if (openaiTtsEndpoint) openaiTtsEndpoint.value = currentVoiceSettings.openaiEndpoint || '';
  if (openaiVoiceSelect) openaiVoiceSelect.value = currentVoiceSettings.openaiVoice || DEFAULT_VOICE_SETTINGS.openaiVoice;
  if (voiceRate) voiceRate.value = currentVoiceSettings.rate;
  if (voicePitch) voicePitch.value = currentVoiceSettings.pitch;
  if (voiceRateValue) voiceRateValue.textContent = Number(currentVoiceSettings.rate).toFixed(2);
  if (voicePitchValue) voicePitchValue.textContent = Number(currentVoiceSettings.pitch).toFixed(2);
}

function populateVoiceSelect() {
  if (!voiceSelect) return;
  const voices = getAvailableVoices();
  const previousValue = voiceSelect.value || currentVoiceSettings.voiceURI;
  voiceSelect.innerHTML = '';

  const autoOption = document.createElement('option');
  autoOption.value = '';
  autoOption.textContent = '自动选择中文声线';
  voiceSelect.appendChild(autoOption);

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.voiceURI;
    option.textContent = `${voice.name} · ${voice.lang}${voice.default ? ' · 默认' : ''}`;
    voiceSelect.appendChild(option);
  });

  voiceSelect.value = voices.some(voice => voice.voiceURI === previousValue) ? previousValue : '';
}

function refreshVoiceSettingsUI() {
  populateVoiceSelect();
  syncVoiceControls();
  refreshSweetVoice();
}

loadVoiceSettings();

if (window.speechSynthesis) {
  refreshSweetVoice();
  window.speechSynthesis.addEventListener?.('voiceschanged', refreshVoiceSettingsUI);
}

function setVoiceUI(status, text) {
  if (voiceStatus) voiceStatus.textContent = status;
  if (voiceTranscript) voiceTranscript.textContent = text;
}

let openaiAudioUrl = null;
let openaiAudio = null;

function finishAvatarSpeech() {
  avatarSpeaking = false;
  digitalHuman?.classList.remove('is-listening');
  setVoiceUI('点击唤醒', '可问：项目、经历、AI Coding、联系方式');
}

function speakByBrowserTTS(text, status = '浏览器备用声线') {
  setVoiceUI(status, text);
  avatarSpeaking = true;
  digitalHuman?.classList.add('is-listening');
  try {
    window.speechSynthesis.cancel();
    refreshSweetVoice();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = Number(currentVoiceSettings.rate) || DEFAULT_VOICE_SETTINGS.rate;
    utterance.pitch = Number(currentVoiceSettings.pitch) || DEFAULT_VOICE_SETTINGS.pitch;
    utterance.volume = Number(currentVoiceSettings.volume) || DEFAULT_VOICE_SETTINGS.volume;
    if (preferredSweetVoice) utterance.voice = preferredSweetVoice;
    utterance.onend = finishAvatarSpeech;
    utterance.onerror = () => {
      finishAvatarSpeech();
    };
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    finishAvatarSpeech();
  }
}

async function speakByOpenAITTS(text) {
  const endpoint = (currentVoiceSettings.openaiEndpoint || '').trim();
  if (!endpoint) return false;

  setVoiceUI('OpenAI 真人声生成中', text);
  avatarSpeaking = true;
  digitalHuman?.classList.add('is-listening');

  if (openaiAudio) {
    openaiAudio.pause();
    openaiAudio = null;
  }
  if (openaiAudioUrl) {
    URL.revokeObjectURL(openaiAudioUrl);
    openaiAudioUrl = null;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      voice: currentVoiceSettings.openaiVoice || DEFAULT_VOICE_SETTINGS.openaiVoice,
      instructions: '用年轻、亲切、自然的中文女声说话，声音干净甜美但不要夹，不要播音腔，语气像简历网站里的 AI 助手，轻快、有礼貌、不要夸张。'
    })
  });
  if (!response.ok) throw new Error(`OpenAI TTS proxy failed: ${response.status}`);

  const audioBlob = await response.blob();
  if (!audioBlob.type.startsWith('audio/')) throw new Error('OpenAI TTS proxy did not return audio');

  openaiAudioUrl = URL.createObjectURL(audioBlob);
  openaiAudio = new Audio(openaiAudioUrl);
  openaiAudio.onended = finishAvatarSpeech;
  openaiAudio.onerror = finishAvatarSpeech;
  setVoiceUI('OpenAI 真人声播放中', text);
  await openaiAudio.play();
  return true;
}

async function speakByAvatar(text) {
  try {
    if (await speakByOpenAITTS(text)) return;
  } catch (e) {
    setVoiceUI('OpenAI TTS 不可用', '已自动切回浏览器备用声线。请检查代理地址或后端 API Key。');
  }
  speakByBrowserTTS(text);
}

voiceSettingsToggle?.addEventListener('click', event => {
  event.stopPropagation();
  if (!voiceSettings) return;
  const willOpen = voiceSettings.hidden;
  voiceSettings.hidden = !willOpen;
  voiceSettingsToggle.classList.toggle('is-active', willOpen);
  if (willOpen) refreshVoiceSettingsUI();
});

openaiTtsEndpoint?.addEventListener('input', () => {
  currentVoiceSettings.openaiEndpoint = openaiTtsEndpoint.value.trim();
});

openaiVoiceSelect?.addEventListener('change', () => {
  currentVoiceSettings.openaiVoice = openaiVoiceSelect.value;
});

voiceSelect?.addEventListener('change', () => {
  currentVoiceSettings.voiceURI = voiceSelect.value;
  refreshSweetVoice();
});

voiceRate?.addEventListener('input', () => {
  currentVoiceSettings.rate = Number(voiceRate.value);
  syncVoiceControls();
});

voicePitch?.addEventListener('input', () => {
  currentVoiceSettings.pitch = Number(voicePitch.value);
  syncVoiceControls();
});

voiceTest?.addEventListener('click', () => {
  speakByAvatar('你好呀，我是 Jack 的简历助手。这个声音如果舒服，就点保存。');
});

voiceSave?.addEventListener('click', () => {
  currentVoiceSettings.openaiEndpoint = openaiTtsEndpoint?.value.trim() || '';
  currentVoiceSettings.openaiVoice = openaiVoiceSelect?.value || DEFAULT_VOICE_SETTINGS.openaiVoice;
  saveVoiceSettings();
  setVoiceUI('声音已保存', currentVoiceSettings.openaiEndpoint ? '已优先使用 OpenAI 真人声；失败时自动切回浏览器声线。' : '未配置 OpenAI 代理，将继续使用浏览器备用声线。');
});

voiceReset?.addEventListener('click', () => {
  currentVoiceSettings = { ...DEFAULT_VOICE_SETTINGS };
  localStorage.removeItem(VOICE_SETTINGS_KEY);
  refreshVoiceSettingsUI();
  setVoiceUI('声音已重置', '已恢复自然声线参数，可以重新试听。');
});

document.addEventListener('click', event => {
  if (!voiceSettings || voiceSettings.hidden) return;
  if (voiceSettings.contains(event.target) || voiceSettingsToggle?.contains(event.target)) return;
  voiceSettings.hidden = true;
  voiceSettingsToggle?.classList.remove('is-active');
});

refreshVoiceSettingsUI();

function answerResumeQuestion(rawText) {
  const text = rawText.toLowerCase();
  if (/项目|作品|案例|战绩|project/.test(text)) {
    location.hash = '#projects';
    return '好呀，我带你看项目。这里能看到 GPU 交付、国产化适配、客户 POC，还有 AI Coding 作品。';
  }
  if (/ai|coding|编程|代码|工具|自动化/.test(text)) {
    location.hash = '#aicoding';
    return '来啦，这里是 AI Coding 作品集。重点是把现场经验变成可复用的小工具和交付页面。';
  }
  if (/经历|经验|工作|公司|背景/.test(text)) {
    location.hash = '#experience';
    return 'Jack 有近十年服务器和 AI 算力服务经验，做过联想、同方、摩尔线程相关项目，偏现场攻坚型。';
  }
  if (/联系|电话|微信|邮箱|contact/.test(text)) {
    location.hash = '#contact';
    return '好的，联系区在这里。电话、邮箱、微信都可以复制，微信号就是手机号。';
  }
  if (/能力|技能|会什么|擅长/.test(text)) {
    location.hash = '#skills';
    return '核心能力是 GPU POC、集群交付、硬件测试、模型适配、RoCE 网络和故障闭环。';
  }
  return '你好呀，我是 Jack 的 3D 简历助手。你可以问我项目、经历、AI Coding、能力或者联系方式。';
}

function initVoiceAssistant() {
  if (!digitalHuman) return;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      avatarListening = true;
      digitalHuman.classList.add('is-listening');
      setVoiceUI('正在听你说', '请说：项目 / 经历 / AI Coding / 联系方式');
    };
    recognition.onresult = event => {
      let interim = '';
      let finalText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const part = event.results[i][0]?.transcript || '';
        if (event.results[i].isFinal) finalText += part;
        else interim += part;
      }
      setVoiceUI('语音识别中', finalText || interim || '继续说，我在听');
      if (finalText) speakByAvatar(answerResumeQuestion(finalText));
    };
    recognition.onerror = event => {
      avatarListening = false;
      digitalHuman.classList.remove('is-listening');
      const tip = event.error === 'not-allowed' ? '浏览器没有麦克风权限，可允许后再点我。' : '语音识别中断，点我可以重试。';
      setVoiceUI('语音未启动', tip);
    };
    recognition.onend = () => {
      avatarListening = false;
      if (!avatarSpeaking) {
        digitalHuman.classList.remove('is-listening');
        setVoiceUI('点击唤醒', '可问：项目、经历、AI Coding、联系方式');
      }
    };
  }

  digitalHuman.addEventListener('click', () => {
    if (window.speechSynthesis?.speaking) {
      window.speechSynthesis.cancel();
      avatarSpeaking = false;
      digitalHuman.classList.remove('is-listening');
      setVoiceUI('点击唤醒', '可问：项目、经历、AI Coding、联系方式');
      return;
    }
    if (!recognition) {
      speakByAvatar('当前浏览器不支持语音识别，不过我可以先做语音介绍。你可以看看项目、经历、AI Coding 和联系方式。');
      return;
    }
    try {
      if (avatarListening) recognition.stop();
      else recognition.start();
    } catch (e) {
      setVoiceUI('稍等一下', '语音模块正在重置，1 秒后再点我。');
    }
  });
}

function initDigitalHuman3D() {
  if (!digitalHumanCanvas) return;
  import('https://unpkg.com/three@0.160.1/build/three.module.js').then(THREE => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.15, 5.4);

    const renderer = new THREE.WebGLRenderer({
      canvas: digitalHumanCanvas,
      alpha: true,
      antialias: true
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const avatar = new THREE.Group();
    scene.add(avatar);

    const cyanMat = new THREE.MeshPhysicalMaterial({
      color: 0x8ff7ff,
      emissive: 0x00d9ff,
      emissiveIntensity: 1.45,
      transparent: true,
      opacity: 0.42,
      roughness: 0.18,
      metalness: 0.08,
      transmission: 0.45,
      thickness: 0.2
    });
    const whiteMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.82
    });
    const lineMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.55,
      wireframe: true
    });

    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.46, 1.18, 10, 22), cyanMat);
    body.position.y = -0.42;
    body.scale.set(0.82, 1, 0.44);
    avatar.add(body);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.38, 32, 24), cyanMat);
    head.position.y = 0.78;
    head.scale.set(0.88, 1.05, 0.78);
    avatar.add(head);

    const torsoWire = new THREE.Mesh(new THREE.CapsuleGeometry(0.49, 1.2, 8, 14), lineMat);
    torsoWire.position.copy(body.position);
    torsoWire.scale.copy(body.scale).multiplyScalar(1.02);
    avatar.add(torsoWire);

    const core = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 16), whiteMat);
    core.position.set(0, 0.02, 0.18);
    avatar.add(core);

    const halo1 = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.008, 8, 96), whiteMat);
    halo1.rotation.x = Math.PI / 2.7;
    halo1.position.y = 0.1;
    avatar.add(halo1);

    const halo2 = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.006, 8, 96), lineMat);
    halo2.rotation.x = Math.PI / 2.15;
    halo2.position.y = 0.62;
    avatar.add(halo2);

    const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.82, 8, 12), cyanMat);
    leftArm.position.set(-0.55, -0.12, 0);
    leftArm.rotation.z = -0.32;
    avatar.add(leftArm);
    const rightArm = leftArm.clone();
    rightArm.position.x = 0.55;
    rightArm.rotation.z = 0.32;
    avatar.add(rightArm);

    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 0.45 + Math.random() * 0.76;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = -0.78 + Math.random() * 1.86;
      positions[i * 3 + 2] = Math.sin(a) * r * 0.35;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({
      color: 0x9df8ff,
      size: 0.025,
      transparent: true,
      opacity: 0.72
    }));
    avatar.add(particles);

    scene.add(new THREE.AmbientLight(0x7cf6ff, 1.2));
    const key = new THREE.PointLight(0x00f3ff, 4, 8);
    key.position.set(1.7, 2.2, 3.2);
    scene.add(key);
    const rim = new THREE.PointLight(0xbc13fe, 2.5, 8);
    rim.position.set(-2.5, 1.2, 2.2);
    scene.add(rim);

    function resizeAvatarRenderer() {
      const rect = digitalHumanCanvas.getBoundingClientRect();
      const size = Math.max(1, Math.floor(Math.min(rect.width, rect.height)));
      renderer.setSize(size, size, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    }
    resizeAvatarRenderer();
    window.addEventListener('resize', resizeAvatarRenderer);

    function animateAvatar(t) {
      const time = t * 0.001;
      const activeBoost = avatarSpeaking || avatarListening ? 1.55 : 1;
      avatar.rotation.y = Math.sin(time * 0.7) * 0.22;
      avatar.position.y = Math.sin(time * 1.5) * 0.04;
      core.scale.setScalar((1.15 + Math.sin(time * 7) * 0.2) * activeBoost);
      halo1.rotation.z = time * 0.75;
      halo2.rotation.z = -time * 1.05;
      particles.rotation.y = time * 0.28;
      particles.rotation.z = Math.sin(time * 0.6) * 0.08;
      renderer.render(scene, camera);
      requestAnimationFrame(animateAvatar);
    }
    requestAnimationFrame(animateAvatar);
  }).catch(() => {
    setVoiceUI('3D 加载失败', '网络拦截了 Three.js，语音助手仍可点击使用。');
  });
}

initVoiceAssistant();
initDigitalHuman3D();

/* ---------- 联系按钮：复制 + 音效 ---------- */
function beep() {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ac.createOscillator(), gain = ac.createGain();
    osc.type = 'square'; osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
    osc.connect(gain); gain.connect(ac.destination);
    osc.start(); osc.stop(ac.currentTime + 0.15);
  } catch (e) {}
}
const copyTip = document.getElementById('copyTip');
document.querySelectorAll('.contact-btn[data-copy]').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.copy;
    navigator.clipboard.writeText(val).then(() => {
      beep();
      copyTip.textContent = '✓ 已复制：' + val;
      setTimeout(() => { copyTip.textContent = ''; }, 2000);
    }).catch(() => { copyTip.textContent = '复制失败，请手动复制：' + val; });
  });
});

/* ---------- 导航栏滚动模糊 ---------- */
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));

/* ---------- 故障转场兜底移除 ---------- */
setTimeout(() => {
  const overlay = document.getElementById('glitchOverlay');
  if (overlay) overlay.style.display = 'none';
}, 2400);
