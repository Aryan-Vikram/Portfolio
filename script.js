/* =====================================================
   AVS PORTFOLIO — SCRIPT.JS
   Vanilla JS. No frameworks. Well commented.
===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* =============== LOADING SCREEN =============== */
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => loadingScreen.classList.add('hidden'), 500);
  });

  /* =============== CUSTOM CURSOR GLOW =============== */
  const cursorGlow = document.getElementById('cursorGlow');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.classList.add('active');
    });
    document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
  }

  /* =============== SCROLL PROGRESS BAR =============== */
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';

    navbar.classList.toggle('scrolled', scrollTop > 40);
    backToTop.classList.toggle('show', scrollTop > 400);

    updateActiveNavLink();
  });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* =============== MOBILE NAV =============== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  /* =============== ACTIVE NAV LINK ON SCROLL =============== */
  const sections = document.querySelectorAll('main section[id]');
  function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  /* =============== THEME TOGGLE (DARK/LIGHT) =============== */
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const themeIcon = themeToggle.querySelector('i');

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }

  /* =============== TYPING ANIMATION =============== */
  const typedTextEl = document.getElementById('typedText');
  const roles = [
    'Computer Science Student',
    'Aspiring Software Engineer',
    'AI & ML Enthusiast',
    'Full Stack Web Developer',
    'Open Source Learner'
  ];
  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      charIndex--;
      typedTextEl.textContent = currentRole.substring(0, charIndex);
    } else {
      charIndex++;
      typedTextEl.textContent = currentRole.substring(0, charIndex);
    }

    let speed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }
    setTimeout(typeLoop, speed);
  }
  typeLoop();

  /* =============== SCROLL REVEAL =============== */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* =============== ANIMATED COUNTERS =============== */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    let current = 0;
    const increment = Math.max(target / 60, 1);
    const step = () => {
      current += increment;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };
    step();
  }

  /* =============== ANIMATED SKILL PROGRESS BARS =============== */
  const bars = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute('data-width') + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => barObserver.observe(bar));

  /* =============== MOUSE PARALLAX (HERO) =============== */
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    document.querySelector('.hero').addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* =============== BUTTON RIPPLE EFFECT =============== */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* =============== STAR RATING WIDGETS =============== */
  function setupStarRating(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return { getValue: () => 0, reset: () => {} };
    const stars = container.querySelectorAll('i');
    let value = 0;

    stars.forEach(star => {
      star.addEventListener('click', () => {
        value = parseInt(star.getAttribute('data-value'), 10);
        paintStars();
      });
      star.addEventListener('mouseenter', () => {
        const hoverVal = parseInt(star.getAttribute('data-value'), 10);
        stars.forEach(s => {
          s.classList.toggle('filled', parseInt(s.getAttribute('data-value'), 10) <= hoverVal);
        });
      });
    });
    container.addEventListener('mouseleave', paintStars);

    function paintStars() {
      stars.forEach(s => {
        const starVal = parseInt(s.getAttribute('data-value'), 10);
        s.classList.toggle('filled', starVal <= value);
        s.className = starVal <= value ? 'fa-solid fa-star filled' : 'fa-regular fa-star';
      });
    }

    return {
      getValue: () => value,
      reset: () => { value = 0; paintStars(); }
    };
  }

  const contactRating = setupStarRating('starRating');
  const feedbackRating = setupStarRating('fbStarRating');

  /* =============== FORM VALIDATION HELPERS =============== */
  function showError(input, message) {
    const group = input.closest('.form-group');
    group.classList.add('error');
    const errorEl = group.querySelector('.error-msg');
    if (errorEl) errorEl.textContent = message;
  }
  function clearError(input) {
    const group = input.closest('.form-group');
    group.classList.remove('error');
    const errorEl = group.querySelector('.error-msg');
    if (errorEl) errorEl.textContent = '';
  }
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* =============== CHARACTER COUNTER =============== */
  const messageInput = document.getElementById('message');
  const msgCount = document.getElementById('msgCount');
  if (messageInput) {
    messageInput.addEventListener('input', () => {
      msgCount.textContent = messageInput.value.length;
    });
  }

  /* =============== CONTACT FORM SUBMISSION =============== */
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;

    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const purpose = document.getElementById('purpose');
    const message = document.getElementById('message');
    const agree = document.getElementById('agree');

    [fullName, email, subject, purpose, message].forEach(clearError);
    clearError(agree);

    if (!fullName.value.trim()) { showError(fullName, 'Please enter your full name.'); valid = false; }
    if (!email.value.trim()) { showError(email, 'Please enter your email address.'); valid = false; }
    else if (!isValidEmail(email.value.trim())) { showError(email, 'Please enter a valid email address.'); valid = false; }
    if (!subject.value.trim()) { showError(subject, 'Please enter a subject.'); valid = false; }
    if (!purpose.value) { showError(purpose, 'Please select a purpose.'); valid = false; }
    if (!message.value.trim()) { showError(message, 'Please enter a message.'); valid = false; }
    if (!agree.checked) { showError(agree, 'Please accept to proceed.'); valid = false; }

    if (!valid) return;

    // Loading state
    submitBtn.querySelector('.btn-text').style.opacity = '0';
    submitBtn.querySelector('.btn-loader').hidden = false;
    submitBtn.disabled = true;

    // This is a front-end only site — there is no backend to send this to.
    // The payload below is built so it's ready to wire up to an email
    // service (e.g. Formspree, EmailJS) or your own API later if you want.
    const payload = {
      fullName: fullName.value.trim(),
      email: email.value.trim(),
      phone: document.getElementById('phone').value.trim(),
      company: document.getElementById('company').value.trim(),
      subject: subject.value.trim(),
      purpose: purpose.value,
      message: message.value.trim(),
      rating: contactRating.getValue()
    };
    console.log('Contact form submitted (front-end only demo):', payload);

    setTimeout(() => {
      submitBtn.querySelector('.btn-text').style.opacity = '1';
      submitBtn.querySelector('.btn-loader').hidden = true;
      submitBtn.disabled = false;
      contactForm.reset();
      contactRating.reset();
      msgCount.textContent = '0';
      showSuccessPopup('Message Sent!', "Thank you for reaching out. I'll get back to you within 24 hours.");
    }, 900);
  });

  /* =============== FEEDBACK FORM SUBMISSION =============== */
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackItems = document.getElementById('feedbackItems');
  const feedbackEmpty = document.getElementById('feedbackEmpty');

  // Load any locally stored feedback (front-end only fallback storage)
  loadStoredFeedback();

  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;
    const fbName = document.getElementById('fbName');
    const fbText = document.getElementById('fbText');

    clearError(fbName); clearError(fbText);

    if (!fbName.value.trim()) { showError(fbName, 'Please enter your name.'); valid = false; }
    if (!fbText.value.trim()) { showError(fbText, 'Please share your feedback.'); valid = false; }
    if (!valid) return;

    const entry = {
      name: fbName.value.trim(),
      text: fbText.value.trim(),
      rating: feedbackRating.getValue() || 5,
      suggestion: document.getElementById('fbSuggestion').value.trim(),
      date: new Date().toISOString()
    };

    // Front-end only: feedback is saved in this browser's localStorage
    // (see loadStoredFeedback / addFeedbackToList below), so it will only
    // be visible to the same visitor on the same device/browser.
    addFeedbackToList(entry, true);
    feedbackForm.reset();
    feedbackRating.reset();
    showSuccessPopup('Feedback Submitted!', 'Thanks for sharing your thoughts — it truly helps.');
  });

  function addFeedbackToList(entry, persist) {
    feedbackEmpty.style.display = 'none';
    const li = document.createElement('li');
    li.className = 'feedback-item';
    const stars = '★'.repeat(entry.rating) + '☆'.repeat(5 - entry.rating);
    li.innerHTML = `
      <div class="feedback-item-head">
        <strong>${escapeHTML(entry.name)}</strong>
        <span class="feedback-stars">${stars}</span>
      </div>
      <p>${escapeHTML(entry.text)}</p>
    `;
    feedbackItems.prepend(li);

    if (persist) {
      const stored = JSON.parse(localStorage.getItem('portfolio-feedback') || '[]');
      stored.unshift(entry);
      localStorage.setItem('portfolio-feedback', JSON.stringify(stored.slice(0, 20)));
    }
  }

  function loadStoredFeedback() {
    const stored = JSON.parse(localStorage.getItem('portfolio-feedback') || '[]');
    if (stored.length) {
      stored.forEach(entry => addFeedbackToList(entry, false));
    }
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* =============== SUCCESS POPUP =============== */
  const successPopup = document.getElementById('successPopup');
  const successTitle = document.getElementById('successTitle');
  const successMsg = document.getElementById('successMsg');
  const closePopup = document.getElementById('closePopup');

  function showSuccessPopup(title, msg) {
    successTitle.textContent = title;
    successMsg.textContent = msg;
    successPopup.hidden = false;
  }
  closePopup.addEventListener('click', () => successPopup.hidden = true);
  successPopup.addEventListener('click', (e) => {
    if (e.target === successPopup) successPopup.hidden = true;
  });

  /* =============== ACCORDION (FAQ) =============== */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* =============== VIEW CERTIFICATE BUTTONS =============== */
  document.querySelectorAll('.view-cert').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Add your certificate image or PDF link here, e.g. assets/certificates/google-python.pdf');
    });
  });

  /* =============== LOCAL TIME =============== */
  const localTimeEl = document.getElementById('localTime');
  function updateLocalTime() {
    if (!localTimeEl) return;
    const now = new Date();
    localTimeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  updateLocalTime();
  setInterval(updateLocalTime, 30000);

  /* =============== DOWNLOAD VCARD =============== */
  const vcardBtn = document.getElementById('vcardBtn');
  if (vcardBtn) {
    vcardBtn.addEventListener('click', () => {
      const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:Singh;Aryan;Vikram;;',
        'FN:Aryan Vikram Singh',
        'ORG:Computer Science Engineering Student',
        'TITLE:Aspiring Software Engineer',
        'EMAIL:aryan.vikram.singh@example.com',
        'TEL:+919000000000',
        'URL:https://your-username.github.io/portfolio/',
        'END:VCARD'
      ].join('\n');
      const blob = new Blob([vcard], { type: 'text/vcard' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Aryan_Vikram_Singh.vcf';
      link.click();
    });
  }

  /* =============== CHAT WIDGET =============== */
  const chatToggle = document.getElementById('chatToggle');
  const chatBox = document.getElementById('chatBox');
  const chatClose = document.getElementById('chatClose');

  chatToggle.addEventListener('click', () => chatBox.hidden = !chatBox.hidden);
  chatClose.addEventListener('click', () => chatBox.hidden = true);

  /* =============== FOOTER YEAR =============== */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* =============== LAZY LOADING FALLBACK =============== */
  if (!('loading' in HTMLImageElement.prototype)) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.src = img.getAttribute('src');
    });
  }

});