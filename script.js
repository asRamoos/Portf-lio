const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
});


const username = "asRamoos";

// Coloque aqui apenas os repositórios que você quer mostrar
const reposDesejados = [
   "BigStreet"
];

fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
        const reposContainer = document.getElementById("repos");

        data
            .filter(repo => reposDesejados.includes(repo.name))
            .forEach(repo => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description ? repo.description : "Sem descrição"}</p>
                    <a href="${repo.html_url}" target="_blank">Ver Projeto</a>
                `;

                reposContainer.appendChild(card);
            });
    })
    .catch(error => console.error("Erro ao buscar repositórios:", error));


