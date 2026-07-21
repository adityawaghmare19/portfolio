/* =============================================
   ADITYA WAGHMARE PORTFOLIO — script.js
   Typing Effect · Particles · Scroll Reveal
   ============================================= */

/* ── Typing Effect ──────────────────────────── */
const roles = [
  'Python Developer',
  'Backend Engineer',
  'Full-Stack Developer',
  'Software Engineer',
  'React Developer',
];

let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 55 : 90);
}
type();

/* ── Particle Canvas ────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let   W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function createParticles() {
    particles = [];
    const count = Math.floor(W / 14);
    for (let i = 0; i < count; i++) {
      particles.push({
        x:     rand(0, W),
        y:     rand(0, H),
        vx:    rand(-0.18, 0.18),
        vy:    rand(-0.18, 0.18),
        r:     rand(1, 2.2),
        alpha: rand(0.15, 0.55),
      });
    }
  }
  createParticles();
  window.addEventListener('resize', createParticles);

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(159, 103, 248, ${p.alpha})`;
      ctx.fill();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
})();

/* ── Navbar Scroll Effect ───────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── Hamburger Menu ─────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Active Nav Link Highlight ──────────────── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(n => n.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4, rootMargin: '-60px 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ── Scroll Reveal ──────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      // Stagger children in grids
      const siblings = el.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === el) delay = idx * 80;
      });
      setTimeout(() => el.classList.add('visible'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Stat Counter Animation ─────────────────── */
function animateCounter(el, target, duration = 1200) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = +el.dataset.target;
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

/* ── Project Card Mouse Glow ────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width)  * 100;
    const y    = ((e.clientY - rect.top)  / rect.height) * 100;
    const glow = card.querySelector('.project-card-glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(124,58,237,0.12), transparent 60%)`;
    }
  });
});

/* ── Cert Card Shine Mouse Parallax ─────────── */
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / rect.width;
    const dy   = (e.clientY - cy) / rect.height;
    card.style.transform = `translateY(-4px) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
    setTimeout(() => card.style.transition = '', 400);
  });
});

/* ── Smooth scroll for logo → top ───────────── */
document.querySelectorAll('a[href="#home"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ── Cert Modal / Lightbox ──────────────────── */
const certModal = document.getElementById('certModal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');

if (certModal && modalImg && modalClose) {
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.cert-preview');
      if (img && img.src) {
        certModal.style.display = 'block';
        modalImg.src = img.src;
      }
    });
  });

  modalClose.addEventListener('click', () => {
    certModal.style.display = 'none';
  });

  certModal.addEventListener('click', (e) => {
    if (e.target !== modalImg) {
      certModal.style.display = 'none';
    }
  });
}
