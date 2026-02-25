/**
 * ANDREY CORE ENGINE v2.5
 * Controle de animações, Typewriter e Cosmos Background
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MECÂNICA TYPEWRITER (Apenas Full Stack Developer)
    const typeTarget = document.getElementById('typewriter');
    const text = "Full Stack Developer";
    let index = 0;

    function startTypewriter() {
        if (index < text.length) {
            typeTarget.textContent += text.charAt(index);
            index++;
            setTimeout(startTypewriter, 120);
        }
    }

    // 2. SISTEMA DE ESTRELAS DINÂMICAS (Shadow Generation)
    const generateStars = () => {
        const layers = [
            { id: 'stars-small', count: 180, size: 1 },
            { id: 'stars-medium', count: 70, size: 2 },
            { id: 'stars-large', count: 25, size: 3 }
        ];

        layers.forEach(layer => {
            const container = document.getElementById(layer.id);
            if (!container) return;

            let boxShadow = "";
            for (let i = 0; i < layer.count; i++) {
                const x = Math.floor(Math.random() * window.innerWidth);
                const y = Math.floor(Math.random() * 2500); // Altura longa para o scroll
                boxShadow += `${x}px ${y}px #FFF${i === layer.count - 1 ? "" : ","}`;
            }
            container.style.boxShadow = boxShadow;
        });
    };

    // 3. HEADER SCROLL EFFECT
    const header = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. ACTIVE LINK SWITCHER (Scroll Spy Lite)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
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

    // 5. REVEAL ON SCROLL (Observer)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    const revealItems = document.querySelectorAll('.spec-card, .project-card, .glass-morphism');
    revealItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition = "all 0.8s ease-out";
        revealObserver.observe(item);
    });

    // 6. INITIALIZATION
    generateStars();
    setTimeout(startTypewriter, 1000); // Inicia após 1 seg

    console.log("Andrey System Initialized: Full Stack Ready.");
});

// Resetar estrelas se redimensionar a tela
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.getElementById('stars-small').style.boxShadow = "none";
        // Recalcular estrelas
        location.reload(); 
    }, 400);
});
