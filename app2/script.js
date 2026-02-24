// GutData - Página Web Dinámica
// JavaScript para interactividad y efectos dinámicos

document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const header = document.querySelector('.header');
    const heroButtons = document.querySelectorAll('.hero-buttons button');
    const contactoForm = document.querySelector('.contacto-form');
    const servicioCards = document.querySelectorAll('.servicio-card');
    const floatingCards = document.querySelectorAll('.card');

    // Navegación móvil
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Cerrar menú móvil al hacer clic en enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Scroll suave para enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto de transparencia del header al hacer scroll
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Animación de las tarjetas flotantes con delays escalonados
    function animateFloatingCards() {
        floatingCards.forEach((card, index) => {
            const delays = [0, 3, 6, 9]; // Delays más largos para evitar solapamiento
            card.style.animationDelay = `${delays[index]}s`;

            // Agregar efecto de entrada escalonado con separación
            card.style.opacity = '0';
            card.style.transform = 'scale(0.3) translateY(80px)';
            card.style.zIndex = 10 + index; // Z-index para controlar el orden

            setTimeout(() => {
                card.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
                card.style.opacity = '1';
                card.style.transform = 'scale(1) translateY(0)';
            }, delays[index] * 1000);
        });
    }

    // Efecto parallax en el hero
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');

        if (hero && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroVisual.style.transform = `translateY(${scrolled * -0.3}px)`;
        }
    });

    // Sistema de animaciones avanzado con diferentes tipos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fadeInUp';
                const delay = element.dataset.delay || '0';

                setTimeout(() => {
                    element.classList.add(`animate-${animationType}`);
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) translateX(0) scale(1)';
                }, parseInt(delay));
            }
        });
    }, observerOptions);

    // Configurar animaciones para diferentes elementos
    function setupAnimations() {
        // Servicios con animaciones escalonadas
        servicioCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.9)';
            card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.dataset.animation = 'fadeInUp';
            card.dataset.delay = (index * 200).toString();
            animationObserver.observe(card);
        });

        // Sección nosotros con animación desde la izquierda
        const nosotrosText = document.querySelector('.nosotros-text');
        if (nosotrosText) {
            nosotrosText.style.opacity = '0';
            nosotrosText.style.transform = 'translateX(-50px)';
            nosotrosText.style.transition = 'all 0.8s ease-out';
            nosotrosText.dataset.animation = 'fadeInLeft';
            nosotrosText.dataset.delay = '0';
            animationObserver.observe(nosotrosText);
        }

        // Mensaje de enfoque con animación desde la derecha
        const messageContent = document.querySelector('.message-content');
        if (messageContent) {
            messageContent.style.opacity = '0';
            messageContent.style.transform = 'translateX(50px)';
            messageContent.style.transition = 'all 0.8s ease-out';
            messageContent.dataset.animation = 'fadeInRight';
            messageContent.dataset.delay = '0';
            animationObserver.observe(messageContent);
        }

        // Formulario de contacto con animación desde la derecha
        const contactoForm = document.querySelector('.contacto-form');
        if (contactoForm) {
            contactoForm.style.opacity = '0';
            contactoForm.style.transform = 'translateX(50px)';
            contactoForm.style.transition = 'all 0.8s ease-out';
            contactoForm.dataset.animation = 'fadeInRight';
            contactoForm.dataset.delay = '200';
            animationObserver.observe(contactoForm);
        }

        // Información de contacto con animación desde abajo
        const contactoInfo = document.querySelector('.contacto-info');
        if (contactoInfo) {
            contactoInfo.style.opacity = '0';
            contactoInfo.style.transform = 'translateY(30px)';
            contactoInfo.style.transition = 'all 0.8s ease-out';
            contactoInfo.dataset.animation = 'fadeInUp';
            contactoInfo.dataset.delay = '0';
            animationObserver.observe(contactoInfo);
        }

        // Cloud logos con animación escalonada
        const cloudLogos = document.querySelectorAll('.cloud-logo');
        cloudLogos.forEach((logo, index) => {
            logo.style.opacity = '0';
            logo.style.transform = 'translateY(30px) scale(0.8)';
            logo.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            logo.dataset.animation = 'fadeInScale';
            logo.dataset.delay = (index * 200).toString();
            animationObserver.observe(logo);
        });
    }

    // Efectos hover mejorados para las tarjetas de servicios
    servicioCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        });
    });

    // Funcionalidad de los botones del hero
    heroButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (this.textContent.includes('servicios')) {
                document.querySelector('#servicios').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (this.textContent.includes('Contáctanos')) {
                document.querySelector('#contacto').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Validación y envío del formulario de contacto
    if (contactoForm) {
        contactoForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Obtener datos del formulario
            const formData = new FormData(this);
            const nombre = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const empresa = this.querySelectorAll('input[type="text"]')[1].value;
            const servicio = this.querySelector('select').value;
            const mensaje = this.querySelector('textarea').value;

            // Validación básica
            if (!nombre || !email || !empresa || !servicio || !mensaje) {
                showNotification('Por favor, completa todos los campos obligatorios.', 'error');
                return;
            }

            // Simular envío del formulario
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            setTimeout(() => {
                showNotification('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remover después de 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Efecto de escritura en el título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Aplicar efecto de escritura al cargar la página
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText.replace(/<[^>]*>/g, ''), 50);
        }, 1000);
    }


    // Efecto de partículas en el hero (opcional)
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
    }

    // Efectos adicionales para las tarjetas flotantes
    function addCardInteractions() {
        floatingCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function () {
                this.style.animationPlayState = 'paused';
                this.style.transform = 'translateY(-15px) scale(1.1) rotate(2deg)';
                this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.3)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.animationPlayState = 'running';
                this.style.transform = '';
                this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            });

            card.addEventListener('click', function () {
                this.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    this.style.animation = 'float 8s ease-in-out infinite';
                }, 500);
            });
        });
    }

    // Animación de texto con efecto de escritura mejorado
    function typeWriterEnhanced(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Agregar cursor parpadeante al final
                element.innerHTML += '<span class="cursor">|</span>';
            }
        }

        type();
    }

    // Efecto de partículas mejorado
    function createEnhancedParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 80;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                pointer-events: none;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
    }

    // Efecto de ondas en el hero
    function createWaveEffect() {
        const hero = document.querySelector('.hero');
        const wave = document.createElement('div');
        wave.className = 'wave-effect';
        wave.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100px;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            animation: wave 3s ease-in-out infinite;
        `;
        hero.appendChild(wave);
    }

    // Inicializar todos los efectos
    function initializeEffects() {
        animateFloatingCards();
        addCardInteractions();
        createEnhancedParticles();
        createWaveEffect();
        setupAnimations();
    }

    // Llamar a la inicialización
    initializeEffects();

    // Smooth scroll para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto de carga inicial
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');

        // Animar elementos de entrada
        const animatedElements = document.querySelectorAll('.hero-content, .servicio-card, .nosotros-text');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';

            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Lazy loading para imágenes (si se agregan en el futuro)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Utilidades adicionales
const utils = {
    // Función para debounce
    debounce: function (func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Función para throttle
    throttle: function (func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Exportar para uso global si es necesario
window.GutDataUtils = utils;
