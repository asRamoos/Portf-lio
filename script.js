document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efeito Typewriter: Full Stack Developer
    const typeTarget = document.getElementById('typewriter');
    const text = "Full Stack Developer";
    let i = 0;

    function type() {
        if (i < text.length) {
            typeTarget.textContent += text.charAt(i);
            i++;
            setTimeout(type, 150);
        }
    }

    // 2. Sistema de Estrelas (Background Cosmos)
    function initStars() {
        const smallStars = document.getElementById('stars-small');
        const mediumStars = document.getElementById('stars-medium');
        
        const generate = (el, count) => {
            let shadows = "";
            for (let j = 0; j < count; j++) {
                shadows += `${Math.random() * 2500}px ${Math.random() * 2500}px #FFF${j === count - 1 ? "" : ","}`;
            }
            el.style.boxShadow = shadows;
        }

        generate(smallStars, 200);
        generate(mediumStars, 80);
    }

    // 3. Efeito de Scroll no Nav
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Iniciar
    setTimeout(type, 1000);
    initStars();
});
