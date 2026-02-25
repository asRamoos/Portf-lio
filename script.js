/**
 * PORTFÓLIO ENGINE - ANDREY
 * JavaScript Robusto para UI e API GitHub
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const header = document.getElementById('main-header');
    const githubContainer = document.getElementById('github-projects');
    
    // --- 1. HEADER DINÂMICO ---
    window.addEventListener('scroll', () => {
        // Ativa o header fixo após scroll de 100px
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. INTEGRAÇÃO API GITHUB ---
    async function fetchProjects() {
        // Substitua 'SEU-USER-AQUI' pelo seu username real do GitHub
        const GITHUB_USER = 'Andrey-dev'; 
        
        try {
            // Buscando repositórios do usuário
            const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos`);
            const repos = await response.json();

            // Limpa o container de loading
            githubContainer.innerHTML = '';

            // Filtramos apenas o BigStreet (ou mostramos todos caso queira)
            // Aqui vamos forçar a exibição do BigStreet conforme solicitado
            const projectsToShow = repos.filter(repo => repo.name.toLowerCase() === 'bigstreet');

            if (projectsToShow.length === 0) {
                // Caso o repo ainda não exista publicamente, criamos um card manual
                renderManualProject();
            } else {
                projectsToShow.forEach(repo => {
                    renderProjectCard(repo);
                });
            }

        } catch (error) {
            console.error('Erro ao buscar GitHub:', error);
            renderManualProject();
        }
    }

    function renderProjectCard(repo) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>Site para localizar eventos esportivos próximos ao usuário. Integração inteligente com geolocalização.</p>
            <div class="tech-stack">
                <span>HTML</span> • <span>CSS</span> • <span>Java</span> • <span>Python</span> • <span>DB</span>
            </div>
            <a href="${repo.html_url}" target="_blank" class="contact-link" style="display:block; margin-top:20px; font-weight:bold">Ver Repositório →</a>
        `;
        githubContainer.appendChild(card);
    }

    function renderManualProject() {
        githubContainer.innerHTML = `
            <div class="project-card">
                <div class="card-tag">Em destaque</div>
                <h3>BigStreet</h3>
                <p>Plataforma Full Stack para localização e gestão de eventos esportivos urbanos em tempo real.</p>
                <div class="tech-stack">
                    <strong>Stack:</strong> HTML, CSS, Java, Python, Banco de Dados, API
                </div>
                <div style="margin-top:20px; font-size: 0.9rem; color: var(--primary)">Repositório Privado/Sincronizando...</div>
            </div>
        `;
    }

    // --- 3. EFEITO DE PARALLAX SUAVE NAS ESTRELAS ---
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.getElementById('stars').style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
        document.getElementById('stars2').style.transform = `translate(-${x * 40}px, -${y * 40}px)`;
    });

    // Iniciar busca
    fetchProjects();
});
