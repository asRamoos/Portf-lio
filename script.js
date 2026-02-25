/**
 * ANDREY PROFESSIONAL PORTFOLIO ENGINE v8.0
 * Lógica de UI, Animações e Monitoramento de Scroll
 */

"use strict";

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. TYPEWRITER SYSTEM ---
    const typewriter = () => {
        const target = document.getElementById('type-target');
        const text = "Full Stack Developer";
        let index = 0;
        const speed = 150;

        function render() {
            if (index < text.length) {
                target.textContent += text.charAt(index);
                index++;
                setTimeout(render, speed);
            }
        }
        setTimeout(render, 1200);
    };

    // --- 2. SMART HEADER LOGIC ---
    // Faz o cabeçalho aparecer apenas após o scroll inicial
    const headerLogic = () => {
        const header = document.getElementById('main-navigation');
        const threshold = 300;

        window.addEventListener('scroll', () => {
            if (window.scrollY > threshold) {
                header.classList.add('active');
            } else {
                header.classList.remove('active');
            }
        });
    };

    // --- 3. SPACE PARALLAX ENGINE ---
    // Adiciona estrelas dinâmicas extras para profundidade 3D
    const spaceParallax = () => {
        const container = document.querySelector('.space-master-container');
        const count = 40;

        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 3 + 'px';
            
            star.style.position = 'absolute';
            star.style.width = size;
            star.style.height = size;
            star.style.background = '#fff';
            star.style.borderRadius = '50%';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.opacity = Math.random();
            star.style.filter = 'blur(1px)';
            
            // Animação de brilho (twinkle)
            star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite alternate`;
            container.appendChild(star);
        }
    };

    // --- 4. SCROLL SPY (Ativar links do menu conforme rola) ---
    const scrollSpy = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    };

    // --- 5. SMOOTH NAVIGATION ---
    const smoothNav = () => {
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

    // --- 6. UTILS: HOVER GLOW EFFECT ---
    const cardGlowEffect = () => {
        const cards = document.querySelectorAll('.skill-card-white');
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    };

    // --- INICIALIZAÇÃO ---
    try {
        console.log("%c ANDREY PORTFOLIO SYSTEM LOADED v8.0 ", "background: #0088ff; color: #fff; font-weight: bold; padding: 5px;");
        typewriter();
        headerLogic();
        spaceParallax();
        scrollSpy();
        smoothNav();
        cardGlowEffect();
    } catch (err) {
        console.error("System fail:", err);
    }
});

// Twinkle Keyframes Injected
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    @keyframes twinkle {
        from { opacity: 0.3; transform: scale(1); }
        to { opacity: 1; transform: scale(1.5); }
    }
`;
document.head.appendChild(styleSheet);
