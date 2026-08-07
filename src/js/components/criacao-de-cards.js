// Função para sanitizar dados e prevenir XSS
function sanitizarHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}
class CriarProduto{
    constructor(id,nome,imagem,imagem2,imagem3,preco,categoria,cor1,cor2,cor3,cor4){
        this.id = id;
        this.nome = nome
        this.imagem = imagem;
        this.imagem2 = imagem2;
        this.imagem3 = imagem3;
        this.preco = preco;
        this.categoria = categoria;
        this.cor1 = cor1;
        this.cor2 = cor2;
        this.cor3 = cor3;
        this.cor4 = cor4;
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
                                        <div class="estrelas d-flex justify-content-between">
                                            <div class="container-estrelas">
                                                <i class="fas fa-star"></i>
                                                <p class="mb-0">2.5/5</p>
                                            </div>
                                            <div class="container-cores">
                                                    <button id="cor-exibic-tela-inicial-1"></button>
                                                    <button id="cor-exibic-tela-inicial-2"></button>
                                                    <button id="cor-exibic-tela-inicial-3"></button>
                                                    <button id="cor-exibic-tela-inicial-4"></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="botao-favoritos">
                                        <i class="fa-solid fa-star"></i>
                                    </div>
                                </div>`

                            if(this.cor1){
                                cardProduto.querySelector("#cor-exibic-tela-inicial-1").style.backgroundColor = `${this.cor1}`;
                            }else{
                                cardProduto.querySelector("#cor-exibic-tela-inicial-1").style.backgroundColor = "grey";
                            }

                            if(this.cor2){
                                cardProduto.querySelector("#cor-exibic-tela-inicial-2").style.backgroundColor = `${this.cor2}`;
                            }else{
                                cardProduto.querySelector("#cor-exibic-tela-inicial-2").style.backgroundColor = "grey";
                            }

                            if(this.cor3){
                                cardProduto.querySelector("#cor-exibic-tela-inicial-3").style.backgroundColor = `${this.cor3}`;
                            }else{
                                cardProduto.querySelector("#cor-exibic-tela-inicial-3").style.backgroundColor = "grey";
                            }

                            if(this.cor4){
                                cardProduto.querySelector("#cor-exibic-tela-inicial-4").style.backgroundColor = `${this.cor4}`;
                            }else{
                                cardProduto.querySelector("#cor-exibic-tela-inicial-4").style.backgroundColor = "grey";
                            }

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
    let buscaProdutosJaFeita = false;

export async function buscarProdutos() {
    if(buscaProdutosJaFeita === false){
        try {
            const resposta = await fetch("https://ecomerce-echomoda.onrender.com/api/buscar-produtos");
        
            if (!resposta.ok) throw new Error('Erro ao carregar JSON');
        
            const produtos = await resposta.json();
        
            if(!resposta.ok || !Array.isArray(produtos)){
                throw new Error('Resposta inválida do servidor');
            }
        /**Criação dos cards direto da classe CriarProduto */
            produtos.forEach(dado => {
                const card = new CriarProduto(dado.id,dado.nome,dado.imagem,dado.imagem2,dado.imagem3,dado.preco,dado.categoria,dado.cor1,dado.cor2,dado.cor3,dado.cor4,dado.cor5)
                card.devolverCard();
            })

            buscaProdutosJaFeita = true;

        } catch (erro) {
            console.error("Falha no fetch:", erro);
        }
    }
}
