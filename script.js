/**
 * PORTFOLIO ARCHITECTURE - ANDREY
 * Gerenciamento de Interface e Sistema Cosmos
 */

"use strict";

const AndreyPortfolio = (() => {
    // 1. Motor de Partículas Cosmos (Gera as estrelas do seu CSS)
    const initCosmos = () => {
        const generateStars = (id, count) => {
            const container = document.getElementById(id);
            if (!container) return;

            let shadows = [];
            for (let i = 0; i < count; i++) {
                const x = Math.floor(Math.random() * window.innerWidth);
                const y = Math.floor(Math.random() * 3000); // Altura longa para o scroll
                shadows.push(`${x}px ${y}px #FFF`);
            }
            container.style.boxShadow = shadows.join(', ');
        };

        generateStars('stars-small', 250);
        generateStars('stars-medium', 100);
        generateStars('stars-large', 40);
    };

    // 2. Lógica do Header (Usa as classes .header-hidden e .header-fixed do CSS)
    const initNavigation = () => {
        const nav = document.getElementById('main-nav');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            // Ativa o fundo do menu ao rolar para baixo
            if (currentScroll > 100) {
                nav.classList.add('header-fixed');
                nav.classList.remove('header-hidden');
            } else {
                nav.classList.add('header-hidden');
                nav.classList.remove('header-fixed');
            }

            // Esconde ao descer e mostra ao subir
            if (currentScroll > lastScroll && currentScroll > 600) {
                nav.style.transform = "translateY(-100%)";
            } else {
                nav.style.transform = currentScroll > 100 ? "translateY(0)" : "";
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    };

    // 3. Efeito Typewriter Profissional
    const initTypewriter = () => {
        const element = document.querySelector('.hero-typewriter');
        if (!element) return;

        const words = ["Python Specialist", "Java Developer", "Full Stack Architect"];
        let wordIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIdx];
            
            if (isDeleting) {
                element.textContent = currentWord.substring(0, charIdx - 1);
                charIdx--;
            } else {
                element.textContent = currentWord.substring(0, charIdx + 1);
                charIdx++;
            }

            let speed = isDeleting ? 60 : 150;

            if (!isDeleting && charIdx === currentWord.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                speed = 500;
            }

            setTimeout(type, speed);
        };
        type();
    };

    // 4. Animação de Revelação (Scroll Reveal)
    const initReveal = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        }, { threshold: 0.1 });

        const targets = document.querySelectorAll('.spec-card, .repo-card, .glass-morphism');
        targets.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(40px)";
            el.style.transition = "all 0.7s ease-out";
            observer.observe(el);
        });
    };

    // Inicialização
    return {
        init: () => {
            initCosmos();
            initNavigation();
            initTypewriter();
            initReveal();
            console.log("Sistema Andrey Carregado.");
        }
    };
})();

document.addEventListener('DOMContentLoaded', AndreyPortfolio.init);
