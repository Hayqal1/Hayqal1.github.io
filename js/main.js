/* ==========================================================================
   Portfolio — Hayqal Akbar Rizky Iskandar
   Interaksi: navigasi, filter proyek, lightbox, reveal saat scroll
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------ menu mobile */
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Tutup menu setelah memilih tautan
    menu.addEventListener('click', function (e) {
      if (e.target.closest('.nav__link')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Tutup saat klik di luar
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------- navbar & tombol kembali ke atas */
  var nav = document.querySelector('.nav');
  var toTop = document.querySelector('.to-top');

  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('is-stuck', y > 20);
    if (toTop) toTop.classList.toggle('is-visible', y > 500);
    markActiveSection();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------- tandai seksi yang aktif */
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));

  function markActiveSection() {
    var pos = window.scrollY + 120;
    var current = '';

    sections.forEach(function (sec) {
      if (pos >= sec.offsetTop) current = sec.id;
    });

    navLinks.forEach(function (link) {
      var target = (link.getAttribute('href') || '').replace('#', '');
      link.classList.toggle('is-active', target === current);
    });
  }

  /* --------------------------------------------------- filter proyek */
  var filters = document.querySelectorAll('.filter');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card[data-cat]'));

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.dataset.filter;

      filters.forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });

      cards.forEach(function (card) {
        var match = cat === 'all' || card.dataset.cat === cat;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* -------------------------------------------------------- lightbox */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('.lightbox__img') : null;
  var lightboxCaption = lightbox ? lightbox.querySelector('.lightbox__caption') : null;
  var lastFocused = null;

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = caption || '';
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var closeBtn = lightbox.querySelector('.lightbox__close');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lightboxImg) lightboxImg.src = '';
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-lightbox]');
    if (trigger) {
      e.preventDefault();
      openLightbox(trigger.dataset.lightbox, trigger.dataset.caption);
      return;
    }
    if (e.target.closest('.lightbox__close')) closeLightbox();
    else if (lightbox && e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  /* ------------------------------------------------ reveal saat scroll */
  var revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------ tahun di footer */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Jalankan sekali di awal — setelah semua variabel di atas siap */
  onScroll();
})();