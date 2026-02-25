/**
 * PORTFOLIO ENGINE v2.0 - ANDREY
 * Responsável por:
 * 1. Scroll Intelligence (Header Fix)
 * 2. Gerador de Estrelas (Background)
 * 3. Integração GitHub API com Fallback Técnico
 * 4. UX & Motion Effects
 */

const PortfolioEngine = (() => {

    // Configurações Globais
    const CONFIG = {
        githubUser: 'Andrey-dev', // Substitua pelo seu user real
        starsCount: 150,
        scrollThreshold: 150
    };

    // --- Módulo: Background Estelar ---
    const initStars = () => {
        const layers = ['stars-small', 'stars-medium', 'stars-large'];
        
        layers.forEach((layerId, index) => {
            const layer = document.getElementById(layerId);
            let shadows = "";
            const density = CONFIG.starsCount / (index + 1);

            for (let i = 0; i < density; i++) {
                const x = Math.floor(Math.random() * window.innerWidth);
                const y = Math.floor(Math.random() * 2000);
                shadows += `${x}px ${y}px #FFF${i < density - 1 ? ',' : ''}`;
            }
            layer.style.boxShadow = shadows;
        });
    };

    // --- Módulo: Header & Scroll ---
    const initHeaderScroll = () => {
        const header = document.getElementById('main-nav');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Lógica de fixar/esconder header
            if (currentScroll > CONFIG.scrollThreshold) {
                header.classList.add('header-fixed');
                header.classList.remove('header-hidden');
            } else {
                header.classList.remove('header-fixed');
                header.classList.add('header-hidden');
            }

            lastScroll = currentScroll;
        });
    };

    // --- Módulo: GitHub API ---
    const fetchGitHubProjects = async () => {
        const feed = document.getElementById('github-feed');

        try {
            const response = await fetch(`https://api.github.com/users/${CONFIG.githubUser}/repos?sort=updated&per_page=6`);
            if (!response.ok) throw new Error('Falha na API');
            
            const repos = await response.json();
            
            // Limpa o loader
            feed.innerHTML = '';

            // Renderiza repositórios ou Fallback (BigStreet)
            const hasBigStreet = repos.some(r => r.name.toLowerCase() === 'bigstreet');
            
            if (!hasBigStreet) {
                renderBigStreetFallback();
            }

            repos.forEach(repo => {
                if(repo.name.toLowerCase() !== 'bigstreet') {
                    renderRepoCard(repo);
                }
            });

        } catch (error) {
            console.error('Erro na carga de projetos:', error);
            renderBigStreetFallback();
        }
    };

    const renderRepoCard = (repo) => {
        const feed = document.getElementById('github-feed');
        const card = document.createElement('div');
        card.className = 'repo-card';
        card.innerHTML = `
            <div class="repo-header">
                <i class="far fa-folder-open"></i>
                <div class="repo-links">
                    <a href="${repo.html_url}" target="_blank"><i class="fab fa-github"></i></a>
                </div>
            </div>
            <h3>${repo.name}</h3>
            <p>${repo.description || 'Sem descrição definida no repositório.'}</p>
            <div class="repo-footer">
                <span class="repo-lang">${repo.language || 'Code'}</span>
                <span class="repo-stars"><i class="far fa-star"></i> ${repo.stargazers_count}</span>
            </div>
        `;
        feed.appendChild(card);
    };

    const renderBigStreetFallback = () => {
        const feed = document.getElementById('github-feed');
        const card = document.createElement('div');
        card.className = 'repo-card featured';
        card.style.borderColor = 'var(--clr-primary)';
        card.innerHTML = `
            <div class="repo-header">
                <i class="fas fa-map-marked-alt" style="color:var(--clr-primary)"></i>
                <span class="badge">Destaque</span>
            </div>
            <h3>BigStreet</h3>
            <p>Plataforma Full Stack robusta para localização de eventos esportivos. Implementa geolocalização em tempo real e gestão de usuários.</p>
            <div class="tech-stack-inline">
                <span>Python</span> <span>Java</span> <span>SQL</span> <span>JS</span>
            </div>
            <div class="repo-footer">
                <span class="status">Produção</span>
                <a href="#" class="btn-text">Ver Estudo de Caso →</a>
            </div>
        `;
        feed.prepend(card);
    };

    // --- Módulo: Reveal Animations ---
    const initRevealOnScroll = () => {
        const observerOptions = { threshold: 0.15 };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.glass, .spec-card, .section-title').forEach(el => {
            observer.observe(el);
        });
    };

    // Public API
    return {
        start: () => {
            console.log("%c Andrey Portfolio Engine Activated ", "background: #38bdf8; color: #000; font-weight: bold;");
            initStars();
            initHeaderScroll();
            fetchGitHubProjects();
            initRevealOnScroll();
        }
    };
})();

// Inicialização
document.addEventListener('DOMContentLoaded', PortfolioEngine.start);
