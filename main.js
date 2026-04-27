// Vercel Web Analytics — page views + visitor counts.
// Auto-tracks on production; skipped in dev.
import { inject, track } from '@vercel/analytics';
inject();

// ===== Initialize Lucide Icons =====
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  initScrollAnimations();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initCTATracking();
  initHeroCarousel();
});

// ===== CTA Click Tracking =====
// Every "Try Now for Free" / "Launch App" button gets a data-cta
// attribute labeling its placement (navbar, hero, bottom-cta, footer).
// On click we fire a Vercel Analytics custom event so we can see CTR
// per placement in the dashboard — clicks show up under "Events" with
// the location as a property.
function initCTATracking() {
  document.querySelectorAll('[data-cta]').forEach((link) => {
    link.addEventListener('click', () => {
      track('cta_clicked', { location: link.dataset.cta });
    });
  });
}

// ===== Scroll Animations (IntersectionObserver) =====
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}

// ===== Navbar Scroll Effect =====
function initNavbar() {
  const nav = document.getElementById('nav');
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 20) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ===== Mobile Menu =====
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  // Close menu when clicking a link
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
}

// ===== Hero Carousel =====
// Auto-cycling product screenshots with crossfade. UX rules:
//  - 5s hold per slide, then advance to the next
//  - Hover or focus pauses the auto-advance (keeps timer cleared until
//    the user moves away, so they can dwell on something interesting)
//  - Clicking a dot jumps to that slide and resets the 5s timer so the
//    next auto-advance happens 5s after the manual jump (not mid-cycle)
//  - prefers-reduced-motion: no auto-advance at all; user advances
//    manually via dots
//  - When the page tab is hidden, the timer pauses so we don't
//    "advance" 30 slides while the user is on another tab
function initHeroCarousel() {
  const carousel = document.getElementById('hero-carousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
  const caption = carousel.querySelector('#hero-carousel-caption');

  if (slides.length === 0) return;

  const HOLD_MS = 5000;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = 0;
  let timer = null;
  let paused = false;

  function setActive(idx) {
    current = (idx + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.classList.toggle('is-active', i === current);
    });
    dots.forEach((d, i) => {
      const active = i === current;
      d.classList.toggle('is-active', active);
      d.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    if (caption) {
      const c = slides[current].dataset.caption;
      if (c) caption.textContent = c;
    }
  }

  function advance() {
    setActive(current + 1);
  }

  function startTimer() {
    if (reducedMotion || paused || document.hidden) return;
    stopTimer();
    timer = setInterval(advance, HOLD_MS);
  }

  function stopTimer() {
    if (timer != null) {
      clearInterval(timer);
      timer = null;
    }
  }

  function resetTimer() {
    stopTimer();
    startTimer();
  }

  // Dot clicks — jump + reset cadence so the user gets a full 5s on
  // their chosen slide, not whatever was left of the prior slide's tick.
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.slideTo, 10);
      if (Number.isNaN(idx)) return;
      setActive(idx);
      resetTimer();
    });
  });

  // Pause on hover/focus. Using mouseenter (not mouseover) so we don't
  // get spurious enter/leave events from inner elements.
  carousel.addEventListener('mouseenter', () => { paused = true; stopTimer(); });
  carousel.addEventListener('mouseleave', () => { paused = false; startTimer(); });
  carousel.addEventListener('focusin', () => { paused = true; stopTimer(); });
  carousel.addEventListener('focusout', (e) => {
    // Only resume if focus is leaving the carousel entirely
    if (!carousel.contains(e.relatedTarget)) {
      paused = false;
      startTimer();
    }
  });

  // Tab visibility: pause the cycle so we don't run through every slide
  // while the user has us in a background tab.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopTimer();
    else if (!paused) startTimer();
  });

  startTimer();
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
