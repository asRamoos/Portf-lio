/**
 * ANDREY PORTFOLIO ENGINE
 * Gerencia o sistema de partículas e interações de scroll
 */

// 1. GERENCIAMENTO DAS ESTRELAS (CANVAS)
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const starCount = 350;

// Ajusta o tamanho do canvas para o viewport real
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

// Definição do objeto Estrela
class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.baseOpacity = Math.random() * 0.5 + 0.3;
        this.opacity = this.baseOpacity;
        this.velocity = Math.random() * 0.4 + 0.1;
        this.direction = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
        // Movimento vertical suave
        this.y -= this.velocity;
        
        // Efeito de oscilação da opacidade (brilho)
        this.opacity -= 0.005 * this.direction;
        if (this.opacity <= 0.1 || this.opacity >= this.baseOpacity) {
            this.direction *= -1;
        }

        // Se a estrela sair da tela, reseta ela no fundo
        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Popular o array de estrelas
for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

// Loop de animação (60 FPS aprox)
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// 2. LÓGICA DO HEADER SCROLL
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 3. OBSERVER PARA ANIMAÇÕES DE ENTRADA (FADE IN)
// Cria um efeito de que os cards surgem enquanto você desce a página
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
    });
}, revealOptions);

// Aplicar o observer em todos os cards de especialidades e projetos
document.querySelectorAll('.skill-card, .project-box').forEach(el => {
    // Configura o estado inicial via JS para garantir acessibilidade
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    revealOnScroll.observe(el);
});

// CSS dinâmico para a classe revealed
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(styleSheet);

// 4. SCROLL SUAVE PARA LINKS INTERNOS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log("Sistema Andrey iniciado com sucesso. 🚀");
