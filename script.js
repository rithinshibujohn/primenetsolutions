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

  const slides = slideshow.querySelectorAll('.slide');
  const dots = slideshow.querySelectorAll('.dot');
  const prevBtn = slideshow.querySelector('.slide-prev');
  const nextBtn = slideshow.querySelector('.slide-next');

  if (slides.length === 0) return;

  let slideIndex = 0;
  let slideInterval;
  const intervalTime = 5000; // 5 seconds per slide

  // Function to show a specific slide
  function showSlide(n) {
    // Wrap around index
    if (n >= slides.length) slideIndex = 0;
    else if (n < 0) slideIndex = slides.length - 1;
    else slideIndex = n;

    // Update classes
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
  }

  // Next/Prev controls
  function nextSlide() {
    showSlide(slideIndex + 1);
  }

  function prevSlide() {
    showSlide(slideIndex - 1);
  }

  // Event Listeners
  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetInterval();
    });
  });

  // Autoplay Logic
  function startInterval() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  // Pause on hover
  slideshow.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  slideshow.addEventListener('mouseleave', () => {
    startInterval();
  });

  // Start autoplay
  startInterval();
});