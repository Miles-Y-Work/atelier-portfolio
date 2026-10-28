(() => {
  const form = document.querySelector('[data-contact-form]');
  if (form && form.getAttribute('action')?.startsWith('mailto:') && form.dataset.contactEmail) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = [data.get('first-name'), data.get('last-name')].filter(Boolean).join(' ');
      const subject = String(data.get('subject') || `Website message from ${name}`);
      const body = `${data.get('message') || ''}\n\nFrom: ${name}\nEmail: ${data.get('email') || ''}`;
      const recipient = form.getAttribute('action');
      window.location.href = `${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = form.querySelector('[data-form-status]');
      if (status) {
        status.textContent = 'Review the draft in your email app, then send it when you’re ready.';
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
