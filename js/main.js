/* ═══════════════════════════════════════
   main.js — Interactividad y animaciones
   ═══════════════════════════════════════ */

// ── PARTICLES ──────────────────────────
(function () {
  const container = document.getElementById('pts');
  if (!container) return;
  const cols = ['#FCD116', '#003893', '#CE1126', '#00d4aa', 'rgba(255,255,255,.5)'];
  const count = window.innerWidth < 640 ? 14 : 26;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'pt';
    const size = Math.random() * 5 + 2;
    p.style.cssText = [
      `width:${size}px`, `height:${size}px`,
      `left:${Math.random() * 100}%`,
      `background:${cols[Math.floor(Math.random() * cols.length)]}`,
      `animation-duration:${Math.random() * 14 + 9}s`,
      `animation-delay:${Math.random() * 12}s`
    ].join(';');
    container.appendChild(p);
  }
})();

// ── NAV / DRAWER ───────────────────────
const burger      = document.getElementById('burger');
const navMenu     = document.getElementById('navMenu');
const navBackdrop = document.getElementById('navBackdrop');

function openNav() {
  navMenu.classList.add('open');
  navBackdrop.classList.add('open');
  burger.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  navMenu.classList.remove('open');
  navBackdrop.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

burger.addEventListener('click', () =>
  navMenu.classList.contains('open') ? closeNav() : openNav()
);
navBackdrop.addEventListener('click', closeNav);

// Close on any nav link tap (important for mobile)
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

// Close on resize → desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 900) closeNav();
}, { passive: true });

// Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeNav();
});

// ── SCROLL REVEAL ──────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('on');

    // Animate progress bars inside this revealed element
    entry.target.querySelectorAll('.prog-fill[data-w]').forEach(bar => {
      bar.style.width = bar.dataset.w + '%';
    });
  });
}, { threshold: 0.08 });

document.querySelectorAll('.rv, .rv-l, .rv-r').forEach(el => revealObs.observe(el));

// ── ANIMATED COUNTERS ──────────────────
function animateCounter(el) {
  const target   = parseFloat(el.dataset.cnt);
  const suffix   = el.dataset.sfx || '';
  const duration = 1800;
  const steps    = 60;
  let   current  = 0;
  const step     = target / steps;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current.toFixed(target % 1 !== 0 ? 1 : 0) + suffix;
  }, duration / steps);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.dataset.cnt) {
      animateCounter(entry.target);
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-cnt]').forEach(el => counterObs.observe(el));

// ── SCROLLSPY ──────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

const spyObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + id)
      );
    }
  });
}, {
  rootMargin: '-20% 0px -65% 0px',
  threshold: 0
});

sections.forEach(s => spyObs.observe(s));

// ── BACK TO TOP ────────────────────────
const backTop = document.getElementById('backTop');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 420);
  }, { passive: true });

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
