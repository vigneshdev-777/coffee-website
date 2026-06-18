/* ============================================================
   CAROUSEL — Vignesh Chettiyar
   Global (non-module) script — functions available immediately
   ============================================================ */

var currentSlide  = 0;
var totalSlides   = 3;
var autoplayTimer = null;
var AUTOPLAY_MS   = 7000;

/* ── activate a slide ──────────────────────────────────── */
function goToSlide(index) {
  var slides = document.querySelectorAll('.carousel-slide');
  var dots   = document.querySelectorAll('.pagination-dot');

  if (!slides.length) return;

  /* bounds check */
  index = ((index % totalSlides) + totalSlides) % totalSlides;

  /* remove active from current */
  slides[currentSlide].classList.remove('active');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

  /* set new slide */
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');

  /* restart autoplay */
  stopAutoplay();
  setTimeout(startAutoplay, 3000);
}

/* ── navigation ────────────────────────────────────────── */
function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

/* ── autoplay ──────────────────────────────────────────── */
function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(function () {
    goToSlide(currentSlide + 1);
  }, AUTOPLAY_MS);
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

/* ── init ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  /* ensure first slide is active */
  var slides = document.querySelectorAll('.carousel-slide');
  var dots   = document.querySelectorAll('.pagination-dot');

  slides.forEach(function (s, i) { s.classList.toggle('active', i === 0); });
  dots.forEach(function (d, i) { d.classList.toggle('active', i === 0); });

  /* keyboard support */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft')  prevSlide();
  });

  /* touch / swipe support */
  var touchStartX = 0;
  var hero = document.querySelector('.hero-carousel');
  if (hero) {
    hero.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        if (dx < 0) nextSlide(); else prevSlide();
      }
    }, { passive: true });
  }

  startAutoplay();
});
