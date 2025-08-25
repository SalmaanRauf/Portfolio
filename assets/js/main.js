
(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Fix: Flexbox min-height bug on IE.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

	// Nav.
		var $nav = $header.children('nav'),
			$nav_li = $nav.find('li');

		// Add "middle" alignment classes if we're dealing with an even number of items.
			if ($nav_li.length % 2 == 0) {

				$nav.addClass('use-middle');
				$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

			}

	// Main.
		var	delay = 325,
			locked = false;

		// Methods.
			$main._show = function(id, initial) {

				var $article = $main_articles.filter('#' + id);

				// No such article? Bail.
					if ($article.length == 0)
						return;

				// Handle lock.

					// Already locked? Speed through "show" steps w/o delays.
						if (locked || (typeof initial != 'undefined' && initial === true)) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Mark as visible.
								$body.addClass('is-article-visible');

							// Deactivate all articles (just in case one's already active).
								$main_articles.removeClass('active');

							// Hide header, footer.
								$header.hide();
								$footer.hide();

							// Show main, article.
								$main.show();
								$article.show();

							// Activate article.
								$article.addClass('active');

							// Unlock.
								locked = false;

							// Unmark as switching.
								setTimeout(function() {
									$body.removeClass('is-switching');
								}, (initial ? 1000 : 0));

							return;

						}

					// Lock.
						locked = true;

				// Article already visible? Just swap articles.
					if ($body.hasClass('is-article-visible')) {

						// Deactivate current article.
							var $currentArticle = $main_articles.filter('.active');

							$currentArticle.removeClass('active');

						// Show article.
							setTimeout(function() {

								// Hide current article.
									$currentArticle.hide();

								// Show article.
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

				// Otherwise, handle as normal.
					else {

						// Mark as visible.
							$body
								.addClass('is-article-visible');

						// Show article.
							setTimeout(function() {

								// Hide header, footer.
									$header.hide();
									$footer.hide();

								// Show main, article.
									$main.show();
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

			};

			$main._hide = function(addState) {

				var $article = $main_articles.filter('.active');

				// Article not visible? Bail.
					if (!$body.hasClass('is-article-visible'))
						return;

				// Add state?
					if (typeof addState != 'undefined'
					&&	addState === true)
						history.pushState(null, null, '#');

				// Handle lock.

					// Already locked? Speed through "hide" steps w/o delays.
						if (locked) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Deactivate article.
								$article.removeClass('active');

							// Hide article, main.
								$article.hide();
								$main.hide();

							// Show footer, header.
								$footer.show();
								$header.show();

							// Unmark as visible.
								$body.removeClass('is-article-visible');

							// Unlock.
								locked = false;

							// Unmark as switching.
								$body.removeClass('is-switching');

							// Window stuff.
								$window
									.scrollTop(0)
									.triggerHandler('resize.flexbox-fix');

							return;

						}

					// Lock.
						locked = true;

				// Deactivate article.
					$article.removeClass('active');

				// Hide article.
					setTimeout(function() {

						// Hide article, main.
							$article.hide();
							$main.hide();

						// Show footer, header.
							$footer.show();
							$header.show();

						// Unmark as visible.
							setTimeout(function() {

								$body.removeClass('is-article-visible');

								// Window stuff.
									$window
										.scrollTop(0)
										.triggerHandler('resize.flexbox-fix');

								// Unlock.
									setTimeout(function() {
										locked = false;
									}, delay);

							}, 25);

					}, delay);


			};

		// Articles.
			$main_articles.each(function() {

				var $this = $(this);

				// Close.
					$('<div class="close">Close</div>')
						.appendTo($this)
						.on('click', function() {
							location.hash = '';
						});

				// Prevent clicks from inside article from bubbling.
					$this.on('click', function(event) {
						event.stopPropagation();
					});

			});

		// Events.
			$body.on('click', function(event) {

				// Article visible? Hide.
					if ($body.hasClass('is-article-visible'))
						$main._hide(true);

			});

			$window.on('keyup', function(event) {

				switch (event.keyCode) {

					case 27:

						// Article visible? Hide.
							if ($body.hasClass('is-article-visible'))
								$main._hide(true);

						break;

					default:
						break;

				}

			});

			$window.on('hashchange', function(event) {

				// Empty hash?
					if (location.hash == ''
					||	location.hash == '#') {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Hide.
							$main._hide();

					}

				// Otherwise, check for a matching article.
					else if ($main_articles.filter(location.hash).length > 0) {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Show article.
							$main._show(location.hash.substr(1));

					}

			});

		// Scroll restoration.
		// This prevents the page from scrolling back to the top on a hashchange.
			if ('scrollRestoration' in history)
				history.scrollRestoration = 'manual';
			else {

				var	oldScrollPos = 0,
					scrollPos = 0,
					$htmlbody = $('html,body');

				$window
					.on('scroll', function() {

						oldScrollPos = scrollPos;
						scrollPos = $htmlbody.scrollTop();

					})
					.on('hashchange', function() {
						$window.scrollTop(oldScrollPos);
					});

			}

		// Initialize.

			// Hide main, articles.
				$main.hide();
				$main_articles.hide();

			// Initial article.
				if (location.hash != ''
				&&	location.hash != '#')
					$window.on('load', function() {
						$main._show(location.hash.substr(1), true);
					});

})(jQuery);

// ===== MAIN JAVASCRIPT FILE =====
// Dark Futuristic Portfolio - Interactive Features & Animations

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initHeroCanvas();
        this.initSkillsCanvas();
        this.initAnimations();
        this.initStatsCounter();
        this.initProjectFilters();
        this.initFormValidation();
        this.initSmoothScrolling();
        this.initIntersectionObserver();
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Skills toggle
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSkillsToggle(e));
        });

        // Project filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleProjectFilter(e));
        });

        // Contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Mouse move for hero canvas
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));

        // Window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    // ===== HERO CANVAS (WebGL Grid) =====
    initHeroCanvas() {
        const canvas = document.getElementById('heroCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let mouseX = 0;
        let mouseY = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const drawGrid = () => {
            const gridSize = 50;
            const gridColor = 'rgba(0, 229, 255, 0.1)';
            const gridWidth = 1;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calculate grid offset based on mouse position
            const offsetX = (mouseX - canvas.width / 2) * 0.01;
            const offsetY = (mouseY - canvas.height / 2) * 0.01;

            ctx.strokeStyle = gridColor;
            ctx.lineWidth = gridWidth;

            // Draw vertical lines
            for (let x = 0; x <= canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x + offsetX, 0);
                ctx.lineTo(x + offsetX, canvas.height);
                ctx.stroke();
            }

            // Draw horizontal lines
            for (let y = 0; y <= canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y + offsetY);
                ctx.lineTo(canvas.width, y + offsetY);
                ctx.stroke();
            }

            // Draw cursor spotlight
            const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
            gradient.addColorStop(0, 'rgba(0, 229, 255, 0.1)');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const animate = () => {
            drawGrid();
            animationId = requestAnimationFrame(animate);
        };

        this.handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        this.handleResize = () => {
            resizeCanvas();
        };

        resizeCanvas();
        animate();
    }

    // ===== SKILLS CANVAS (Radial Chart) =====
    initSkillsCanvas() {
        const canvas = document.getElementById('skillsCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 150;

        const skills = [
            { name: 'Python', level: 90, color: '#00E5FF' },
            { name: 'TypeScript', level: 85, color: '#9D00FF' },
            { name: 'React/Next', level: 90, color: '#00E5FF' },
            { name: 'LLM Ops', level: 80, color: '#9D00FF' },
            { name: 'AWS', level: 75, color: '#00E5FF' }
        ];

        const drawSkillsChart = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw background circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(230, 232, 236, 0.1)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw skill arcs
            skills.forEach((skill, index) => {
                const startAngle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
                const endAngle = startAngle + (2 * Math.PI) / skills.length;
                const skillRadius = (radius * skill.level) / 100;

                // Draw skill arc
                ctx.beginPath();
                ctx.arc(centerX, centerY, skillRadius, startAngle, endAngle);
                ctx.strokeStyle = skill.color;
                ctx.lineWidth = 4;
                ctx.stroke();

                // Draw skill label
                const labelAngle = startAngle + (endAngle - startAngle) / 2;
                const labelX = centerX + Math.cos(labelAngle) * (skillRadius + 20);
                const labelY = centerY + Math.sin(labelAngle) * (skillRadius + 20);

                ctx.fillStyle = skill.color;
                ctx.font = '12px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(skill.level + '%', labelX, labelY);
            });
        };

        // Resize canvas
        const resizeCanvas = () => {
            canvas.width = 400;
            canvas.height = 400;
            drawSkillsChart();
        };

        resizeCanvas();
        drawSkillsChart();
    }

    // ===== ANIMATIONS =====
    initAnimations() {
        // Fade in animations for sections
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Timeline animations
        this.animateTimeline();
    }

    animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.2}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.2}s`;
            timelineObserver.observe(item);
        });
    }

    // ===== STATS COUNTER =====
    initStatsCounter() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsBar = document.querySelector('.stats-bar');
        if (statsBar) {
            statsObserver.observe(statsBar);
        }
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // ===== PROJECT FILTERS =====
    initProjectFilters() {
        this.handleProjectFilter = (e) => {
            const filter = e.target.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');
            const filterBtns = document.querySelectorAll('.filter-btn');

            // Update active filter button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
                } else {
                    card.style.display = 'none';
                }
            });
        };
    }

    // ===== SKILLS TOGGLE =====
    handleSkillsToggle(e) {
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        const view = e.target.getAttribute('data-view');

        // Update active button
        toggleBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Toggle skills view (placeholder for future implementation)
        console.log(`Switched to ${view} skills view`);
    }

    // ===== FORM VALIDATION =====
    initFormValidation() {
        const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.validateField(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('error');

        // Validation rules
        if (fieldType === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Apply error styling
        if (!isValid) {
            field.classList.add('error');
            this.showFieldError(field, errorMessage);
        } else {
            this.hideFieldError(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        // Remove existing error message
        this.hideFieldError(field);

        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b6b';
        errorElement.style.fontSize = '0.75rem';
        errorElement.style.marginTop = '0.25rem';

        field.parentNode.appendChild(errorElement);
    }

    hideFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // ===== FORM SUBMISSION =====
    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const inputs = form.querySelectorAll('input, textarea');
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Show success message
            this.showSuccessMessage('Message sent successfully! I\'ll get back to you soon.');
            form.reset();
        }
    }

    showSuccessMessage(message) {
        // Create success message element
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = message;
        successElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2CE59B;
            color: #0B0F19;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(successElement);

        // Remove after 5 seconds
        setTimeout(() => {
            successElement.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => successElement.remove(), 300);
        }, 5000);
    }

    // ===== SMOOTH SCROLLING =====
    initSmoothScrolling() {
        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    // ===== INTERSECTION OBSERVER =====
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.project-card, .timeline-card, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== THEME TOGGLE =====
    toggleTheme() {
        const body = document.body;
        const isDark = body.classList.contains('dark-theme');
        
        if (isDark) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    }

    // ===== UTILITY FUNCTIONS =====
    debounce(func, wait) {
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

    throttle(func, limit) {
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

// ===== ADDITIONAL CSS ANIMATIONS =====
const additionalStyles = `
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

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .form-group input.error,
    .form-group textarea.error {
        border-color: #ff6b6b;
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
    }

    .project-card.visible,
    .timeline-card.visible,
    .contact-item.visible {
        animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    .light-theme {
        --primary-surface: #ffffff;
        --secondary-surface: #f8fafc;
        --text-high-emphasis: #1e293b;
        --text-low-emphasis: #64748b;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme + '-theme';
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Preload critical resources
const preloadResources = () => {
    const criticalImages = [
        'images/New Linkedin.jpeg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
};

// Initialize preloading
preloadResources();

// Skills Matrix Animation
const skillsCanvas = document.getElementById('skillsCanvas');
const ctx = skillsCanvas.getContext('2d');
let particles = [];
let animationFrameId;

// Set canvas size
function resizeCanvas() {
    const container = skillsCanvas.parentElement;
    skillsCanvas.width = container.offsetWidth;
    skillsCanvas.height = container.offsetHeight;
}

// Particle class for background animation
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles
function initParticles() {
    particles = [];
    const numberOfParticles = (skillsCanvas.width * skillsCanvas.height) / 15000;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * skillsCanvas.width;
        const y = Math.random() * skillsCanvas.height;
        const colors = ['#00ffcc', '#ff6b6b', '#4ecdc4', '#a78bfa', '#ffd93d'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color));
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, skillsCanvas.width, skillsCanvas.height);
    
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Remove particles that are too small
        if (particle.size <= 0.2) {
            particles.splice(index, 1);
        }

        // Add new particles when needed
        if (particles.length < (skillsCanvas.width * skillsCanvas.height) / 15000) {
            const x = Math.random() * skillsCanvas.width;
            const y = Math.random() * skillsCanvas.height;
            const colors = ['#00ffcc', '#ff6b6b', '#4ecdc4', '#a78bfa', '#ffd93d'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, color));
        }
    });

    animationFrameId = requestAnimationFrame(animate);
}

// Handle skill item interactions
function initSkillsInteraction() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const dot = item.querySelector('.skill-dot');
            const color = window.getComputedStyle(dot).backgroundColor;
            
            // Add particles burst effect
            for (let i = 0; i < 10; i++) {
                particles.push(new Particle(
                    item.offsetLeft + item.offsetWidth / 2,
                    item.offsetTop + item.offsetHeight / 2,
                    color
                ));
            }
        });
    });
}

// Toggle between tech and soft skills
function initSkillsToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const skillItems = document.querySelectorAll('.skill-item');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show/hide relevant skills
            const view = btn.getAttribute('data-view');
            skillItems.forEach(item => {
                if (view === 'tech') {
                    item.style.display = item.getAttribute('data-skill') !== 'soft' ? 'block' : 'none';
                } else {
                    item.style.display = item.getAttribute('data-skill') === 'soft' ? 'block' : 'none';
                }
            });
        });
    });
}

// Initialize everything when the page loads
window.addEventListener('load', () => {
    resizeCanvas();
    initParticles();
    animate();
    initSkillsInteraction();
    initSkillsToggle();
});

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// Clean up animation when leaving the section
const skillsSection = document.getElementById('skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animate();
        } else {
            cancelAnimationFrame(animationFrameId);
        }
    });
}, { threshold: 0.1 });

observer.observe(skillsSection);