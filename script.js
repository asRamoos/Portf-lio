/**
 * PORTFOLIO SCRIPTS - ANDREY
 * Lógica robusta para interface dinâmica
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Loader de Entrada
    const loader = document.getElementById('loader-wrapper');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 800);
        }, 1500);
    });

    // 2. Controle do Header Dinâmico (Fixed no Scroll)
    const header = document.getElementById('main-nav');
    const heroSection = document.getElementById('hero-screen');
    const scrollThreshold = 400; // Distância para fixar o header

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Se passar da metade da primeira página
        if (scrollY > scrollThreshold) {
            header.classList.add('scrolled');
            header.classList.remove('nav-hidden');
        } else if (scrollY > 100) {
            // Entre 100 e 400 ele fica escondido para transição suave
            header.classList.add('nav-hidden');
            header.classList.remove('scrolled');
        } else {
            // No topo absoluto
            header.classList.add('nav-hidden');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // 3. Sistema de Animação das Estrelas (Parallax no Mouse)
    const starLayers = [
        document.getElementById('stars-layer-1'),
        document.getElementById('stars-layer-2'),
        document.getElementById('stars-layer-3')
    ];

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        starLayers.forEach((layer, index) => {
            if (layer) {
                const speed = (index + 1) * 20;
                const moveX = (x - 0.5) * speed;
                const moveY = (y - 0.5) * speed;
                layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    });

    // 4. Efeito Reveal (Mostrar elementos ao rolar)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                revealObserver.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    // Seleciona elementos para observar
    const itemsToReveal = document.querySelectorAll('.glass-card, .project-rect-card, .contact-card-item, .section-heading');
    
    itemsToReveal.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(50px)";
        item.style.transition = "all 1s cubic-bezier(0.19, 1, 0.22, 1)";
        revealObserver.observe(item);
    });

    // Adiciona classe CSS dinâmica para animação de revelação
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal-active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 5. Scroll Suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Compensação do header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Efeito de Digitação no Subtítulo
    const subtitle = document.getElementById('main-subtitle');
    const text = subtitle.innerText;
    subtitle.innerText = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.innerText += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Inicia o typewriter após o loader sumir
    setTimeout(typeWriter, 2500);

    // 7. Console Welcome Message
    console.log("%c ANDREY | FULL STACK DEVELOPER ", "color: #00d2ff; font-size: 20px; font-weight: bold;");
    console.log("Sistema carregado com sucesso. Bem-vindo ao meu portfolio.");
});
