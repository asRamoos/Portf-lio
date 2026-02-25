/**
 * PORTFOLIO ENGINE - ANDREY
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mecânica Typewriter (Letra por Letra)
    const textElement = document.getElementById('typewriter');
    const phrases = ["Full Stack Developer", "Python Expert", "Java Architect"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 150;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pausa no final
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // 2. Sistema de Estrelas (IDs do CSS)
    function initStars() {
        const layers = [
            { id: 'stars-small', count: 150 },
            { id: 'stars-medium', count: 80 },
            { id: 'stars-large', count: 30 }
        ];

        layers.forEach(layer => {
            const el = document.getElementById(layer.id);
            if (!el) return;
            let shadows = "";
            for (let i = 0; i < layer.count; i++) {
                shadows += `${Math.random() * 2000}px ${Math.random() * 2000}px #FFF${i === layer.count - 1 ? "" : ","}`;
            }
            el.style.boxShadow = shadows;
        });
    }

    // 3. Header dinâmico no scroll
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Iniciar tudo
    type();
    initStars();
});
