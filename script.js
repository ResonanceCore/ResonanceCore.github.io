/* ============================
   GEORGE MELO — AUDIO PORTFOLIO
   script.js
   ============================ */

(() => {
  'use strict';

  /* ---- LANGUAGE TOGGLE ---- */
  const langToggleBtn = document.getElementById('langToggle');
  let currentLang = 'pt';

  function setLang(lang) {
    currentLang = lang;
    langToggleBtn.textContent = lang === 'pt' ? 'EN' : 'PT';
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');

    document.querySelectorAll('[data-pt]').forEach(el => {
      // Only update text if element has no child elements (text-only nodes)
      // This prevents destroying child elements like <br> or <span> inside the node
      const hasChildElements = Array.from(el.childNodes).some(n => n.nodeType === Node.ELEMENT_NODE);
      if (hasChildElements) return;

      const text = lang === 'pt' ? el.dataset.pt : el.dataset.en;
      if (text !== undefined) {
        el.textContent = text;
      }
    });
  }

  langToggleBtn.addEventListener('click', () => {
    setLang(currentLang === 'pt' ? 'en' : 'pt');
  });

  /* ---- VIDEO LAZY LOAD ---- */
  document.querySelectorAll('.video-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const src = trigger.dataset.src;
      if (!src) return;

      const embed = trigger.nextElementSibling;
      if (!embed || !embed.classList.contains('video-embed')) return;

      const iframe = embed.querySelector('iframe');
      if (iframe) {
        iframe.src = src;
      }

      trigger.style.display = 'none';
      embed.classList.remove('hidden');
    });
  });

  /* ---- PODCAST ACCORDION ---- */
  document.querySelectorAll('.podcast-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.podcast-item');
      const player = item.querySelector('.podcast-player');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.podcast-item').forEach(i => {
        i.classList.remove('open');
        const p = i.querySelector('.podcast-player');
        if (p) p.style.display = 'none';
        const h = i.querySelector('.podcast-header');
        if (h) h.setAttribute('aria-expanded', 'false');
      });

      // Open if was closed
      if (!isOpen) {
        item.classList.add('open');
        if (player) player.style.display = 'block';
        header.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard support
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  /* ---- SCROLL FADE-IN ---- */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll(
    '.project, .about-text, .about-details, .contact-inner, .podcast-list, .section-intro'
  ).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  /* ---- FOOTER YEAR ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- NAV SCROLL EFFECT ---- */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.borderBottomColor = 'rgba(15,15,14,0.06)';
    } else {
      nav.style.borderBottomColor = 'rgba(15,15,14,0.09)';
    }
  }, { passive: true });

})();
