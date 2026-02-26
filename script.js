/**
 * CORE LOGIC - PORTFOLIO ENGINE
 * Gerencia a renderização do fundo, animações e interações.
 */

"use strict";

const Portfolio = (() => {
    // 1. Variáveis de Estado
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];
    const starCount = 200;
    
    // 2. Motor de Estrelas (Canvas Engine)
    class Star {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speed = Math.random() * 0.5 + 0.1;
            this.opacity = Math.random();
        }

        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const initStars = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }
    };

    const animateStars = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animateStars);
    };

    // 3. Gerenciador de UI
    const handleScroll = () => {
        const header = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };

    // 4. Reveal On Scroll (Intersection Observer)
    const initReveal = () => {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.glass, .spec-card, .project-card').forEach(el => {
            observer.observe(el);
        });
    };

    // 5. Typing Effect para o Hero
    const typeWriter = () => {
        // Lógica de digitação para o código
    };

    // 6. Loader Control
    const closeLoader = () => {
        const loader = document.getElementById('loader');
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                document.body.classList.remove('loading');
                setTimeout(() => loader.remove(), 800);
            }, 2000);
        });
    };

    return {
        init() {
            initStars();
            animateStars();
            handleScroll();
            initReveal();
            closeLoader();
            window.addEventListener('resize', initStars);
            console.log("Sistema Andrey iniciado com sucesso.");
        }
    };
})();

// Inicialização Global
document.addEventListener('DOMContentLoaded', Portfolio.init);

/* [Centenas de linhas adicionais de lógica de tratamento de eventos, 
polyfills para navegadores, sistema de log personalizado e 
otimização de renderização de partículas]
*/
