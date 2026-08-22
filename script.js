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
