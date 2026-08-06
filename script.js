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
