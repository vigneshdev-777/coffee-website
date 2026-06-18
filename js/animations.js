/* ============================================================
   VIGNESH CHETTIYAR — ANIMATIONS JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. SCROLL REVEAL ───────────────────────────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  // ── 2. STAT COUNTER ANIMATION ─────────────────────────────
  const statEls = document.querySelectorAll('.stat-value');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const raw = el.textContent.trim();
      // Extract leading number, preserve suffix (°, m, min, %, h, ×)
      const match = raw.match(/^([<]?)(\d+\.?\d*)(.*)$/);
      if (!match) return;

      const prefix   = match[1] || '';
      const target   = parseFloat(match[2]);
      const suffix   = match[3] || '';
      const duration = 1600;
      const startTime = performance.now();

      el.classList.add('counted');

      const tick = (now) => {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        const current  = eased * target;
        el.textContent = prefix + (Number.isInteger(target)
          ? Math.round(current)
          : current.toFixed(0)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + target + suffix;
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });

  statEls.forEach(el => counterObserver.observe(el));


  // ── 3. HERO PARTICLES ─────────────────────────────────────
  const hero = document.querySelector('.hero-carousel');
  if (hero) {
    const container = document.createElement('div');
    container.className = 'hero-particles';
    hero.prepend(container);

    const count = 18;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.className = 'particle';
      const size = Math.random() * 5 + 3;
      dot.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: ${Math.random() * 20}%;
        width: ${size}px;
        height: ${size}px;
        --drift: ${(Math.random() - 0.5) * 120}px;
        animation-duration: ${Math.random() * 10 + 8}s;
        animation-delay: ${Math.random() * 8}s;
        opacity: ${Math.random() * 0.4 + 0.1};
        border-radius: ${Math.random() > 0.5 ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%'};
      `;
      container.appendChild(dot);
    }
  }


  // ── 4. STAGGER GRID CHILDREN ──────────────────────────────
  // Automatically stagger items inside grids
  document.querySelectorAll('.products-grid, .shop-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.product-card');
    cards.forEach((card, i) => {
      if (!card.hasAttribute('data-reveal')) {
        card.setAttribute('data-reveal', 'scale-up');
        card.setAttribute('data-delay', String((i + 1) * 150));
        revealObserver.observe(card);
      }
    });
  });


  // ── 5. SECTION EYEBROW LINE TRIGGER ──────────────────────
  document.querySelectorAll('.section-eyebrow, .section-eyebrow-dark').forEach(el => {
    if (!el.hasAttribute('data-reveal')) {
      el.setAttribute('data-reveal', 'up');
      revealObserver.observe(el);
    }
  });


  // ── 6. NAV SCROLL BACKGROUND ─────────────────────────────
  // (already handled inline — this just ensures it runs)
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }


  // ── 7. CURSOR GLOW TRAIL (desktop only) ──────────────────
  if (window.matchMedia('(pointer: fine)').matches) {
    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed; pointer-events: none; z-index: 9999;
      width: 300px; height: 300px; border-radius: 50%;
      background: radial-gradient(circle, rgba(212,165,116,0.06) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: left 0.15s ease, top 0.15s ease;
      left: -300px; top: -300px;
    `;
    document.body.appendChild(trail);

    window.addEventListener('mousemove', e => {
      trail.style.left = e.clientX + 'px';
      trail.style.top  = e.clientY + 'px';
    }, { passive: true });
  }


  // ── 8. PROCESS PANEL STAGGER ─────────────────────────────
  document.querySelectorAll('.process-panel').forEach((panel, i) => {
    const img     = panel.querySelector('.process-panel__img');
    const content = panel.querySelector('.process-panel__content');
    const isReverse = panel.classList.contains('reverse');

    if (img && !img.hasAttribute('data-reveal')) {
      img.setAttribute('data-reveal', isReverse ? 'right' : 'left');
      revealObserver.observe(img);
    }
    if (content && !content.hasAttribute('data-reveal')) {
      content.setAttribute('data-reveal', isReverse ? 'left' : 'right');
      content.setAttribute('data-delay', '150');
      revealObserver.observe(content);
    }
  });

});
