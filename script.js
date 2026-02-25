/**
 * PORTFOLIO ARCHITECTURE v4.0 - ANDREY
 * Lógica modular para controle de Interface e Experiência do Usuário (UX)
 */

"use strict";

const AndreyPortfolio = (() => {
    // Estado da Aplicação
    const state = {
        isLoaded: false,
        lastScroll: 0,
        theme: 'dark',
        mobileMenu: false
    };

    // Configurações do Motor de Animação
    const config = {
        typewriter: ["Full Stack Developer", "Python Expert", "Java Architect", "Problem Solver"],
        starCounts: { small: 300, medium: 150, large: 60 },
        revealThreshold: 0.15
    };

    // 1. Inicialização do Loader e Segurança
    const initLoader = () => {
        const loader = document.getElementById('loader');
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
                state.isLoaded = true;
                document.body.classList.add('page-ready');
            }, 800);
        });
    };

    // 2. Motor de Partículas Cosmos (Gerador de Shadows)
    const initCosmos = () => {
        const generateStars = (id, count) => {
            const el = document.getElementById(id);
            if (!el) return;
            
            let boxShadow = "";
            const canvasWidth = window.innerWidth * 2; // Espaço extra para movimento
            const canvasHeight = 4000;

            for (let i = 0; i < count; i++) {
                const x = Math.floor(Math.random() * canvasWidth);
                const y = Math.floor(Math.random() * canvasHeight);
                boxShadow += `${x}px ${y}px #FFF${i === count - 1 ? "" : ","}`;
            }
            el.style.boxShadow = boxShadow;
        };

        generateStars('stars-small', config.starCounts.small);
        generateStars('stars-medium', config.starCounts.medium);
        generateStars('stars-large', config.starCounts.large);
    };

    // 3. Header Inteligente (Scroll Logic)
    const initHeader = () => {
        const nav = document.getElementById('main-nav');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            // Lógica de Aparência do Header
            if (currentScroll > 300) {
                nav.classList.add('header-fixed');
                nav.classList.remove('header-hidden');
            } else {
                nav.classList.add('header-hidden');
                nav.classList.remove('header-fixed');
            }

            // Lógica de Direção (Esconde ao descer, mostra ao subir)
            if (currentScroll > state.lastScroll && currentScroll > 800) {
                nav.style.transform = "translateY(-100%)";
            } else {
                nav.style.transform = "translateY(0)";
            }
            
            state.lastScroll = currentScroll;
        }, { passive: true });
    };

    // 4. Typewriter Engine (Efeito de Escrita)
    const initTypewriter = () => {
        const target = document.getElementById('typewriter-text');
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentText = config.typewriter[textIndex];
            
            if (isDeleting) {
                target.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                target.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 150;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pausa no final
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % config.typewriter.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    };

    // 5. Scroll Reveal (Animações de Entrada)
    const initReveal = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active-reveal');
                }
            });
        }, { threshold: config.revealThreshold });

        const revealElements = document.querySelectorAll(
            '.spec-card, .project-rect-card, .glass-morphism, .section-title'
        );
        
        revealElements.forEach(el => {
            el.classList.add('reveal-hidden');
            observer.observe(el);
        });
    };

    // 6. Smooth Scroll Handler
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Public Init
    return {
        start: () => {
            initLoader();
            initCosmos();
            initHeader();
            initTypewriter();
            initReveal();
            initSmoothScroll();
            console.log("Portfolio Engine Started | Developer: Andrey");
        }
    };
})();

// Execução
document.addEventListener('DOMContentLoaded', AndreyPortfolio.start);
