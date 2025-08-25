// ===== ANIMATIONS & INTERACTIONS =====

document.addEventListener('DOMContentLoaded', function() {
    // ===== SCROLL TRIGGERED ANIMATIONS =====
    const scrollTriggers = document.querySelectorAll('.scroll-trigger');
    const staggerItems = document.querySelectorAll('.stagger-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    scrollTriggers.forEach(trigger => {
        scrollObserver.observe(trigger);
    });
    
    // ===== NAVIGATION PROGRESS BAR =====
    const navProgressBar = document.getElementById('navProgressBar');
    
    function updateNavProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (navProgressBar) {
            navProgressBar.style.width = scrollPercent + '%';
        }
    }
    
    window.addEventListener('scroll', updateNavProgress);
    
    // ===== MAGNETIC BUTTON EFFECTS =====
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
    
    // ===== SMOOTH SCROLLING =====
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNavProgress();
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll, { passive: true });
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // ===== REDUCED MOTION SUPPORT =====
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.body.classList.add('reduced-motion');
        
        // Remove all CSS animations
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== INITIALIZATION =====
    // Trigger initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Update progress bar on page load
    updateNavProgress();
    
    // ===== RESUME MODAL =====
    const resumeBtn = document.getElementById('resumeBtn');
    const resumeModal = document.getElementById('resume-modal');
    const closeResumeModal = document.getElementById('closeResumeModal');
    
    if (resumeBtn && resumeModal && closeResumeModal) {
        // Open modal
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resumeModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
        
        // Close modal
        closeResumeModal.addEventListener('click', function() {
            resumeModal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        });
        
        // Close modal when clicking outside
        resumeModal.addEventListener('click', function(e) {
            if (e.target === resumeModal) {
                resumeModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && resumeModal.classList.contains('show')) {
                resumeModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ===== SCROLL INDICATORS =====
    const scrollDots = document.querySelectorAll('.scroll-dot');
    
    function updateScrollIndicators() {
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                scrollDots.forEach(dot => dot.classList.remove('active'));
                if (scrollDots[index]) {
                    scrollDots[index].classList.add('active');
                }
            }
        });
    }
    
    // Add click functionality to scroll dots
    scrollDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            const targetSection = sections[index];
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update scroll indicators on scroll
    window.addEventListener('scroll', updateScrollIndicators);
    
    // ===== CUSTOM CURSOR =====
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    if (cursorDot && cursorRing) {
        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        let isAnimating = false;
        let animationId = null;
        
        // Throttled mouse move handler
        const throttledMouseMove = throttle((e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Update dot immediately - center it on mouse position
            cursorDot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
            
            // Start ring animation only when needed
            if (!isAnimating) {
                isAnimating = true;
                animateRing();
            }
        }, 16); // ~60fps
        
        document.addEventListener('mousemove', throttledMouseMove);
        
        // Optimized ring animation
        function animateRing() {
            const deltaX = mouseX - ringX;
            const deltaY = mouseY - ringY;
            
            // Stop animation if ring is close enough to cursor
            if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) {
                isAnimating = false;
                return;
            }
            
            // Smooth interpolation with adaptive easing
            const easing = Math.min(0.2, Math.max(0.05, (Math.abs(deltaX) + Math.abs(deltaY)) / 100));
            ringX += deltaX * easing;
            ringY += deltaY * easing;
            
            // Use transform3d for GPU acceleration - center the ring on mouse position
            cursorRing.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
            
            animationId = requestAnimationFrame(animateRing);
        }
        
        // Cleanup function
        function stopRingAnimation() {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            isAnimating = false;
        }
        
        // Hide cursor on mobile/touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            cursorDot.classList.add('hidden');
            cursorRing.classList.add('hidden');
        }
        
        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .fact-chip');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursorRing.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0) scale(1.5)`;
                cursorRing.style.borderColor = 'var(--accent-light)';
            });
            
            element.addEventListener('mouseleave', function() {
                cursorRing.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0) scale(1)`;
                cursorRing.style.borderColor = 'var(--accent)';
            });
        });
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', stopRingAnimation);
    }
});

// ===== UTILITY FUNCTIONS =====
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