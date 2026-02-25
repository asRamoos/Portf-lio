/**
 * ANDREY OS ENGINE v9.0
 * Controle de UX/UI, Animações e Monitoramento de State
 */

"use strict";

document.addEventListener('DOMContentLoaded', () => {

    // 1. Loader de Sistema
    const preloader = document.getElementById('app-preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.classList.remove('loading');
        }, 800);
    });

    // 2. Engine de Typewriter (Efeito Terminal)
    const typeTarget = document.getElementById('auto-typewriter');
    const roleText = "Full Stack Software Engineer";
    let charIndex = 0;

    const runTypewriter = () => {
        if (charIndex < roleText.length) {
            typeTarget.textContent += roleText.charAt(charIndex);
            charIndex++;
            setTimeout(runTypewriter, 100);
        }
    };
    setTimeout(runTypewriter, 1500);

    // 3. Controle Inteligente de Scroll (Cabeçalho)
    const siteHeader = document.getElementById('site-header');
    let lastScrollPosition = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Ativa o visual de vidro ao descer
        if (currentScroll > 150) {
            siteHeader.classList.add('is-scrolled');
        } else {
            siteHeader.classList.remove('is-scrolled');
        }

        lastScrollPosition = currentScroll;
    });

    // 4. Parallax de Estrelas Adicional via Mouse
    const spaceEngine = document.getElementById('deep-space-engine');
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX * -0.01);
        const moveY = (e.clientY * -0.01);
        spaceEngine.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    // 5. Smooth Scroll Interno Otimizado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 6. Scroll Spy (Menu Ativo)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
