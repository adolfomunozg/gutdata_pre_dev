document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollAnimations();
    initSmoothScroll();
    initMobileMenu();
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('form-feedback');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            feedback.style.display = 'none';

            const formData = new FormData(form);

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            })
                .then(response => response.json())
                .then(data => {
                    feedback.textContent = "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.";
                    feedback.style.display = 'block';
                    feedback.style.backgroundColor = '#dcfce7';
                    feedback.style.color = '#166534';
                    feedback.style.border = '1px solid #86efac';
                    form.reset();
                })
                .catch(error => {
                    feedback.textContent = "Hubo un error al enviar el mensaje. Por favor intenta nuevamente.";
                    feedback.style.display = 'block';
                    feedback.style.backgroundColor = '#fee2e2';
                    feedback.style.color = '#991b1b';
                    feedback.style.border = '1px solid #fca5a5';
                    console.error('Error:', error);
                })
                .finally(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

/* =========================================
   Particle System (Antigravity Effect)
   ========================================= */
function initParticles() {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 60;
    const connectionDistance = 150;
    const mouseDistance = 200;

    // Mouse state
    let mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = Math.random() > 0.5 ? 'rgba(59, 130, 246, ' : 'rgba(139, 92, 246, '; // Blue or Purple
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction (Antigravity/Repulsion)
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 2; // Strength
                    const directionY = forceDirectionY * force * 2;

                    this.vx -= directionX;
                    this.vy -= directionY;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + '0.5)';
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        particles.forEach((a, index) => {
            for (let j = index + 1; j < particles.length; j++) {
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 116, 139, ${1 - distance / connectionDistance})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        init();
    });

    init();
    animate();
}

/* =========================================
   Scroll Animations (Intersection Observer)
   ========================================= */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const elements = document.querySelectorAll('.bento-item, .hero-title, .hero-subtitle, .section-header');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        observer.observe(el);
    });

    // Add visible class styles dynamically if not in CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* =========================================
   Smooth Scroll
   ========================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
