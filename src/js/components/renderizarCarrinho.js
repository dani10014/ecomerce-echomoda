import { verificarUsuarioExiste } from "../main.js";
import { exibirAlerta } from "./alertaadicao.js";

verificarUsuarioExiste();

export function inicarRenderizacaoProdutosCarrinhos() {
    new cardsCarrinho
}
    class cardsCarrinho{
        constructor(){
        this.valorTotal = 0;
        this.IndicadorTotal = document.querySelector(".valor-total");
        this.produtosCarrinho = JSON.parse(localStorage.getItem("produtosCarrinho")) || [];
        this.containerCardsCarrinho = document.querySelector(".base-cards-carrinho");
        this.botaoFinalizarCompra = document.querySelector(".botao-finalizar-compra");
        this.containerCardsCarrinho.innerHTML = "";

        this.verificaProdutosPresente();
        this.desenharCardExistente();
        this.criarQuantidadeValorECor();
        this.ouvinteRemoverCard();

        }
        verificaProdutosPresente(){
            if (this.produtosCarrinho.length < 1) {
                this.containerCardsCarrinho.innerHTML = `<p class="text-center text-light mb-0">Nada no carrinho</p>`;
                this.valorTotal = 0;
                this.IndicadorTotal.innerText = `R$ ${this.valorTotal}`;
                this.botaoFinalizarCompra.style.transform = "translateY(120%)";
                    setTimeout(() => {
                        this.botaoFinalizarCompra.style.display = "none";
                    },200)
            return;
            }else{
                this.botaoFinalizarCompra.style.display = "flex";
                setTimeout(() => {
                    this.botaoFinalizarCompra.style.transform = "translateY(0)";
                },200)
            }
        }
        desenharCardExistente(){
            this.produtosCarrinho.forEach(dados => {
                const cardProduto = document.createElement('div');
                cardProduto.innerHTML = `
                    <div class='card' data-id="${dados.id}">
                        <img src='${dados.imagem}'>
                    <div class='card-body'>
                        <h5 class='card-title'>${dados.nome}</h5>
                        <h3 class="valor">${dados.valor}</h3>
                        <h5 class="mb-0 mt-3">Tamanho:</h5>
                        <h4 class="tamanho">${dados.tamanho}</h4>
                        <h5 class="mb-0 mt-3">Cor:</h5>
                        <h4 class="cor">${dados.cor}</h4>
                        <h5 class="mb-0 mt-3">Quantidade:</h5>
                        <h4 class="quantidade">${dados.quantidade}</h4>
                    </div>
                    <div class="botao-remover">
                        <button class="botao-remover__botao">
                            Remover
                        </button>
                    </div>
                    </div>`; 
    
            this.containerCardsCarrinho.appendChild(cardProduto);
            });
        }
        criarQuantidadeValorECor(){
            const cardExistentes = document.querySelectorAll(".base-cards-carrinho .card");

            let somaDosValores = 0;

            cardExistentes.forEach(card => {
                const valor = card.querySelector(".card-body .valor").innerText;
                const quantidade = card.querySelector(".card-body .quantidade").innerText;

                const valorEmFloat = parseFloat(valor.replace("R$ ", ""));
                let quantidadeEmFloat = parseFloat(quantidade);

                const valorTotalDoCard = valorEmFloat * parseInt(quantidadeEmFloat);

                somaDosValores += valorTotalDoCard; 
            });
            this.IndicadorTotal.innerText = `R$ ${somaDosValores.toFixed(2).replace('.', ',')}`;
        }
        ouvinteRemoverCard(){
            const botaoRemover = document.querySelectorAll(".botao-remover__botao");
    
            botaoRemover.forEach(btnDeletar => {
            if (btnDeletar) {
                btnDeletar.addEventListener("click", (event) => {
                    event.stopPropagation();

                    const card = btnDeletar.closest(".card");

                    card.style.transition = "opacity 0.5s ease";
                    card.style.opacity = "0";
                    exibirAlerta("Produto removido do carrinho","sucesso");

                    setTimeout(() => {
                        const corProduto = card.querySelector(".card-body .cor").innerText;
                        const tamanhoProduto = card.querySelector(".card-body .tamanho").innerText;
                        const idProduto = card.dataset.id;

                        const novaArraySemObjeto = this.produtosCarrinho.filter(item => {
                            return !(String(item.id) === String(idProduto) && 
                                String(item.tamanho) === String(tamanhoProduto) && 
                                String(item.cor) === String(corProduto));
                            });
                    
                    this.produtosCarrinho = novaArraySemObjeto;

                    localStorage.setItem("produtosCarrinho", JSON.stringify(this.produtosCarrinho));
                
                    inicarRenderizacaoProdutosCarrinhos();
                    }, 500);
                });
            }
        });
        }
        
    }



        