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

            // Convertir datos a URLSearchParams para evitar preflight CORS
            const formDataParams = new URLSearchParams();
            for (const [key, value] of formData.entries()) {
                formDataParams.append(key, value);
            }

            fetch("https://n8n.srv1336192.hstgr.cloud/webhook/867d8144-1ada-4b52-a556-f2e6b95847db", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formDataParams
            })
                .then(response => {
                    // En modo no-cors, la respuesta es opaca - no podemos leer el status
                    // pero si llegamos aquí, la petición se envió sin error de red
                    feedback.textContent = "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.";
                    feedback.style.display = 'block';
                    feedback.style.backgroundColor = 'rgba(22, 101, 52, 0.2)';
                    feedback.style.color = '#86efac';
                    feedback.style.border = '1px solid #22c55e';
                    form.reset();
                })
                .catch(error => {
                    feedback.textContent = "Hubo un error al enviar el mensaje. Por favor intenta nuevamente.";
                    feedback.style.display = 'block';
                    feedback.style.backgroundColor = 'rgba(153, 27, 27, 0.2)';
                    feedback.style.color = '#fca5a5';
                    feedback.style.border = '1px solid #ef4444';
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
   Particle System (Enhanced Constellation)
   ========================================= */
function initParticles() {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 80; // Increased count
    const connectionDistance = 180;
    const mouseDistance = 250;

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
            this.vx = (Math.random() - 0.5) * 0.8; // Slightly faster
            this.vy = (Math.random() - 0.5) * 0.8;
            this.size = Math.random() * 2 + 1.5;
            // Neon colors: Cyan, Blue, Purple
            const colors = ['rgba(56, 189, 248,', 'rgba(129, 140, 248,', 'rgba(192, 132, 252,'];
            this.baseColor = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction (Attraction/Connection instead of repulsion for better feel)
            // Or gentle repulsion + connection
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                // Gentle repulsion if too close
                if (distance < 100) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (100 - distance) / 100;
                    this.vx -= forceDirectionX * force * 0.5;
                    this.vy -= forceDirectionY * force * 0.5;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.baseColor + '0.8)';
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.baseColor + '1)';
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow for lines
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
            // Connect to other particles
            for (let j = index + 1; j < particles.length; j++) {
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(148, 163, 184, ${0.15 * (1 - distance / connectionDistance)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }

            // Connect to mouse
            if (mouse.x != null) {
                const dx = a.x - mouse.x;
                const dy = a.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    ctx.beginPath();
                    // Stronger connection to mouse
                    ctx.strokeStyle = `rgba(56, 189, 248, ${0.4 * (1 - distance / mouseDistance)})`;
                    ctx.lineWidth = 1.5;
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(mouse.x, mouse.y);
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
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to save performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const elements = document.querySelectorAll('.bento-item, .hero-title, .hero-subtitle, .section-header, .btn-primary, .btn-secondary');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        // Staggered delay for bento items
        if (el.classList.contains('bento-item')) {
            el.style.transition = `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s`;
        } else {
            el.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        }
        observer.observe(el);
    });
}

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

