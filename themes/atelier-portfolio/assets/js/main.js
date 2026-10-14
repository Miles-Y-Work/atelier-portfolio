(() => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');

  if (toggle && nav) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      document.body.classList.toggle('nav-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const form = document.querySelector('[data-contact-form]');
  if (form && !form.getAttribute('action')) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('[data-form-status]');
      if (status) {
        status.textContent = '表单样式已就绪；发布前请在 hugo.toml 中配置 formAction。';
      }
    });
  }

  document.querySelectorAll('[data-gallery-open]').forEach((trigger) => {
    const gallery = document.getElementById(trigger.dataset.galleryOpen);
    if (!gallery) return;

    const slides = [...gallery.querySelectorAll('[data-gallery-slide]')];
    const thumbs = [...gallery.querySelectorAll('[data-gallery-thumb]')];
    const count = gallery.querySelector('[data-gallery-count]');
    let current = 0;

    const show = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, position) => {
        slide.hidden = position !== current;
      });
      thumbs.forEach((thumb, position) => {
        if (position === current) thumb.setAttribute('aria-current', 'true');
        else thumb.removeAttribute('aria-current');
      });
      if (count) count.textContent = `${current + 1} / ${slides.length}`;
    };

    trigger.addEventListener('click', () => {
      show(0);
      gallery.showModal();
    });
    gallery.querySelector('[data-gallery-close]')?.addEventListener('click', () => gallery.close());
    gallery.querySelector('[data-gallery-prev]')?.addEventListener('click', () => show(current - 1));
    gallery.querySelector('[data-gallery-next]')?.addEventListener('click', () => show(current + 1));
    thumbs.forEach((thumb, index) => thumb.addEventListener('click', () => show(index)));
    gallery.addEventListener('click', (event) => {
      if (event.target === gallery) gallery.close();
    });
    gallery.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') show(current - 1);
      if (event.key === 'ArrowRight') show(current + 1);
    });
    gallery.addEventListener('close', () => trigger.focus());
  });
})();
