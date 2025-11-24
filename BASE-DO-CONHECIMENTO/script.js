let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

async function iniciarBusca() {
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (erro) {
            console.error("Erro ao buscar os dados:", erro);
            return;
        }
}

const termoBusca = campoBusca.value.toLowerCase();
const dadosFiltrados = dados.filter(dado => {
    return dado.nome.toLowerCase().includes(termoBusca) || 
           dado.descricao.toLowerCase().includes(termoBusca);
});

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = "";
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
                <p>
                    ${dado.ano}
                </p>
                <p>
                    ${dado.descricao}
                </p>
                <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(article);
    }
}

// Adiciona um evento que chama a função de busca sempre que o usuário digita no campo de busca.
campoBusca.addEventListener("keyup", iniciarBusca);
