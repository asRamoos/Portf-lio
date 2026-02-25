document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efeito Digitando: Full Stack Developer
    const typewriterElement = document.getElementById('typewriter');
    const textToType = "Full Stack Developer";
    let index = 0;

    function type() {
        if (index < textToType.length) {
            typewriterElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(type, 150);
        }
    }

    // 2. Sistema de Estrelas Estáticas no Fundo
    function createStars() {
        const starsContainer = document.getElementById('stars-small');
        let shadows = "";
        for (let i = 0; i < 200; i++) {
            shadows += `${Math.random() * 2500}px ${Math.random() * 2500}px #FFF${i === 199 ? "" : ","}`;
        }
        starsContainer.style.boxShadow = shadows;
    }

    // Iniciar tudo
    type();
    createStars();
});
