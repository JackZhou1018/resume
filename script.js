/* ============================================================
   硬核科技风个人主页 · 脚本
   功能：粒子网络背景 / 打字机 / 环形进度 / 3D倾斜 / 复制反馈 / 导航模糊 / 故障转场
   ============================================================ */

/* ---------- 1. 背景粒子网络（鼠标吸引） ---------- */
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const MOUSE = { x: null, y: null };

function initParticles() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  // 粒子数量严格限流 ≤80，兼顾视觉与性能（卡顿可再调低）
  const count = Math.min(80, Math.floor(innerWidth * innerHeight / 20000));
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.8 + 0.5
    });
  }
}
initParticles();
addEventListener('resize', initParticles);

// 鼠标位置（吸引效果）
addEventListener('mousemove', e => { MOUSE.x = e.clientX; MOUSE.y = e.clientY; });
addEventListener('mouseleave', () => { MOUSE.x = MOUSE.y = null; });

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of particles) {
    // 鼠标吸引：距离近时轻微拉向鼠标
    if (MOUSE.x !== null) {
      const dx = MOUSE.x - p.x, dy = MOUSE.y - p.y;
      const d = Math.hypot(dx, dy);
      if (d < 150) {
        p.vx += (dx / d) * 0.06;
        p.vy += (dy / d) * 0.06;
      }
    }
    // 速度阻尼，避免越跑越快
    p.vx *= 0.98; p.vy *= 0.98;
    p.x += p.vx; p.y += p.vy;
    // 边界反弹
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    // 画粒子（霓虹青）
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 243, 255, 0.65)';
    ctx.fill();
  }

  // 粒子间连线
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = 'rgba(188, 19, 254, ' + (1 - d / 120) * 0.28 + ')';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();

/* ---------- 2. 打字机姓名 ---------- */
const nameText = '张小明';
const typeEl = document.getElementById('typeTarget');
let idx = 0;
function typeName() {
  if (idx <= nameText.length) {
    typeEl.innerHTML = nameText.slice(0, idx) + (idx < nameText.length ? '<span class="typing-caret">▊</span>' : '');
    idx++;
    setTimeout(typeName, 120);
  }
}
setTimeout(typeName, 1500); // 等故障转场结束后开始

/* ---------- 3. 环形技能进度条 ---------- */
const RING_C = 327; // 2 * PI * 52（圆周长）
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const ring = entry.target;
      const value = parseInt(ring.dataset.value, 10);
      const circle = ring.querySelector('.progress');
      // 设置 stroke-dashoffset = 周长 * (1 - 百分比)，触发填充动画
      circle.style.strokeDashoffset = RING_C * (1 - value / 100);
      skillObserver.unobserve(ring);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.skill-ring').forEach(ring => skillObserver.observe(ring));

/* ---------- 4. 项目卡片 3D 倾斜 ---------- */
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;   // -0.5 ~ 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    const maxTilt = 12; // 最大倾斜角度
    card.style.transform = `rotateY(${px * maxTilt}deg) rotateX(${-py * maxTilt}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateY(0) rotateX(0)';
  });
});

/* ---------- 5. 联系按钮：复制 + 音效反馈 ---------- */
// 用 Web Audio 生成一个短促电子提示音（无需外部音频文件）
function beep() {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'square';
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
    osc.connect(gain); gain.connect(ac.destination);
    osc.start(); osc.stop(ac.currentTime + 0.15);
  } catch (e) { /* 忽略音频错误 */ }
}

const copyTip = document.getElementById('copyTip');
document.querySelectorAll('.contact-btn[data-copy]').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.copy;
    navigator.clipboard.writeText(val).then(() => {
      beep();
      copyTip.textContent = '✓ 已复制：' + val;
      setTimeout(() => { copyTip.textContent = ''; }, 2000);
    }).catch(() => {
      copyTip.textContent = '复制失败，请手动复制：' + val;
    });
  });
});

/* ---------- 6. 导航栏滚动模糊 ---------- */
const nav = document.getElementById('nav');
addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 40);
});

/* ---------- 7. 故障转场自动消失（CSS 已处理，这里兜底移除） ---------- */
setTimeout(() => {
  const overlay = document.getElementById('glitchOverlay');
  if (overlay) overlay.style.display = 'none';
}, 2400);
