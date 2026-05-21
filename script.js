/* ================================================================
   ASTRO LIGHTING — script.js
   All the interactive behaviour for the website.
================================================================ */


/* ----------------------------------------------------------------
   HERO SLIDESHOW
   Automatically cycles through the 3 hero slides every 5 seconds.
   Clicking a dot jumps directly to that slide.
---------------------------------------------------------------- */

// Keep track of which slide is currently showing (0 = first slide)
let currentSlide = 0;

// Grab all slide elements and dot indicators from the HTML
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.hero-dot');

/**
 * goSlide(n) — switch to slide number n
 * Called by the dot onclick="goSlide(0)" in the HTML,
 * and also by the auto-rotate timer below.
 */
function goSlide(n) {
  // Remove .active from the current slide and dot
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  // Update the tracker
  currentSlide = n;

  // Add .active to the new slide and dot
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

// Auto-rotate: every 5000ms (5 seconds), go to the next slide
// If we're on the last slide, wrap back to slide 0 using modulo (%)
setInterval(function () {
  const nextSlide = (currentSlide + 1) % slides.length;
  goSlide(nextSlide);
}, 4000);


/* ----------------------------------------------------------------
   SCROLL REVEAL ANIMATION
   Watches elements with class .reveal.
   When they scroll into view, adds .visible which triggers
   the CSS fade-up animation defined in style.css.
---------------------------------------------------------------- */

// Grab every element that should animate in on scroll
const revealElements = document.querySelectorAll('.reveal');

// IntersectionObserver fires a callback when an element enters/leaves the viewport
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    // entry.isIntersecting = true when the element is visible on screen
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // triggers CSS animation
      revealObserver.unobserve(entry.target); // stop watching once revealed
    }
  });
}, {
  threshold: 0.08 // trigger when 8% of the element is visible
});

// Start observing every .reveal element
revealElements.forEach(function (el) {
  revealObserver.observe(el);
});


/* ----------------------------------------------------------------
   NAV SHADOW ON SCROLL
   Adds a subtle drop shadow to the nav bar once the user scrolls
   down, so it looks elevated above the page content.
---------------------------------------------------------------- */

const nav = document.getElementById('mainNav');

window.addEventListener('scroll', function () {
  if (window.scrollY > 10) {
    // User has scrolled down — add shadow
    nav.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
  } else {
    // Back at the top — remove shadow
    nav.style.boxShadow = 'none';
  }
});


/* ----------------------------------------------------------------
   CAROUSEL ARROW BUTTONS (Intro section)
   The ‹ › arrows next to the product tiles scroll through them.
   This is a simple manual scroll — not a full carousel library.
---------------------------------------------------------------- */

const prevBtn  = document.getElementById('prevBtn');
const nextBtn  = document.getElementById('nextBtn');
const prodTiles = document.querySelector('.prod-tiles');

// Scroll left when ‹ is clicked
if (prevBtn) {
  prevBtn.addEventListener('click', function () {
    prodTiles.scrollBy({ left: -200, behavior: 'smooth' });
  });
}

// Scroll right when › is clicked
if (nextBtn) {
  nextBtn.addEventListener('click', function () {
    prodTiles.scrollBy({ left: 200, behavior: 'smooth' });
  });
}


/* ----------------------------------------------------------------
   MOBILE NAV TOGGLE (optional — extend this for a full hamburger)
   On small screens the nav links are hidden via CSS.
   If you add a hamburger button later, wire it up here.
---------------------------------------------------------------- */

// Example (uncomment if you add a button with id="hamburger"):
//
// const hamburger = document.getElementById('hamburger');
// const navLinks  = document.querySelector('.nav-links');
//
// hamburger.addEventListener('click', function () {
//   navLinks.classList.toggle('open');  // add CSS for .nav-links.open { display: flex; }
// });
