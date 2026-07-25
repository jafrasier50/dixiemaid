(function () {
  var root = document.documentElement;
  root.classList.add('js');
  if (new URLSearchParams(location.search).has('capture')) {
    root.classList.add('capture');
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.querySelector('.site-header');
  var menu = document.getElementById('menu');
  var fab = document.querySelector('.menu-fab');

  // Header shadow once the page moves
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!('IntersectionObserver' in window)) return;

  // Scroll reveals — enhancement only; markup is fully visible without JS
  if (!reduced && !root.classList.contains('capture')) {
    var targets = document.querySelectorAll(
      '.board, .board-photo, .story-photo, .story-copy, .quote-row blockquote, .findus-copy, .hours'
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    targets.forEach(function (el, i) {
      el.classList.add('rv');
      el.style.setProperty('--rv-delay', (i % 3) * 0.08 + 's');
      io.observe(el);
    });
  }

  // Chip-bar: quick-jump nav with an "active" indicator.
  // Scroll-driven auto-highlighting only makes sense in the single-column
  // (mobile) menu layout, where boards appear in one strict top-to-bottom
  // order matching the chip order. On desktop the menu grid lays boards out
  // in two CSS columns (masonry), so two unrelated boards can be on screen
  // at the same vertical position at once — IntersectionObserver has no
  // notion of column, so it flips "active" to whichever column's board
  // happens to intersect the tracking band first, out of chip order. So on
  // desktop we only set "active" on click, never from scroll position.
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip-bar a'));
  var boards = chips
    .map(function (chip) { return document.querySelector(chip.getAttribute('href')); })
    .filter(Boolean);

  if (chips.length) chips[0].classList.add('active');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.toggle('active', c === chip); });
    });
  });

  var singleColumn = window.matchMedia('(max-width: 760px)');
  var hasScrolled = false;
  window.addEventListener('scroll', function () { hasScrolled = true; }, { passive: true, once: true });

  var spy = new IntersectionObserver(function (entries) {
    if (!singleColumn.matches) return;
    entries.forEach(function (entry) {
      if (!entry.isIntersecting || !hasScrolled) return;
      chips.forEach(function (chip) {
        var on = chip.getAttribute('href') === '#' + entry.target.id;
        chip.classList.toggle('active', on);
        if (on) {
          chip.parentNode.scrollTo({
            left: chip.offsetLeft - 16,
            behavior: reduced ? 'auto' : 'smooth'
          });
        }
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  boards.forEach(function (b) { spy.observe(b); });

  // Floating "Menu" pill — appears once you've scrolled past the menu
  if (fab && menu) {
    fab.hidden = false;
    var fabIO = new IntersectionObserver(function (entries) {
      var e = entries[0];
      var below = !e.isIntersecting && e.boundingClientRect.top < 0;
      fab.classList.toggle('show', below);
    }, { threshold: 0 });
    fabIO.observe(menu);
  }
})();
