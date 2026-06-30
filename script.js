/* ═══════════════════════════════════════════════════════════
   SATHWIKA REDDY — PORTFOLIO JAVASCRIPT
   ═══════════════════════════════════════════════════════════ */

/* ── AOS INIT ────────────────────────────────────────────── */
AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 80 });

/* ── LOADING SCREEN ──────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1500);
});

/* ── NAVBAR SCROLL ───────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

/* ── BACK TO TOP ─────────────────────────────────────────── */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── MOBILE NAV ──────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

/* ── DARK / LIGHT MODE TOGGLE ────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('portfolio-theme', theme);
};

// Restore saved preference
const saved = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(saved);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ── TYPEWRITER EFFECT ───────────────────────────────────── */
const phrases  = [
  'Final-Year B.Tech IT Student',
  'Aspiring Full Stack Developer',
  'Python Developer',
  'ML Enthusiast',
  'Problem Solver',
  'Future Interns Intern',
];
let pIdx = 0, cIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const current = phrases[pIdx];
  if (!deleting) {
    tw.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) { deleting = true; setTimeout(type, 2000); return; }
  } else {
    tw.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 45 : 85);
}
setTimeout(type, 1600);

/* ── PARTICLE CANVAS ─────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let particles = [], mouse = { x: null, y: null }, W, H;

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX; mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.a  = Math.random() * 0.5 + 0.1;
    }
    update() {
      if (mouse.x !== null) {
        const dx = mouse.x - this.x, dy = mouse.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          this.vx -= (dx / dist) * force * 0.6;
          this.vy -= (dy / dist) * force * 0.6;
        }
      }
      this.x += this.vx; this.y += this.vy;
      this.vx *= 0.99;   this.vy *= 0.99;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108,99,255,${this.a})`;
      ctx.fill();
    }
  }

  const COUNT = Math.min(80, Math.floor((W * H) / 14000));
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  // Draw connecting lines between close particles
  const drawLines = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108,99,255,${0.12 * (1 - dist/120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  };
  animate();
})();

/* ── ACTIVE NAV LINK (SCROLL SPY) ───────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => spy.observe(s));

/* ── ANIMATED COUNTERS ───────────────────────────────────── */
const counterEls = document.querySelectorAll('.counter');
let countersStarted = false;

const animateCounters = () => {
  counterEls.forEach(el => {
    const target = parseFloat(el.dataset.target);
    const isFloat = target % 1 !== 0;
    const step = target / 60;
    let current = 0;
    const tick = () => {
      current = Math.min(current + step, target);
      el.textContent = isFloat ? current.toFixed(2) : Math.floor(current);
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
  });
};

const counterSection = document.querySelector('.counters-row');
if (counterSection) {
  const counterObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounters();
    }
  }, { threshold: 0.5 });
  counterObs.observe(counterSection);
}

/* ── SKILL PROGRESS BARS ─────────────────────────────────── */
const bars = document.querySelectorAll('.bar-fill');
let barsAnimated = false;

const animateBars = () => {
  bars.forEach(bar => {
    bar.style.width = bar.dataset.width + '%';
  });
};

const barSection = document.querySelector('.skills-bars');
if (barSection) {
  const barObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !barsAnimated) {
      barsAnimated = true;
      animateBars();
    }
  }, { threshold: 0.3 });
  barObs.observe(barSection);
}

/* ── CONTACT FORM ────────────────────────────────────────── */
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

const showErr = (id, msg) => { document.getElementById(id).textContent = msg; };
const clearErr = (id)      => { document.getElementById(id).textContent = ''; };

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  clearErr('nameErr'); clearErr('emailErr'); clearErr('msgErr');

  if (!name)  { showErr('nameErr', 'Please enter your name.'); valid = false; }
  if (!email) { showErr('emailErr', 'Please enter your email.'); valid = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showErr('emailErr', 'Please enter a valid email address.'); valid = false;
  }
  if (!message) { showErr('msgErr', 'Please write a message.'); valid = false; }

  if (!valid) return;

  // mailto fallback — replace with Formspree or EmailJS for real email delivery
  const subject = encodeURIComponent(`Portfolio Enquiry from ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:sathwikareddie25@gmail.com?subject=${subject}&body=${body}`;

  success.classList.add('show');
  form.reset();
  setTimeout(() => success.classList.remove('show'), 5000);
});
