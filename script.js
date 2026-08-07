const header = document.getElementById('header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const transitionBar = document.getElementById('transitionBar');
const closeTransition = document.getElementById('closeTransition');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

if (localStorage.getItem('richline-transition-dismissed') === 'true') {
  transitionBar.hidden = true;
  document.body.classList.add('transition-hidden');
}

closeTransition.addEventListener('click', () => {
  transitionBar.hidden = true;
  document.body.classList.add('transition-hidden');
  localStorage.setItem('richline-transition-dismissed', 'true');
});

document.getElementById('contactForm').addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('formStatus').textContent = 'Thank you. Our team will contact you.';
});

const statNumbers = document.querySelectorAll('.stat-number[data-count]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const formatStat = (value, suffix) => `${new Intl.NumberFormat('en-IN').format(value)}${suffix}`;

const animateStat = (element) => {
  const target = Number(element.dataset.count);
  const suffix = element.dataset.suffix || '';
  if (reducedMotion) {
    element.textContent = formatStat(target, suffix);
    return;
  }

  const startedAt = performance.now();
  const duration = 1100;
  const update = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = formatStat(Math.round(target * eased), suffix);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
};

if ('IntersectionObserver' in window) {
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      statNumbers.forEach(animateStat);
      observer.disconnect();
    });
  }, { threshold: 0.3 });
  statsObserver.observe(document.getElementById('glance'));
} else {
  statNumbers.forEach(animateStat);
}
