// CURSOR
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// NAV ACTIVE STATE — set per-page via .active class in HTML; no JS needed.

// SMOOTH-SCROLL TO #contact WHEN ARRIVING FROM ANOTHER PAGE
if (window.location.hash === '#contact') {
  setTimeout(() => {
    const target = document.getElementById('contact');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

// CONTACT FORM — Formspree AJAX submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const success = document.getElementById('form-success');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        contactForm.reset();
        btn.style.display = 'none';
        success.style.display = 'block';
      } else {
        btn.textContent = 'Try Again';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Try Again';
      btn.disabled = false;
    }
  });
}
