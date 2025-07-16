// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.updateThemeToggleIcon();
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeToggleIcon();
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeToggleIcon() {
        const icon = themeToggle.querySelector('i');
        if (this.theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        hamburger.addEventListener('click', () => this.toggleMenu());
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Handle scroll to update active nav link
        window.addEventListener('scroll', () => this.updateActiveNavLink());
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }

    closeMenu() {
        this.isMenuOpen = false;
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu after clicking
        if (this.isMenuOpen) {
            this.closeMenu();
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
}

// Scroll Reveal Animation Manager
class ScrollRevealManager {
    constructor() {
        this.revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        this.init();
    }

    init() {
        this.observeElements();
        // Initial check for elements already in view
        this.checkElementsInView();
    }

    observeElements() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, options);

        this.revealElements.forEach(element => {
            observer.observe(element);
        });
    }

    checkElementsInView() {
        this.revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
}

// Scroll Progress Indicator
class ScrollProgressManager {
    constructor() {
        this.createProgressBar();
        this.init();
    }

    createProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-indicator';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);
        
        this.progressBar = progressBar;
    }

    init() {
        window.addEventListener('scroll', () => this.updateProgress());
    }

    updateProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        this.progressBar.style.width = `${scrolled}%`;
    }
}

// Contact Form Manager
class ContactFormManager {
    constructor() {
        this.init();
    }

    init() {
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            this.showMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Add styles
        messageElement.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 10px;
            font-weight: 500;
            text-align: center;
            ${type === 'success' 
                ? 'background: #dcfce7; color: #166534; border: 1px solid #bbf7d0;' 
                : 'background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;'
            }
        `;

        contactForm.appendChild(messageElement);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// Smooth Animations and Effects
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        // Add stagger effect to skills
        this.staggerSkills();
        
        // Add parallax effect to hero background
        this.addParallaxEffect();
        
        // Add floating animation to avatar
        this.addFloatingAnimation();
    }

    staggerSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }

    addParallaxEffect() {
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroBackground.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    addFloatingAnimation() {
        const avatar = document.querySelector('.avatar');
        if (avatar) {
            let start = null;
            
            function animate(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                
                const y = Math.sin(progress * 0.002) * 5;
                avatar.style.transform = `translateY(${y}px)`;
                
                requestAnimationFrame(animate);
            }
            
            requestAnimationFrame(animate);
        }
    }
}

// Loading Manager
class LoadingManager {
    constructor() {
        this.createLoader();
        this.init();
    }

    createLoader() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        loadingDiv.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(loadingDiv);
        this.loader = loadingDiv;
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoader();
            }, 1000);
        });
    }

    hideLoader() {
        this.loader.classList.add('hidden');
        setTimeout(() => {
            this.loader.remove();
        }, 500);
    }
}

// Utility Functions
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new LoadingManager();
    new ThemeManager();
    new NavigationManager();
    new ScrollRevealManager();
    new ScrollProgressManager();
    new ContactFormManager();
    new AnimationManager();

    // Add smooth scrolling to all anchor links
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

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        setTimeout(() => {
            heroTitle.innerHTML = originalText;
            heroTitle.style.animation = 'fadeInUp 1s ease forwards';
        }, 1500);
    }

    // Performance optimization: Use passive listeners for scroll events
    const scrollHandler = Utils.throttle(() => {
        // Any scroll-based optimizations can be added here
    }, 16);

    window.addEventListener('scroll', scrollHandler, { passive: true });
});

// Handle resize events
window.addEventListener('resize', Utils.debounce(() => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.getElementById('hamburger');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
}, 250));

// Preload critical images
const criticalImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop'
];

criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Export for potential use in other scripts
window.PortfolioApp = {
    ThemeManager,
    NavigationManager,
    ScrollRevealManager,
    ContactFormManager,
    Utils
};