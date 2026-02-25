/**
 * ANDREY PROFESSIONAL ENGINE v7.0
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efeito de Escrita (Typewriter)
    const typewriter = () => {
        const el = document.getElementById('typewriter');
        const text = "Full Stack Developer";
        let i = 0;

        function typing() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(typing, 100);
            }
        }
        setTimeout(typing, 1200);
    };

    // 2. Controle do Cabeçalho por Scroll
    const headerControl = () => {
        const nav = document.getElementById('dynamic-nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    };

    // 3. Estrelas Dinâmicas Extras (Parallax Manual)
    const createExtraStars = () => {
        const container = document.querySelector('.space-container');
        for (let i = 0; i < 40; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 3;
            star.style.position = 'absolute';
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.background = '#fff';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.borderRadius = '50%';
            star.style.opacity = Math.random();
            star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite alternate`;
            container.appendChild(star);
        }
    };

    // Injeção de CSS para o brilho das estrelas
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes twinkle {
            from { opacity: 0.2; transform: scale(1); }
            to { opacity: 1; transform: scale(1.3); }
        }
    `;
    document.head.appendChild(style);

    // Inicialização
    typewriter();
    headerControl();
    createExtraStars();
});
