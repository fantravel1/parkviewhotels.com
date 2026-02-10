/* =========================================================
   ParkviewHotels — Main JavaScript
   Mobile-first, performance-focused
   ========================================================= */

(function () {
  'use strict';

  /* ─── Header Scroll Effect ─── */
  const header = document.getElementById('site-header');

  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  /* ─── Mobile Menu Toggle ─── */
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  function toggleMobileMenu() {
    if (!menuToggle || !mobileMenu) return;

    const isOpen = mobileMenu.classList.contains('open');

    mobileMenu.classList.toggle('open');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.setAttribute('aria-hidden', String(isOpen));

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu || !mobileMenu.classList.contains('open')) return;
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when a link is clicked
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

  /* ─── Scroll-triggered Fade-in Animations ─── */
  function initScrollAnimations() {
    // Elements to animate on scroll
    var animTargets = [
      '.section-header',
      '.philosophy-text',
      '.philosophy-image',
      '.destination-card',
      '.calm-score-card',
      '.collection-card',
      '.walks-image',
      '.walks-content',
      '.testimonial-card',
      '.trust-content',
      '.trust-image',
      '.faq-item',
      '.vision-stat',
      '.newsletter-content'
    ];

    var elements = document.querySelectorAll(animTargets.join(','));

    elements.forEach(function (el) {
      el.classList.add('fade-in');
    });

    // Use IntersectionObserver for performant scroll animations
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      elements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show everything immediately
      elements.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  /* ─── Smooth Scroll for Anchor Links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        closeMobileMenu();
        var headerOffset = header ? header.offsetHeight : 0;
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ─── Newsletter Form Handler ─── */
  var newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      // Allow default navigation to coming-soon.html
    });
  }

  /* ─── Staggered Animation Delays ─── */
  function addStaggerDelays() {
    var staggerGroups = [
      '.destinations-grid .destination-card',
      '.calm-scores-grid .calm-score-card',
      '.collections-grid .collection-card',
      '.testimonials-grid .testimonial-card',
      '.vision-grid .vision-stat',
      '.faq-list .faq-item'
    ];

    staggerGroups.forEach(function (selector) {
      var items = document.querySelectorAll(selector);
      items.forEach(function (item, index) {
        item.style.transitionDelay = (index * 0.08) + 's';
      });
    });
  }

  /* ─── Parallax effect for hero (subtle, performance-safe) ─── */
  var heroImage = document.querySelector('.hero-image');

  function handleParallax() {
    if (!heroImage || window.innerWidth < 768) return;
    var scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroImage.style.transform = 'scale(1.05) translateY(' + (scrolled * 0.15) + 'px)';
    }
  }

  /* ─── Optimize Scroll Listener with requestAnimationFrame ─── */
  var ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleHeaderScroll();
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── Initialize ─── */
  function init() {
    handleHeaderScroll();
    initScrollAnimations();
    addStaggerDelays();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
