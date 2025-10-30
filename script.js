// ===== GLOBAL VARIABLES =====
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const themeToggle = document.getElementById('theme-toggle');
const navLinks = document.querySelectorAll('.nav-link');

// ===== MODERN SMOOTH SCROLL ANIMATIONS =====
class ModernScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    this.createObserver();
    this.addParallaxEffects();
    this.setupSmoothScrolling();
  }

  createObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Add staggered animations for child elements
          const children = entry.target.querySelectorAll('.stagger-animation');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-in');
            }, index * 100);
          });
        }
      });
    }, this.observerOptions);

    // Observe all sections and animation targets
    const animationTargets = document.querySelectorAll('section, .project-item, .skill-item, .timeline-item');
    animationTargets.forEach(target => observer.observe(target));
  }

  addParallaxEffects() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  setupSmoothScrolling() {
    // Enhanced smooth scrolling for navigation links
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
  }
}

// ===== THEME MANAGEMENT =====
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.setTheme(this.theme);
    this.bindEvents();
  }

  setTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateThemeIcon();
  }

  toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (this.theme === 'light') {
      icon.className = 'fas fa-moon';
    } else {
      icon.className = 'fas fa-sun';
    }
  }

  bindEvents() {
    themeToggle.addEventListener('click', () => this.toggleTheme());
  }
}

// ===== NAVIGATION MANAGEMENT =====
class NavigationManager {
  constructor() {
    this.isMenuOpen = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.handleScroll();
  }

  bindEvents() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => this.toggleMenu());

    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
        this.setActiveLink(link);
      });
    });

    // Handle scroll for navbar styling and active link detection
    window.addEventListener('scroll', () => {
      this.handleScroll();
      this.detectActiveSection();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.isMenuOpen = false;
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleScroll() {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }

    // Update for dark theme
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
      } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
      }
    }
  }

  detectActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.setActiveLinkById(sectionId);
      }
    });
  }

  setActiveLinkById(sectionId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }

  setActiveLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }
}

// ===== SMOOTH SCROLLING =====
class SmoothScroller {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          this.scrollToElement(targetElement);
        }
      });
    });
  }

  scrollToElement(element) {
    const headerOffset = 80;
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// ===== ANIMATIONS =====
class AnimationManager {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.animateOnLoad();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, this.observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .education-card, .experience-item, .contact-item');
    animateElements.forEach(el => {
      el.classList.add('animate-element');
      observer.observe(el);
    });
  }

  animateOnLoad() {
    // Animate hero section on load
    window.addEventListener('load', () => {
      const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-social');
      heroElements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 200);
      });
    });
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.debounceScrollEvents();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  debounceScrollEvents() {
    let timeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (originalScrollHandler) originalScrollHandler();
      }, 10);
    });
  }
}

// ===== FORM HANDLING =====
class FormManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupContactForm();
  }

  setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmission(contactForm);
      });
    }
  }

  handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
  }

  showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }
}

// ===== UTILITIES =====
class Utilities {
  static throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  static debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  static isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
  }

  setupKeyboardNavigation() {
    // Handle keyboard navigation for mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navigationManager.closeMenu();
        hamburger.focus();
      }
    });

    // Tab trap in mobile menu
    navMenu.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && navMenu.classList.contains('active')) {
        const focusableElements = navMenu.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  setupFocusManagement() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(el => {
      el.addEventListener('focus', () => {
        el.classList.add('focus-visible');
      });
      
      el.addEventListener('blur', () => {
        el.classList.remove('focus-visible');
      });
    });
  }

  setupScreenReaderSupport() {
    // Add ARIA labels where needed
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Update ARIA states
    hamburger.addEventListener('click', () => {
      const isExpanded = navMenu.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });
  }
}

// ===== EASTER EGGS & FUN FEATURES =====
class EasterEggs {
  constructor() {
    this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    this.userInput = [];
    this.init();
  }

  init() {
    this.setupKonamiCode();
    this.setupClickCounter();
  }

  setupKonamiCode() {
    document.addEventListener('keydown', (e) => {
      this.userInput.push(e.code);
      
      if (this.userInput.length > this.konamiCode.length) {
        this.userInput.shift();
      }
      
      if (this.userInput.join(',') === this.konamiCode.join(',')) {
        this.activateEasterEgg();
        this.userInput = [];
      }
    });
  }

  setupClickCounter() {
    let clickCount = 0;
    const logo = document.querySelector('.nav-logo');
    
    logo.addEventListener('click', (e) => {
      clickCount++;
      if (clickCount === 7) {
        this.showSecretMessage();
        clickCount = 0;
      }
    });
  }

  activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }

  showSecretMessage() {
    const message = document.createElement('div');
    message.innerHTML = '🎉 You found the secret! Thanks for exploring my portfolio!';
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      color: white;
      padding: 20px;
      border-radius: 15px;
      font-size: 18px;
      z-index: 10000;
      animation: bounce 1s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all managers
  window.themeManager = new ThemeManager();
  window.navigationManager = new NavigationManager();
  window.smoothScroller = new SmoothScroller();
  window.animationManager = new AnimationManager();
  window.scrollAnimationManager = new ScrollAnimationManager();
  window.modernScrollAnimations = new ModernScrollAnimations(); // New artistic animations
  window.performanceManager = new PerformanceManager();
  window.formManager = new FormManager();
  window.accessibilityManager = new AccessibilityManager();
  window.easterEggs = new EasterEggs();
  
  // Initialize email enhancements
  enhanceEmailLinks();

  // Add initial animation styles
  const style = document.createElement('style');
  style.textContent = `
    .hero-title,
    .hero-subtitle,
    .hero-description,
    .hero-buttons,
    .hero-social {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }

    .animate-element {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }

    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .focus-visible {
      outline: 2px solid var(--primary-color) !important;
      outline-offset: 2px !important;
    }

    .message {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      animation: slideInRight 0.3s ease;
    }

    .message-success {
      background-color: var(--secondary-color);
    }

    .message-error {
      background-color: #ef4444;
    }

    .message-info {
      background-color: var(--primary-color);
    }

    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .animate-element,
      .hero-title,
      .hero-subtitle,
      .hero-description,
      .hero-buttons,
      .hero-social {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  // Log initialization
  console.log('🚀 Portfolio website initialized successfully!');
  console.log('💡 Try the Konami code for a surprise!');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('An error occurred:', e.error);
  // You could send this to an error reporting service
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // You could send this to an error reporting service
});

// ===== EMAIL LINK ENHANCEMENT =====
function enhanceEmailLinks() {
  // Add click handler to detect if mailto fails on Windows
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Add a small delay to check if email client opened
      setTimeout(() => {
        // If user is still on the page after clicking mailto, show alternatives
        if (document.hasFocus() && navigator.platform.includes('Win')) {
          // Windows users might need alternative options
          console.log('Mailto link clicked on Windows - alternatives available');
        }
      }, 1000);
    });
  });
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimationManager {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    this.createObserver();
    this.initScrollAnimations();
    this.handleNavbarScroll();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, this.observerOptions);
  }

  initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => {
      this.observer.observe(el);
    });
  }

  handleNavbarScroll() {
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      const scrolled = window.scrollY > 50;
      
      if (scrolled) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ThemeManager,
    NavigationManager,
    SmoothScroller,
    AnimationManager,
    ScrollAnimationManager,
    Utilities
  };
}