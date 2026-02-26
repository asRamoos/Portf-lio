// Cabeçalho fixo
window.onscroll = function() {
    const header = document.querySelector('header');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.7)';
    }
};

// Animação de entrada para os cards
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card, .project-card, .testimonial');
    cards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, index * 200); // Animação sequencial
    });
});

// Formulário de contato
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    console.log(`Nome: ${name}, E-mail: ${email}, Mensagem: ${message}`);

    alert('Mensagem enviada com sucesso!');

    // Limpar o formulário
    this.reset();
});
