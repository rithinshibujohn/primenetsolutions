/* PNS Landing Page — Interactive Scripts */

/* ------------------------------------------------------------------ */
/* Mobile Navigation Toggle                                             */
/* ------------------------------------------------------------------ */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));

  if (!expanded) {
    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
  } else {
    mobileMenu.style.maxHeight = '0';
  }
}

menuBtn.addEventListener('click', toggleMobileMenu);

/* Auto-close mobile menu when a link is clicked */
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.style.maxHeight = '0';
  });
});

/* ------------------------------------------------------------------ */
/* FAQ Accordion                                                         */
/* ------------------------------------------------------------------ */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const body = btn.nextElementSibling;
  const icon = btn.querySelector('i');
  const isOpen = body.style.maxHeight && body.style.maxHeight !== '0px';

  // Close all others (optional — remove this block to allow multiple open)
  document.querySelectorAll('.faq-item').forEach(other => {
    if (other !== item) {
      const otherBody = other.querySelector('.faq-body');
      const otherIcon = other.querySelector('.faq-btn i');
      if (otherBody) {
        otherBody.style.maxHeight = '0px';
        otherBody.style.paddingBottom = '0';
      }
      if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
    }
  });

  if (isOpen) {
    body.style.maxHeight = '0px';
    body.style.paddingBottom = '0';
    icon.style.transform = 'rotate(0deg)';
    btn.setAttribute('aria-expanded', 'false');
  } else {
    body.style.maxHeight = body.scrollHeight + 'px';
    body.style.paddingBottom = '';
    icon.style.transform = 'rotate(45deg)';
    btn.setAttribute('aria-expanded', 'true');
  }
}

/* Initialize icons */
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.setAttribute('aria-expanded', 'false');
});

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */
const modal = document.getElementById('contactModal');

function openModal() {
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  // Focus the first input for accessibility
  setTimeout(() => {
    const emailInput = document.getElementById('email');
    if (emailInput) emailInput.focus();
  }, 50);
}

function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

/* Keyboard: close modal on Escape */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

function submitForm() {
  const feedback = document.getElementById('formFeedback');
  feedback.classList.remove('hidden');
  setTimeout(() => {
    closeModal();
    feedback.classList.add('hidden');
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
  }, 1200);
}

/* ------------------------------------------------------------------ */
/* Chatbot Widget                                                         */
/* ------------------------------------------------------------------ */
function toggleChat() {
  const win = document.getElementById('chatWindow');
  if (win.classList.contains('hidden')) {
    win.classList.remove('hidden');
    setTimeout(() => {
      win.classList.remove('scale-95', 'opacity-0');
      win.classList.add('scale-100', 'opacity-100');
    }, 10);
    document.getElementById('chatInput').focus();
  } else {
    win.classList.remove('scale-100', 'opacity-100');
    win.classList.add('scale-95', 'opacity-0');
    setTimeout(() => win.classList.add('hidden'), 300);
  }
}

function quickChat(topic) {
  const input = document.getElementById('chatInput');
  input.value = topic;
  sendChat();
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  const container = document.getElementById('chatMessages');
  if (!msg) return;

  // User message
  container.innerHTML += `<div class="bg-gradient-to-r from-accentCyan to-accentViolet rounded-2xl rounded-tr-md px-4 py-3 text-white max-w-[85%] ml-auto shadow-lg shadow-accentCyan/10"><span class="text-xs opacity-70 block mb-0.5">You</span>${msg}</div>`;
  input.value = '';
  container.scrollTop = container.scrollHeight;

  // Bot response
  setTimeout(() => {
    const responses = [
      "Thanks for reaching out. Our team specializes in networking, security, biometrics, and server infrastructure across the UAE.",
      "We'd love to help. Would you like to discuss site surveys, AMC contracts, or a new technology deployment?",
      "PrimeNet works with Cisco, HIKVISION, EPSON, D-Link, Microsoft, AMD, and Lenovo. How can we assist your project?"
    ];
    const reply = responses[Math.floor(Math.random() * responses.length)];
    container.innerHTML += `<div class="bg-slateCard rounded-2xl rounded-tl-md px-4 py-3 text-textSub max-w-[85%] shadow-md"><span class="text-xs opacity-50 block mb-0.5">PrimeNet Assistant</span>${reply}</div>`;
    container.scrollTop = container.scrollHeight;
  }, 600);
}

/* ------------------------------------------------------------------ */
/* 3D Three.js Background Animation                                      */
/* ------------------------------------------------------------------ */
(function init3D() {
  const canvas = document.getElementById('threeCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 25;

  // Particle geometry (network nodes)
  const particleCount = 120;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 30;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x06b6d4,
    size: 0.35,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.7,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Connecting lines
  const lineMat = new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.15 });
  const lineGeom = new THREE.BufferGeometry();
  lineGeom.setAttribute('position', geometry.attributes.position.clone());
  const lineMesh = new THREE.Line(lineGeom, lineMat);
  scene.add(lineMesh);

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;

    // Rotate points slowly
    points.rotation.y = time * 0.2;
    points.rotation.x = Math.sin(time * 0.1) * 0.1;

    // Gentle mouse tilt
    points.rotation.y += mouseX * 0.02;
    points.rotation.x += mouseY * 0.02;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
