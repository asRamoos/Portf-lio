/**
 * PORTFOLIO ENGINE - ANDREY
 */

"use strict";

const Portfolio = (() => {
    // Gerador de Estrelas (IDs do style.css)
    const initStars = () => {
        const layers = [
            { id: 'stars-small', count: 180 },
            { id: 'stars-medium', count: 80 },
            { id: 'stars-large', count: 30 }
        ];

        layers.forEach(layer => {
            const el = document.getElementById(layer.id);
            if (!el) return;
            
            let shadows = "";
            for (let i = 0; i < layer.count; i++) {
                const x = Math.floor(Math.random() * window.innerWidth);
                const y = Math.floor(Math.random() * 2500);
                shadows += `${x}px ${y}px #FFF${i < layer.count - 1 ? ',' : ''}`;
            }
            el.style.boxShadow = shadows;
        });
    };

    // Controle do Header (#main-nav)
    const initHeader = () => {
        const nav = document.getElementById('main-nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 150) {
                nav.classList.remove('header-hidden');
                nav.classList.add('header-fixed');
            } else {
                nav.classList.add('header-hidden');
                nav.classList.remove('header-fixed');
            }
        }, { passive: true });
    };

    // Efeito de Digitação
    const initTypewriter = () => {
        const target = document.querySelector('.hero-typewriter');
        if (!target) return;
        const text = target.innerText;
        target.innerText = '';
        let i = 0;

        const type = () => {
            if (i < text.length) {
                target.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        };
        setTimeout(type, 800);
    };

    // Revelar Elementos no Scroll
    const initScrollReveal = () => {
        const elements = document.querySelectorAll('.spec-card, .repo-card, .glass-morphism');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "all 0.6s ease-out";
            observer.observe(el);
        });
    };

    return {
        init: () => {
            initStars();
            initHeader();
            initTypewriter();
            initScrollReveal();
            console.log("Andrey Portfolio: Pronto.");
        }
    };
})();

document.addEventListener('DOMContentLoaded', Portfolio.init);
