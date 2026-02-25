document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efeito Typewriter
    const textEl = document.getElementById('type-text');
    const text = "Full Stack Developer";
    let idx = 0;

    function type() {
        if (idx < text.length) {
            textEl.textContent += text.charAt(idx);
            idx++;
            setTimeout(type, 100);
        }
    }
    setTimeout(type, 1000);

    // 2. Controle do Header no Scroll
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Partículas de estrelas extras via JS para profundidade
    const space = document.querySelector('.space-background');
    for(let i=0; i<30; i++) {
        let star = document.createElement('div');
        star.className = 'moving-star';
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        let duration = 2 + Math.random() * 3;
        
        star.setAttribute('style', `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            opacity: ${Math.random()};
            animation: twinkle ${duration}s infinite alternate;
        `);
        space.appendChild(star);
    }
});

// CSS de animação para as estrelas JS
const style = document.createElement('style');
style.innerHTML = `
@keyframes twinkle {
    from { opacity: 0.2; transform: scale(1); }
    to { opacity: 1; transform: scale(1.5); }
}
`;
document.head.appendChild(style);
