import { IniciarMenuVertical } from "./menu-vertical.js";
import { iniciarCarroselSlick } from "./carrosel-slick.js";
import { ouvinteBotaoFavoritar } from "./botaoFavoritar.js";

function sanitizarHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

export function buscarProdutoPesquisado(){
    new ProdutoPesquisado
}
class ProdutoPesquisado{
    constructor(){
        this.btnPesquisar = document.getElementById("btn-pesquisar");
        this.espacoDaPesquisa = document.querySelector("#espaco-pesquisa");
        this.containerRoupas = document.querySelector(".produtos-camisas .container-base-card");
        this.containerTenis = document.querySelector(".produtos-tenis .container-base-card");
        this.botaoDropdownTenis = document.getElementById("dropdown-tenis");
        this.debugBotao()
    }
    debugBotao(){
        this.btnPesquisar.addEventListener("click", async () =>{

            if(this.espacoDaPesquisa.value.trim() === ""){
                alert("Nao há nada presente no campo")
                this.espacoDaPesquisa.value = "";
                return
            }

            const produtos = await this.buscarProduto();

            if(produtos.length === 0){
                alert("Erro ao buscar produtos do banco");
                return
            }
            if(produtos.length > 0){
                const termoPesquisa = sanitizarHTML(this.espacoDaPesquisa.value.trim().toLowerCase())

                const produtoPesquisado = produtos.filter(produto => {
                    return produto.nome.toLowerCase().includes(termoPesquisa);
                })

                if(produtoPesquisado.length === 0){
                    alert("nenhum produto encontrado")
                    return
                }
                const $containers = $('.container-base-card');
                $containers.each(function() {
                    if ($(this).hasClass('slick-initialized')) {
                    $(this).slick('unslick');
                }
                });
                this.containerTenis.style.display = "none";
                this.containerRoupas.innerHTML = "";
                this.containerTenis.innerHTML = "";
                this.botaoDropdownTenis.style.display = "none";

                produtoPesquisado.forEach(produto => {
                    const cardProduto = new CriarProduto(produto.id,produto.nome,produto.imagem,produto.imagem2,produto.imagem3,produto.preco)
                    const cardMontado = cardProduto.devolverCard();
                    console.log(cardProduto)
                    this.containerRoupas.appendChild(cardMontado);
                });
                IniciarMenuVertical();
                iniciarCarroselSlick();
                ouvinteBotaoFavoritar();
            }
            this.espacoDaPesquisa.value = "";
        })
    }
    async buscarProduto(){
        try{
            const resposta = await fetch('./../produtos.json');

            if (!resposta.ok) throw new Error('Erro ao carregar JSON');

            const produtos = await resposta.json()

            return produtos

        }
        catch(erro){
            console.error("Falha no fetch:", erro);
            return [];
        }
    }
}
class CriarProduto{
    constructor(id,nome,imagem,imagem2,imagem3,preco){
        this.id = id;
        this.nome = nome
        this.imagem = imagem;
        this.imagem2 = imagem2;
        this.imagem3 = imagem3;
        this.preco = preco;
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
            return cardProduto
    }
}