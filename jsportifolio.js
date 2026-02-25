const username = "asRamoos"; 

fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
        const reposContainer = document.getElementById("repos");

        data.forEach(repo => {
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