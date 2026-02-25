/**
 * ANDREY CORE ENGINE V6.0 
 * Gerenciamento de Scroll, Typewriter e Efeitos Visuais
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Controle do Cabeçalho (Só aparece ao descer)
    const header = document.getElementById('dynamic-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Se desceu mais de 200px, mostra o header
        if (currentScrollY > 200) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
        
        lastScrollY = currentScrollY;
    });

    // 2. Efeito Typewriter: Full Stack Developer
    const typewriterEl = document.getElementById('typewriter');
    const text = "Full Stack Developer";
    let charIndex = 0;

    function typeEffect() {
        if (charIndex < text.length) {
            typewriterEl.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 150);
        }
    }

    // 3. Sistema de Estrelas Adicionais Dinâmicas (Parallax)
    function createStarParticles() {
        const space = document.querySelector('.space-engine');
        const starCount = 50;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.width = '2px';
            star.style.height = '2px';
            star.style.background = '#fff';
            star.style.borderRadius = '50%';
            
            // Posição Aleatória
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            
            // Animação de Brilho individual
            star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite alternate`;
            star.style.opacity = Math.random();
            
            space.appendChild(star);
        }
    }

    // CSS Injetado para as partículas
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes twinkle {
            from { opacity: 0.2; transform: scale(1); }
            to { opacity: 1; transform: scale(1.5); }
        }
    `;
    document.head.appendChild(styleSheet);

    // 4. Scroll Suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // 5. Iniciar Sequência
    createStarParticles();
    setTimeout(typeEffect, 1000);
});
