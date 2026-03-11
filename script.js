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

// ==========================================
// CHATBOT WIDGET
// ==========================================
(function () {

  // ── Knowledge Base ──────────────────────────────────────────────────────────
  const KB = [
    {
      keywords: ['hello', 'hi', 'hey', 'greet', 'good morning', 'good afternoon', 'good evening'],
      answer: "Hello! 👋 Welcome to Primenet Solutions FZC. I'm here to help you with products, services, pricing, and more. What can I assist you with today?"
    },
    {
      keywords: ['product', 'sell', 'catalog', 'offer', 'item', 'stock', 'range', 'categories'],
      answer: "We carry a wide range of products:\n\n🖥️ Computers & Servers (workstations, laptops, peripherals)\n🌐 Networking Gear (fibre-optics, routers, switches, cables)\n⚙️ Specialized Equipment (plotters, printing press, photography)\n🔒 Security Systems (CCTV, encryption hardware, access control)\n🔑 Software Licenses (business software)\n🖨️ Office Automation (photocopiers, calculators)\n\nWould you like details on any specific category?"
    },
    {
      keywords: ['computer', 'laptop', 'server', 'workstation', 'desktop', 'pc'],
      answer: "We supply enterprise-grade Computers & Servers including:\n• HP & Dell workstations and desktops\n• Business laptops from major brands\n• Rack & tower servers for high-demand applications\n• Peripherals and accessories\n\nAll at competitive wholesale pricing. 📩 Contact us at info@primenetsolutions.ae to request a quote."
    },
    {
      keywords: ['network', 'router', 'switch', 'cable', 'fibre', 'fiber', 'optic', 'wireless', 'lan', 'wan'],
      answer: "Our Networking Gear includes:\n• Cisco & D-Link routers and switches\n• Fibre-optic cables (LS Cable & more)\n• Structured cabling solutions\n• Wireless access points\n\nWe provide full end-to-end network design and implementation. 💬 Ask us for a site survey!"
    },
    {
      keywords: ['security', 'cctv', 'camera', 'surveillance', 'biometric', 'fingerprint', 'access control', 'encryption'],
      answer: "Our Security Systems portfolio includes:\n🔒 Hikvision & CP Plus CCTV cameras\n🖐️ ZKTeco biometric access control\n🔐 Hardware encryption devices\n🛡️ Fortinet firewall infrastructure\n\nAll solutions are UAE-regulatory compliant. We handle design, installation & AMC."
    },
    {
      keywords: ['plotter', 'printer', 'print', 'photocopier', 'office', 'automation', 'drawing', 'engineering'],
      answer: "We supply Specialized & Office Equipment:\n• Engineering drawing plotters\n• Printing press equipment\n• Canon & Epson large-format printers\n• Photocopiers and office automation\n\nIdeal for publishing, engineering, and industrial applications."
    },
    {
      keywords: ['software', 'license', 'microsoft', 'windows', 'office365', 'antivirus'],
      answer: "We provide genuine software licenses including:\n• Microsoft Windows & Office 365 suites\n• Business productivity software\n• Security and antivirus solutions\n\nAll licenses are fully genuine and compliant. Contact us for volume pricing."
    },
    {
      keywords: ['service', 'what do you do', 'solutions', 'support', 'amc', 'maintenance', 'installation', 'survey'],
      answer: "Our key services include:\n\n🔧 IT Infrastructure Design & Build\n📡 Networking solutions (Cisco, HP, Dell)\n🔒 Security system integration (CCTV, biometrics)\n🖥️ Server & data storage solutions\n📋 Annual Maintenance Contracts (AMC)\n🔍 Professional site surveys\n✅ UAE regulatory compliance consulting\n\nWe handle the full lifecycle from design to long-term support."
    },
    {
      keywords: ['brand', 'partner', 'manufacturer', 'vendor', 'supplier', 'cisco', 'hp', 'dell', 'hikvision', 'fortinet', 'intel', 'lenovo', 'samsung'],
      answer: "We are authorised partners for leading global brands:\n\n🔵 Cisco | HP | Dell | Lenovo\n🟠 Fortinet | Hikvision | CP Plus | ZKTeco\n🟢 Intel | AMD | Samsung | D-Link\n🔴 Canon | Epson | Microsoft | LS Cable\n\nAll products come with full manufacturer warranties."
    },
    {
      keywords: ['location', 'address', 'where', 'office', 'find', 'visit', 'sharjah', 'uae', 'dubai'],
      answer: "📍 You can find us at:\n\n**Primenet Solutions FZC**\nBusiness Centre,\nSharjah Publishing City Free Zone\nSharjah, United Arab Emirates 🇦🇪\n\nWe are a UAE-licensed & certified company operating within the Sharjah Free Zone."
    },
    {
      keywords: ['contact', 'email', 'phone', 'call', 'reach', 'get in touch', 'talk', 'message', 'whatsapp'],
      answer: "You can reach us through:\n\n📧 **Email:** info@primenetsolutions.ae\n📞 **Phone:** +971 XXXXX XXXXX\n⏰ **Hours:** Mon – Sat: 9:00 AM – 6:00 PM\n\nOr fill in the contact form on this page and we'll get back to you promptly!"
    },
    {
      keywords: ['hour', 'timing', 'open', 'close', 'working', 'time', 'available', 'when'],
      answer: "⏰ Our business hours are:\n\n**Monday – Saturday:** 9:00 AM – 6:00 PM\n**Sunday:** Closed\n\nFor urgent inquiries outside these hours, please email us at info@primenetsolutions.ae."
    },
    {
      keywords: ['price', 'cost', 'pricing', 'quote', 'rate', 'how much', 'budget', 'wholesale', 'bulk'],
      answer: "We operate as a **wholesale supplier**, meaning our pricing is volume-based and competitive.\n\nFor a custom quote, please:\n1. 📧 Email info@primenetsolutions.ae with your requirements\n2. 📋 Use the Contact form on this page\n3. 📞 Call us directly at +971 XXXXX XXXXX\n\nOur sales team will respond with a tailored proposal."
    },
    {
      keywords: ['warranty', 'guarantee', 'return', 'defect', 'broken', 'replace'],
      answer: "All products from Primenet Solutions FZC come with **full manufacturer warranties**. We work only with authorised distributors and genuine products.\n\nFor warranty claims or support, contact us at info@primenetsolutions.ae and our technical team will assist you."
    },
    {
      keywords: ['about', 'company', 'who are you', 'primenet', 'fzc', 'background', 'history'],
      answer: "**Primenet Solutions FZC** is a leading UAE-based technology integrator and wholesale IT hardware provider, licensed in the Sharjah Publishing City Free Zone.\n\nWe specialise in:\n• IT hardware & infrastructure\n• Security & surveillance systems\n• Specialized industrial equipment\n• Global brand partnerships (HP, Cisco, Dell, Hikvision & more)\n\nOur mission: Connecting Vision to Reality 🚀"
    },
    {
      keywords: ['thank', 'thanks', 'great', 'perfect', 'awesome', 'helpful', 'bye', 'goodbye'],
      answer: "You're welcome! 😊 It was a pleasure assisting you. If you ever have more questions, feel free to chat with us anytime. Have a great day! 👋"
    }
  ];

  // ── Response Engine ──────────────────────────────────────────────────────────
  const FALLBACK = "That's a great question! I'm not sure I have that specific information right now. 😊\n\nFor detailed assistance, please:\n📧 Email us: info@primenetsolutions.ae\n📞 Call: +971 XXXXX XXXXX\n\nOr scroll down to our **Contact** section and fill in the form — we'll respond quickly!";

  function getBotResponse(msg) {
    const lower = msg.toLowerCase().trim();
    let bestScore = 0;
    let bestAnswer = FALLBACK;

    KB.forEach(entry => {
      let score = 0;
      entry.keywords.forEach(kw => {
        if (lower.includes(kw)) score += kw.split(' ').length; // multi-word keywords score higher
      });
      if (score > bestScore) {
        bestScore = score;
        bestAnswer = entry.answer;
      }
    });

    return bestAnswer;
  }

  // ── DOM refs ─────────────────────────────────────────────────────────────────
  const widget = document.getElementById('chatbot-widget');
  const toggle = document.getElementById('chatbot-toggle');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const messages = document.getElementById('chatbot-messages');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const badge = document.getElementById('chatbot-badge');
  const chips = document.querySelectorAll('.chatbot-chip');

  if (!widget) return; // guard if element not found

  let isOpen = false;
  let welcomeShown = false;

  // ── Helpers ───────────────────────────────────────────────────────────────────
  function addMessage(text, role) {
    const wrap = document.createElement('div');
    wrap.className = 'cb-msg ' + role;

    if (role === 'bot') {
      const avatar = document.createElement('div');
      avatar.className = 'cb-msg-avatar';
      avatar.innerHTML = '<i class="fa-solid fa-robot"></i>';
      wrap.appendChild(avatar);
    }

    const bubble = document.createElement('div');
    bubble.className = 'cb-bubble';
    // Support simple line breaks in text
    bubble.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    wrap.appendChild(bubble);

    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
    return wrap;
  }

  function showTypingIndicator() {
    const wrap = document.createElement('div');
    wrap.className = 'cb-msg bot cb-typing';
    const avatar = document.createElement('div');
    avatar.className = 'cb-msg-avatar';
    avatar.innerHTML = '<i class="fa-solid fa-robot"></i>';
    const bubble = document.createElement('div');
    bubble.className = 'cb-bubble';
    bubble.innerHTML = '<span class="cb-dot"></span><span class="cb-dot"></span><span class="cb-dot"></span>';
    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
    return wrap;
  }

  function sendMessage(text) {
    text = text.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    const typing = showTypingIndicator();

    setTimeout(() => {
      typing.remove();
      addMessage(getBotResponse(text), 'bot');
    }, 900 + Math.random() * 400);
  }

  // ── Open / Close ─────────────────────────────────────────────────────────────
  function openChat() {
    isOpen = true;
    widget.classList.add('open');
    badge.classList.add('hidden');
    input.focus();

    if (!welcomeShown) {
      welcomeShown = true;
      setTimeout(() => {
        addMessage("👋 Hi there! I'm the Primenet Solutions virtual assistant. How can I help you today?\n\nYou can ask me about our **products**, **services**, **location**, **brands**, or **pricing** — or just click one of the quick buttons below!", 'bot');
      }, 300);
    }
  }

  function closeChat() {
    isOpen = false;
    widget.classList.remove('open');
  }

  toggle.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);

  // ── Send actions ─────────────────────────────────────────────────────────────
  sendBtn.addEventListener('click', () => sendMessage(input.value));

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input.value);
    }
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const msg = chip.getAttribute('data-msg');
      if (!isOpen) openChat();
      setTimeout(() => sendMessage(msg), welcomeShown ? 0 : 700);
    });
  });

})();

