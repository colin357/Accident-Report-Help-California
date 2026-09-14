(function () {
  // Mobile navigation
  var menuButton = document.getElementById('menu-button');
  var navMenu = document.getElementById('nav-menu');
  if (menuButton && navMenu) {
    menuButton.addEventListener('click', function () {
      var open = navMenu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Request modal
  var modal = document.getElementById('request-modal');
  var form = document.getElementById('request-form');
  var lastFocus = null;

  function openModal(e) {
    if (e) e.preventDefault();
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    if (navMenu) { navMenu.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
    var first = modal.querySelector('input, select, textarea, button');
    if (first) first.focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  Array.prototype.forEach.call(document.querySelectorAll('.js-open-modal'), function (el) {
    el.addEventListener('click', openModal);
  });
  Array.prototype.forEach.call(modal.querySelectorAll('[data-close-modal]'), function (el) {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  // Form submission.
  // Set FORM_ENDPOINT to a form handler (Formspree, Netlify Forms, a serverless
  // function, etc.) to receive submissions. Until then the form validates and
  // shows the success state only.
  var FORM_ENDPOINT = form.getAttribute('data-endpoint') || '';
  var success = form.querySelector('.form_success');
  var error = form.querySelector('.form_error');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    success.hidden = true;
    error.hidden = true;
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var submit = form.querySelector('[type="submit"]');
    submit.disabled = true;

    var done = function (ok) {
      submit.disabled = false;
      if (ok) { form.reset(); success.hidden = false; } else { error.hidden = false; }
    };

    if (!FORM_ENDPOINT) { done(true); return; }

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    }).then(function (r) { done(r.ok); }).catch(function () { done(false); });
  });
})();
