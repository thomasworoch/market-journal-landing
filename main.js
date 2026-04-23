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
