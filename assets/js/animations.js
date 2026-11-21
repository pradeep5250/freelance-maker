(function () {
  var selectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
  var nodes = document.querySelectorAll(selectors);
  if (nodes.length) {
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      nodes.forEach(function (el) { io.observe(el); });

      requestAnimationFrame(function () {
        nodes.forEach(function (el) {
          if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
            el.classList.add('in');
          }
        });
      });
    }
  }

  // Keep category media frames compact (not overly tall)
  function syncMobileRatio() {
    var w = window.innerWidth;
    var phones = document.querySelectorAll('.phone-frame');
    phones.forEach(function (el) {
      el.style.aspectRatio = '3 / 4';
      el.style.maxHeight = w < 640 ? '380px' : (w < 1024 ? '420px' : '440px');
    });

    var medias = document.querySelectorAll('.media-frame');
    medias.forEach(function (el) {
      el.style.aspectRatio = '4 / 3';
      el.style.maxHeight = w < 768 ? '320px' : (w < 1024 ? '380px' : '400px');
    });
  }

  syncMobileRatio();
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(syncMobileRatio, 120);
  });
  window.addEventListener('orientationchange', function () {
    setTimeout(syncMobileRatio, 200);
  });

  // Mobile navbar toggle
  var toggle = document.getElementById('navToggle');
  var panel = document.getElementById('mobileNav');
  if (toggle && panel) {
    function setOpen(open) {
      toggle.classList.toggle('is-open', open);
      panel.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    }
    toggle.addEventListener('click', function () {
      setOpen(!panel.classList.contains('is-open'));
    });
    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) setOpen(false);
    });
  }
})();
