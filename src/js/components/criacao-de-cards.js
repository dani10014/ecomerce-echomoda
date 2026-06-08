// Função para sanitizar dados e prevenir XSS
function sanitizarHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}
class CriarProduto{
    constructor(id,nome,imagem,imagem2,imagem3,preco,categoria){
        this.id = id;
        this.nome = nome
        this.imagem = imagem;
        this.imagem2 = imagem2;
        this.imagem3 = imagem3;
        this.preco = preco;
        this.categoria = categoria;
    }
    devolverCard(){
    const cardProduto = document.createElement('div');

            cardProduto.classList.add("base-card")

            const idUnico = `${this.id}`;

            cardProduto.innerHTML = `<div class='card' data-id="${idUnico}">
                                        <div  id="${idUnico}" class="carousel slide" data-bs-ride="carousel">
                                            <div class="carousel-inner">
                                                <div class="carousel-item active">
                                                    <img class="d-block w-100" src="${this.imagem}" alt="First slide">
                                                </div>
                                                <div class="carousel-item">
                                                    <img class="d-block w-100" src="${this.imagem2}" alt="Second slide">
                                                </div>
                                                <div class="carousel-item">
                                                    <img class="d-block w-100" src="${this.imagem3}" alt="Third slide">
                                                </div>
                                            </div>
                                            <a class="carousel-control-prev" data-bs-target="#${idUnico}" role="button" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="sr-only">Previous</span>
                                            </a>
                                            <a class="carousel-control-next" data-bs-target="#${idUnico}" role="button" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="sr-only">Next</span>
                                            </a> 
                                        </div>
                                    <div class='card-body'>
                                        <h5 class='card-title'>${sanitizarHTML(this.nome)}</h5>
                                        <h3>${sanitizarHTML(this.preco)}</h3>
                                    </div>
                                    <div class="botao-favoritos">
                                        <i class="fa-solid fa-star"></i>
                                    </div>
                                </div>`

                            if(this.categoria === "blusa"){
                                const containerRoupas = document.querySelector(".produtos-camisas .container-base-card");   
                                containerRoupas.appendChild(cardProduto);
                            }
                            if(this.categoria === "tenis"){
                                const containerTenis = document.querySelector(".produtos-tenis .container-base-card");
                                containerTenis.appendChild(cardProduto);
                            }
    }
}
export async function buscarProdutos() {
    try {
        const resposta = await fetch('./../produtos.json');
        
        if (!resposta.ok) throw new Error('Erro ao carregar JSON');
        
        /**Coleta de dados do banco */
        const produtos = await resposta.json();

        console.log("Produtos da Echo Moda:", produtos);

        /**Criação dos cards direto da classe CriarProduto */
        produtos.forEach(dado => {
            const card = new CriarProduto(dado.id,dado.nome,dado.imagem,dado.imagem2,dado.imagem3,dado.preco,dado.categoria);
            card.devolverCard();
        })

    } catch (erro) {
        console.error("Falha no fetch:", erro);
    }
}
