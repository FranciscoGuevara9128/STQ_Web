/**
 * STQ S.A. - Script Principal
 * 
 * Funcionalidad mínima requerida:
 * 1. Toggle de Menú Móvil
 * 2. Accesibilidad (A11Y) aria-expanded
 * 3. Cambio de estado del header al hacer scroll
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Mobile Menu Toggle
    // ==========================================
    const menuToggle = document.querySelector('.js-menu-toggle');
    const mobileMenu = document.querySelector('.js-mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

            // Toggle local state
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('is-active');

            // Toggle toggle icon (Hamburguesa a Cruz - opcional dependiendo del SVG)
            // prevent scrolling on body when menu is open
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });
    }

    // ==========================================
    // 2. Scroll Header State
    // ==========================================
    const header = document.querySelector('.js-header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        }, { passive: true });
    }

    // ==========================================
    // 3. Smooth Scrolling for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // If mobile menu is open, close it
                if (mobileMenu && mobileMenu.classList.contains('is-active')) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    mobileMenu.classList.remove('is-active');
                    document.body.style.overflow = '';
                }

                // Scroll to element with offset parameter
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ==========================================
    // 4. Scroll Reveal (Fade-In Up)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Una vez revelado, dejamos de observar para ahorro de recursos
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15, // Se activa cuando el 15% del elemento es visible
            rootMargin: '0px 0px -50px 0px' // Margen inferior para disparar un poco antes
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }
});
