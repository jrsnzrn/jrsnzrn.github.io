/* Small, dependency-free interactions. Everything readable without JavaScript. */
(() => {
  'use strict';
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motionButton = document.querySelector('.motion-toggle');
  let motionPreference = 'on';
  try { motionPreference = localStorage.getItem('jairus-motion') || 'on'; } catch { /* Private browsing is supported. */ }
  let motionEnabled = false;
  let updateCanvasMotion = () => {};

  function applyMotionPreference() {
    motionEnabled = !reducedMotion.matches && motionPreference !== 'off';
    root.dataset.motion = motionEnabled ? 'on' : 'off';
    motionButton.setAttribute('aria-pressed', String(!motionEnabled));
    motionButton.setAttribute('aria-label', motionEnabled ? 'Pause animations' : 'Play animations');
    motionButton.title = reducedMotion.matches ? 'Reduced motion is enabled in your system settings' : motionEnabled ? 'Pause animations' : 'Play animations';
    motionButton.disabled = reducedMotion.matches;
    motionButton.querySelector('.motion-label').textContent = reducedMotion.matches ? 'Reduced motion' : motionEnabled ? 'Motion on' : 'Motion off';
    motionButton.querySelector('.motion-icon').textContent = motionEnabled ? 'Ⅱ' : '▷';
    if (!motionEnabled) {
      document.querySelectorAll('.will-reveal').forEach(el => el.classList.add('is-visible'));
      document.querySelectorAll('.magnetic').forEach(el => el.style.removeProperty('translate'));
      document.querySelectorAll('[data-tilt]').forEach(el => {
        el.style.removeProperty('--rx');
        el.style.removeProperty('--ry');
      });
    }
    updateCanvasMotion();
  }
  motionButton.addEventListener('click', () => {
    motionPreference = motionEnabled ? 'off' : 'on';
    try { localStorage.setItem('jairus-motion', motionPreference); } catch { /* Motion toggle still works without storage. */ }
    applyMotionPreference();
  });
  reducedMotion.addEventListener('change', applyMotionPreference);
  applyMotionPreference();

  // Accessible mobile navigation, with Escape and outside-click dismissal.
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  function closeMenu(returnFocus = false) {
    navLinks.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    navLinks.classList.toggle('is-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav') && menuButton.getAttribute('aria-expanded') === 'true') closeMenu();
  });
  window.matchMedia('(min-width: 601px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

  // Reveal elements once. Never hide content when an observer is unavailable.
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.reveal').forEach(el => {
      if (motionEnabled) el.classList.add('will-reveal');
      revealObserver.observe(el);
    });
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.querySelectorAll('a').forEach(link => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => navObserver.observe(section));
  }

  // Filter the six real projects; native buttons provide keyboard behavior.
  const projectGrid = document.querySelector('.project-grid');
  const projectCards = [...projectGrid.querySelectorAll('.project-card')];
  document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      let visibleCount = 0;
      document.querySelectorAll('.filter').forEach(other => {
        const active = other === button;
        other.classList.toggle('active', active);
        other.setAttribute('aria-pressed', String(active));
      });
      projectGrid.classList.toggle('is-filtered', category !== 'all');
      projectCards.forEach(card => {
        card.hidden = category !== 'all' && !card.dataset.category.split(' ').includes(category);
        if (!card.hidden) {
          visibleCount++;
          card.classList.add('is-visible');
          if (motionEnabled && card.animate) card.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 380, easing: 'ease-out' });
        }
      });
      document.querySelector('.project-count').textContent = `SHOWING ${String(visibleCount).padStart(2, '0')} PROJECT${visibleCount === 1 ? '' : 'S'}`;
    });
  });

  // Fine-pointer flourishes stay small and never replace the native cursor.
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', e => {
      if (!motionEnabled || !finePointer.matches) return;
      const rect = card.querySelector('.project-art').getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      card.style.setProperty('--rx', `${(0.5 - y) * 4}deg`);
      card.style.setProperty('--ry', `${(x - 0.5) * 5}deg`);
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
  document.querySelectorAll('.magnetic').forEach(button => {
    button.addEventListener('pointermove', e => {
      if (!motionEnabled || !finePointer.matches) return;
      const rect = button.getBoundingClientRect();
      button.style.translate = `${(e.clientX - rect.left - rect.width / 2) * 0.12}px ${(e.clientY - rect.top - rect.height / 2) * 0.12}px`;
    });
    button.addEventListener('pointerleave', () => { button.style.translate = '0px 0px'; });
  });
  let pointerFrame = 0;
  let pointerX = -900, pointerY = -900;
  window.addEventListener('pointermove', e => {
    if (!motionEnabled || !finePointer.matches) return;
    pointerX = e.clientX; pointerY = e.clientY;
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      root.style.setProperty('--px', `${pointerX}px`);
      root.style.setProperty('--py', `${pointerY}px`);
      pointerFrame = 0;
    });
  }, { passive: true });
  const progress = document.querySelector('.scroll-progress');
  let scrollFrame = 0;
  function updateProgress() {
    const scrollable = root.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${scrollable > 0 ? Math.max(0, Math.min(1, window.scrollY / scrollable)) : 0})`;
    scrollFrame = 0;
  }
  window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress); }, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
  document.querySelector('#year').textContent = new Date().getFullYear();

  // A quiet constellation behind the hero: capped, throttled, and offscreen-aware.
  const canvas = document.querySelector('.hero-network');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let width = 1, height = 1, stars = [], canvasFrame = 0, lastTime = 0, heroVisible = true;
  function sizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width; height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = width < 600 ? 17 : 30;
    stars = Array.from({ length: count }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.1 }));
  }
  function draw(time) {
    canvasFrame = 0;
    if (!motionEnabled || !heroVisible || document.hidden) return;
    if (time - lastTime >= 40) {
      const step = Math.min(3, (time - lastTime) / 40 || 1);
      lastTime = time;
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star, index) => {
        star.x += star.vx * step; star.y += star.vy * step;
        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;
        ctx.beginPath(); ctx.arc(star.x, star.y, 1.25, 0, Math.PI * 2); ctx.fillStyle = '#d2fa6970'; ctx.fill();
        for (let j = index + 1; j < stars.length; j++) {
          const next = stars[j], distance = Math.hypot(star.x - next.x, star.y - next.y);
          if (distance > 145) continue;
          ctx.beginPath(); ctx.moveTo(star.x, star.y); ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = `rgba(210,250,105,${(1 - distance / 145) * 0.16})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      });
    }
    canvasFrame = requestAnimationFrame(draw);
  }
  updateCanvasMotion = () => {
    if (canvasFrame) cancelAnimationFrame(canvasFrame);
    canvasFrame = 0;
    if (motionEnabled && heroVisible && !document.hidden) { lastTime = 0; canvasFrame = requestAnimationFrame(draw); }
    else ctx.clearRect(0, 0, width, height);
  };
  sizeCanvas();
  if ('ResizeObserver' in window) new ResizeObserver(sizeCanvas).observe(document.querySelector('.hero'));
  else window.addEventListener('resize', sizeCanvas, { passive: true });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; updateCanvasMotion(); }).observe(document.querySelector('.hero'));
  document.addEventListener('visibilitychange', updateCanvasMotion);
  updateCanvasMotion();
})();
