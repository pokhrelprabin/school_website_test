// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navlinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Auto-scrolling Carousel
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.getElementById('carouselDots');
let currentSlide = 0;
let autoSlideInterval;

function createDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(index) {
  if (!track) return;
  currentSlide = index;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  if (slides.length === 0) return;
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
}

function startAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
}

if (track && slides.length > 0) {
  createDots();
  startAutoSlide();
  
  const carouselContainer = document.getElementById('carouselContainer');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
  }
}

// Active Navigation Highlight on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  const scrollPosition = window.scrollY + 150;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      current = section.getAttribute('id');
    }
  });
  
  navLinkItems.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Scroll Reveal Animation with Intersection Observer
const revealElements = document.querySelectorAll('.stream-card, .facility-card, .about-feature, .team-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  revealObserver.observe(el);
});

// Close mobile menu when clicking a link
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
    }
  });
});

// Smooth scroll for anchor links with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const navHeight = document.querySelector('nav')?.offsetHeight || 76;
      const targetPosition = targetElement.offsetTop - navHeight - 10;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});