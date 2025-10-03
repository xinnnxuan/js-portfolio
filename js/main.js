// Main JavaScript file for FREEGAME portfolio

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupSmoothScrolling();
    setupScrollAnimations();
    setupNavigation();
    setupInteractiveElements();
    setupParallaxEffects();
    setupImageLoading();
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            // If target element doesn't exist, let the link work normally
        });
    });
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Navigation functionality
function setupNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Active navigation link
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Interactive elements
function setupInteractiveElements() {
    // CTA Button hover effects
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        ctaButton.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Player card rotation on hover
    const playerCard = document.querySelector('.player-card');
    if (playerCard) {
        playerCard.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(0deg) scale(1.02)';
        });
        
        playerCard.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(2deg) scale(1)';
        });
    }
    
    // Basketball spin animation
    const basketball = document.querySelector('.basketball-image');
    if (basketball) {
        basketball.addEventListener('mouseenter', function() {
            this.style.animation = 'spin 2s linear infinite';
        });
        
        basketball.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    }
    
    // Forward momentum button
    const forwardMomentum = document.querySelector('.forward-momentum');
    if (forwardMomentum) {
        forwardMomentum.addEventListener('click', function() {
            // Scroll to principles section
            const principlesSection = document.querySelector('.principles-section');
            if (principlesSection) {
                principlesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Parallax effects
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-image, .basketball-image');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Image loading and lazy loading
function setupImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Utility functions
function debounce(func, wait) {
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

function throttle(func, limit) {
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

// Performance optimization
const optimizedScrollHandler = throttle(function() {
    // Scroll-based animations and effects
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Update any scroll-dependent elements
    updateScrollElements(scrollTop, windowHeight);
}, 16); // ~60fps

function updateScrollElements(scrollTop, windowHeight) {
    // Add any scroll-based updates here
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const opacity = Math.max(0, 1 - (scrollTop / heroHeight));
        heroSection.style.opacity = opacity;
    }
}

// Event listeners
window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('resize', debounce(function() {
    // Handle resize events
    updateLayout();
}, 250));

function updateLayout() {
    // Update layout on resize
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initialize layout
updateLayout();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .loaded {
        opacity: 1;
    }
    
    .header {
        transition: transform 0.3s ease;
    }
    
    .cta-button {
        transition: all 0.3s ease;
    }
    
    .player-card {
        transition: transform 0.3s ease;
    }
    
    .basketball-image {
        transition: animation 0.3s ease;
    }
`;
document.head.appendChild(style);

// Export functions for potential use in other modules
window.FreegameApp = {
    initializeApp,
    setupSmoothScrolling,
    setupScrollAnimations,
    setupNavigation,
    setupInteractiveElements,
    setupParallaxEffects,
    setupImageLoading,
    debounce,
    throttle
};
