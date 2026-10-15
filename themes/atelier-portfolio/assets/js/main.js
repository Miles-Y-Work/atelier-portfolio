(() => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');

  if (toggle && nav) {
    const label = toggle.querySelector('[data-nav-label]');
    const groups = [...nav.querySelectorAll('[data-nav-group]')];
    const mobile = window.matchMedia('(max-width: 760px)');

    const setSubmenu = (group, open) => {
      group.querySelector('[data-submenu-toggle]').setAttribute('aria-expanded', String(open));
      group.querySelector('.nav-submenu').hidden = !open;
    };
    const closeSubmenus = (except) => {
      groups.forEach((group) => {
        if (group !== except) setSubmenu(group, false);
      });
    };
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      if (label) label.textContent = 'Open navigation';
      document.body.classList.remove('nav-open');
      closeSubmenus();
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      closeMenu();
      toggle.setAttribute('aria-expanded', String(!isOpen));
      if (label) label.textContent = isOpen ? 'Open navigation' : 'Close navigation';
      document.body.classList.toggle('nav-open', !isOpen);
    });

    groups.forEach((group) => {
      const button = group.querySelector('[data-submenu-toggle]');
      button.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') !== 'true';
        closeSubmenus(group);
        setSubmenu(group, open);
      });
      group.addEventListener('focusout', (event) => {
        if (!group.contains(event.relatedTarget)) setSubmenu(group, false);
      });
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('click', (event) => {
      if (event.target === nav || (!nav.contains(event.target) && !toggle.contains(event.target))) closeMenu();
    });
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const openGroup = groups.find((group) => group.querySelector('[data-submenu-toggle]').getAttribute('aria-expanded') === 'true');
        if (openGroup) {
          event.preventDefault();
          setSubmenu(openGroup, false);
          openGroup.querySelector('[data-submenu-toggle]').focus();
        } else if (document.body.classList.contains('nav-open')) {
          closeMenu();
          toggle.focus();
        }
      }
      if (event.key === 'Tab' && mobile.matches && document.body.classList.contains('nav-open')) {
        const links = [...nav.querySelectorAll('a, button')].filter((element) => element.getClientRects().length);
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === toggle) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggle.focus();
        }
      }
    });
    mobile.addEventListener('change', closeMenu);
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
