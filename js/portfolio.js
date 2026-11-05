(() => {
  'use strict';
  const toggle = document.querySelector('[data-contrast]');
  if (toggle) {
    let inverted = false;
    try { inverted = localStorage.getItem('portfolio-contrast') === 'inverted'; } catch {}
    const apply = () => {
      document.documentElement.classList.toggle('contrast-inverted', inverted);
      toggle.setAttribute('aria-pressed', String(inverted));
    };
    apply();
    toggle.addEventListener('click', () => {
      inverted = !inverted;
      apply();
      try { localStorage.setItem('portfolio-contrast', inverted ? 'inverted' : 'default'); } catch {}
    });
  }

  document.querySelectorAll('[data-project]').forEach(button => {
    const dialog = document.getElementById(button.dataset.project);
    if (typeof HTMLDialogElement === 'undefined' || !(dialog instanceof HTMLDialogElement) || typeof dialog.showModal !== 'function') {
      button.hidden = true; // Project descriptions and download links remain available on the cards.
      return;
    }
    button.hidden = false;
    button.addEventListener('click', () => dialog.showModal());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
  });

  const menu = document.querySelector('.mobile-menu');
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
})();
