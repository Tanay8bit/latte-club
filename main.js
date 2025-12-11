assets / js / main.js
javascript
// ==================== NAVIGATION ====================
const navToggle = document.querySelector('.nav-toggle');
const navDrawer = document.querySelector('.nav-drawer');
const navClose = document.querySelector('.nav-close');
const nav = document.querySelector('.nav');

// Open navigation drawer
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navDrawer.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    });
}

// Close navigation drawer
if (navClose) {
    navClose.addEventListener('click', () => {
        navDrawer.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
}

// Close drawer when clicking nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navDrawer.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// Hide nav on scroll down, show on scroll up
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }

    lastScroll = currentScroll;
});

// ==================== MENU TABS ====================
const menuTabs = document.querySelectorAll('.tab');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        menuTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });

        // Add active class to clicked tab
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Scroll to corresponding section
        const category = tab.getAttribute('data-category');
        const section = document.getElementById(category);
        if (section) {
            const offset = 160; // Account for sticky nav + tabs
            const bodyRect = document.body.getBoundingClientRect().top;
            const sectionRect = section.getBoundingClientRect().top;
            const sectionPosition = sectionRect - bodyRect;
            const offsetPosition = sectionPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== RESERVATION MODAL ====================
const reserveButtons = document.querySelectorAll('.reserve-btn');
const reserveModal = document.getElementById('reserveModal');
const modalClose = document.querySelector('.modal-close');

// Open modal
reserveButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        reserveModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus first input
        const firstInput = reserveModal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    });
});

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', () => {
        reserveModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal on outside click
if (reserveModal) {
    reserveModal.addEventListener('click', (e) => {
        if (e.target === reserveModal) {
            reserveModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navDrawer.classList.contains('active')) {
            navDrawer.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            navToggle.focus();
        }
        if (reserveModal && reserveModal.classList.contains('active')) {
            reserveModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ==================== FORM VALIDATION ====================
// Reservation Form
const reserveForm = document.getElementById('reserveForm');
if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation (browser handles required fields)
        const formData = new FormData(reserveForm);
        const data = Object.fromEntries(formData);

        // Here you would normally send data to a server
        console.log('Reservation submitted:', data);

        // Show success message (placeholder)
        alert('Thank you! Your reservation request has been submitted. We\'ll contact you shortly to confirm.');

        // Close modal and reset form
        reserveModal.classList.remove('active');
        document.body.style.overflow = '';
        reserveForm.reset();
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        console.log('Contact form submitted:', data);

        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
        contactForm.reset();
    });
}

// Events Form
const eventsForm = document.getElementById('eventsForm');
if (eventsForm) {
    eventsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(eventsForm);
        const data = Object.fromEntries(formData);

        console.log('Events inquiry submitted:', data);

        alert('Thank you for your event inquiry! Our events team will contact you within 2 business days.');
        eventsForm.reset();
    });
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== ANIMATION HOOKS ====================
// These are placeholder functions where you can add GSAP or other animation libraries

// Example: Scroll-triggered animations
// Uncomment and modify when using GSAP:
/*
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero animation
  gsap.from('.hero h1', {
    duration: 1.2,
    y: 80,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.4
  });
  
  // Card grid stagger
  gsap.from('.card', {
    scrollTrigger: {
      trigger: '.card-grid',
      start: 'top 75%'
    },
    opacity: 0,
    y: 60,
    stagger: 0.15,
    duration: 0.9,
    ease: 'power3.out'
  });
  
  // Section reveals
  gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: 'power3.out'
    });
  });
}
*/

// Vanilla JS scroll reveal (simple fallback)
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe sections for fade-in effect
    document.querySelectorAll('.section, .card, .menu-item, .roast-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
};

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
} else {
    observeElements();
}



