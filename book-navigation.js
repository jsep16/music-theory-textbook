'use strict';
(() => {
  const menu = document.querySelector('#chapter-navigation');
  const toggle = document.querySelector('#menu-toggle');
  const links = [...menu.querySelectorAll('[data-current-chapter] .chapter-topics a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const progress = document.querySelector('.reading-progress');

  function closeMenu(restoreFocus = false) {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', String(menu.classList.toggle('is-open')));
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) closeMenu(menu.contains(document.activeElement));
  });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });

  let scheduled = false;
  function updateReading() {
    let active = sections[0];
    for (const section of sections) if (section.getBoundingClientRect().top < 160) active = section;
    links.forEach(link => {
      if (active && link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? Math.max(0, Math.min(100, scrollY / max * 100)) : 0}%`;
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateReading); }
  }, {passive: true});
  window.addEventListener('resize', updateReading);
  // Resolve incoming topic links after the chapter scripts have laid out examples.
  window.addEventListener('load', () => {
    const target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView({behavior: 'instant', block: 'start'});
    updateReading();
  }, {once: true});
  requestAnimationFrame(updateReading);
})();
