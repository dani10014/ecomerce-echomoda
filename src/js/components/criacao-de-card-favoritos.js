import {IniciarMenuVertical} from "./menu-vertical.js";

function sanitizarHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}
export async function criarCardFavoritos() { // Adicionei 'async' aqui
    let produtosFavoritados = localStorage.getItem("meusFavoritos");
    const containerCardsFavritos = document.querySelector(".produtos-favoritados");

    let produtosFavoritadosObjeto = JSON.parse(produtosFavoritados) || [];

    
    containerCardsFavritos.innerHTML = "";

    if (produtosFavoritadosObjeto.length < 1) {
        containerCardsFavritos.innerHTML = `<p class="text-light text-center nenhum-favorito mb-0">Nenhum produto favoritado</p>`;
    }

    async function buscarEFiltrarProdutos(id) {
        try {
            const resposta = await fetch('./../produtos.json');

            const todosOsProdutos = await resposta.json();

            const idNumerico = Number(String(id).replace(/\D/g, ''));
            
            return todosOsProdutos.find(item => Number(item.id) === idNumerico);

        } catch (erro) {
            console.error("Erro ao filtrar dados:", erro);
        }
    }


    for (const id of produtosFavoritadosObjeto) {
        const produtoSelecionado = await buscarEFiltrarProdutos(id);

        if (produtoSelecionado) {
        
            const cardProduto = document.createElement('div');
            const idCarrossel = `carrossel-${produtoSelecionado.id}`;
            
            cardProduto.innerHTML = ` <div class='card' data-id="${produtoSelecionado.id}">
                                            <img src='${produtoSelecionado.imagem}'>
                                            <div class='card-body'>
                                                <h5 class='card-title'>${sanitizarHTML(produtoSelecionado.nome)}</h5>
                                                <h3>${sanitizarHTML(produtoSelecionado.preco)}</h3>
                                            </div>
                                                <div class="botao-remover">
                                                    <button class="botao-remover__botao">
                                                        Remover
                                                    </button>
                                                </div>
                                        </div>`
            containerCardsFavritos.appendChild(cardProduto);
        }
    }
    const cardExistentes = document.querySelectorAll(".card");

    cardExistentes.forEach(card => {
        const botaoRemover = card.querySelectorAll(".botao-remover");
            botaoRemover.forEach(botao => {

                botao.addEventListener("click", (event) => {
                    event.stopPropagation();

                    card.style.filter = "opacity(0)";

                    setTimeout(function(){
                        const idProduto = card.dataset.id;

                        const novaArraySemObejeto = produtosFavoritadosObjeto.filter(id => String(id) !== String(idProduto));

                        produtosFavoritados = novaArraySemObejeto;

                        localStorage.setItem("meusFavoritos", JSON.stringify(produtosFavoritados));
                    
                        criarCardFavoritos()
                    },500)
            });
        
    });
})
    const setaVoltarHome = document.querySelector("#seta-voltar-home");
        setaVoltarHome.addEventListener("click", () => {
            window.location.href = "index.html";
        });
        IniciarMenuVertical()
}
