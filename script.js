(() => {
  'use strict';

  // Always open/reload the website at the very top instead of restoring an old scroll position.
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const resetToTop = () => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  window.addEventListener('pageshow', () => {
    requestAnimationFrame(() => {
      resetToTop();
      setTimeout(resetToTop, 60);
    });
  });

  window.addEventListener('load', () => {
    requestAnimationFrame(resetToTop);
  });


  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Menü öffnen');
    nav.classList.remove('open');
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(willOpen));
      menuButton.setAttribute('aria-label', willOpen ? 'Menü schließen' : 'Menü öffnen');
      nav.classList.toggle('open', willOpen);
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', event => {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(event.target) || menuButton.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
