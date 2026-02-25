/**
 * PORTFOLIO ARCHITECTURE - ANDREY
 * Gerenciamento de Interface e Efeitos Cosmos
 */

"use strict";

const PortfolioCore = (() => {
    // Configurações de Partículas
    const starSettings = {
        small: { id: 'stars-small', count: 250, size: '1px' },
        medium: { id: 'stars-medium', count: 120, size: '2px' },
        large: { id: 'stars-large', count: 45, size: '3px' }
    };

    // 1. Gerador de Galáxia Dinâmico
    const initCosmos = () => {
        const createStars = (layer) => {
            const container = document.getElementById(layer.id);
            if (!container) return;

            let boxShadows = [];
            for (let i = 0; i < layer.count; i++) {
                const x = Math.floor(Math.random() * window.innerWidth);
                const y = Math.floor(Math.random() * 3000); // Altura total
                boxShadows.push(`${x}px ${y}px #FFF`);
            }
            container.style.boxShadow = boxShadows.join(', ');
        };

        Object.values(starSettings).forEach(createStars);
    };

    // 2. Navegação Inteligente (Header Fixed/Hidden)
    const initNavigation = () => {
        const nav = document.getElementById('main-nav');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            // Ativa o fundo do menu ao rolar
            if (currentScroll > 150) {
                nav.classList.add('header-fixed');
                nav.classList.remove('header-hidden');
            } else {
                nav.classList.add('header-hidden');
                nav.classList.remove('header-fixed');
            }

            // Esconde o menu ao rolar para baixo, mostra ao subir
            if (currentScroll > lastScroll && currentScroll > 600) {
                nav.style.transform = "translateY(-100%)";
            } else {
                nav.style.transform = (currentScroll > 150) ? "translateY(0)" : "";
            }
            lastScroll = currentScroll;
        }, { passive: true });
    };

    // 3. Efeito Typewriter (Escrita)
    const initTypewriter = () => {
        const target = document.querySelector('.hero-typewriter');
        if (!target) return;

        const words = ["Python Expert", "Java Architect", "Full Stack Developer"];
        let wordIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        const type = () => {
            const current = words[wordIdx];
            if (isDeleting) {
                target.textContent = current.substring(0, charIdx - 1);
                charIdx--;
            } else {
                target.textContent = current.substring(0, charIdx + 1);
                charIdx++;
            }

            let typeSpeed = isDeleting ? 60 : 150;

            if (!isDeleting && charIdx === current.length) {
                typeSpeed = 2000; // Pausa no final da palavra
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };
        type();
    };

    // 4. Reveal Animation (Animação ao descer a página)
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
            el.style.transition = "all 0.8s ease-out";
            observer.observe(el);
        });
    };

    // Inicialização Geral
    return {
        start: () => {
            initCosmos();
            initNavigation();
            initTypewriter();
            initReveal();
            console.log("Andrey Portfolio Engine: Running");
        }
    };
})();

// Disparo Inicial
document.addEventListener('DOMContentLoaded', PortfolioCore.start);

// Recalcular estrelas se a janela mudar de tamanho
window.addEventListener('resize', () => {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(() => {
        PortfolioCore.start();
    }, 250);
});
