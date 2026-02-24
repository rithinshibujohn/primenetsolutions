// ==========================================
// Navigation Menu Toggle
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
      });
    });
  }
});

// ==========================================
// Smooth Scroll Enhancement
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==========================================
// Scroll Animations (Fade In)
// ==========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.bento-card, .product-card, .service-card, .benefit-card, .about-content, .contact-wrapper')
  .forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

// ==========================================
// Form Handling
// ==========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
  });
}

// ==========================================
// Navbar Background on Scroll
// ==========================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 102, 204, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// ==========================================
// Add to Cart Button Actions
// ==========================================
document.querySelectorAll('.btn-small.btn-primary').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    const productCard = this.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const price = productCard.querySelector('.price').textContent;

    // Show feedback
    const originalText = this.textContent;
    this.textContent = '✓ Added';
    this.style.background = 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)';

    setTimeout(() => {
      this.textContent = originalText;
      this.style.background = '';
    }, 2000);
  });
});

// ==========================================
// Product Cards Hover Effects
// ==========================================
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.zIndex = '10';
  });

  card.addEventListener('mouseleave', function () {
    this.style.zIndex = '1';
  });
});



// ==========================================
// Counter Animation (Optional - for stats)
// ==========================================
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ==========================================
// Keyboard Navigation Support
// ==========================================
document.addEventListener('keydown', function (e) {
  // Close mobile menu on Escape
  const navMenu = document.querySelector('.nav-menu');
  if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
  }
});

// ==========================================
// Page Load Animation
// ==========================================
window.addEventListener('load', function () {
  document.body.style.opacity = '1';
});

// ==========================================
// Hero Slideshow Logic
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
  const slideshow = document.getElementById('heroSlideshow');
  if (!slideshow) return;

  const slides = slideshow.querySelectorAll('.hs-slide');
  const dots = document.querySelectorAll('.hs-dot');
  const prevBtn = document.querySelector('.hs-prev');
  const nextBtn = document.querySelector('.hs-next');
  const fill = document.getElementById('hsProgressFill');

  if (!slides.length) return;

  const INTERVAL = 5000;
  let slideIndex = 0;
  let slideTimer, progressTimer, progressStart;

  function showSlide(n) {
    if (n >= slides.length) n = 0;
    if (n < 0) n = slides.length - 1;
    slideIndex = n;

    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');

    resetProgress();
  }

  /* --- Progress bar --- */
  function resetProgress() {
    if (fill) {
      fill.style.transition = 'none';
      fill.style.width = '0%';
      // Force reflow
      fill.offsetWidth;
      fill.style.transition = `width ${INTERVAL}ms linear`;
      fill.style.width = '100%';
    }
  }

  /* --- Auto-play --- */
  function startTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => showSlide(slideIndex + 1), INTERVAL);
    resetProgress();
  }

  function stopTimer() {
    clearInterval(slideTimer);
    if (fill) { fill.style.transition = 'none'; }
  }

  // Controls
  if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(slideIndex + 1); startTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(slideIndex - 1); startTimer(); });

  dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); startTimer(); }));

  // Pause on hover
  slideshow.addEventListener('mouseenter', stopTimer);
  slideshow.addEventListener('mouseleave', startTimer);

  // Touch swipe
  let touchStartX = 0;
  slideshow.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  slideshow.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) { showSlide(slideIndex + (diff > 0 ? 1 : -1)); startTimer(); }
  }, { passive: true });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { showSlide(slideIndex + 1); startTimer(); }
    if (e.key === 'ArrowLeft') { showSlide(slideIndex - 1); startTimer(); }
  });

  // Kick off
  startTimer();
});
