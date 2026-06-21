import { indicarProdutosNoCarrinhoEFavoritos } from "./indicador-notificacao.js";

export function ouvinteBotaoFavoritar(){
    new botaoFavoritar()
}
class botaoFavoritar{
    constructor(){
        this.botoesFavoritos = document.querySelectorAll(".botao-favoritos i");
        this.favoritos = JSON.parse(localStorage.getItem("meusFavoritos")) || [];
    }
    ouvinteBotaoFavoritar(){
        this.botoesFavoritos.forEach(botao => {
            botao.addEventListener("click", () => {
                const cardSelecionado = botao.closest(".card");
                const idProduto = cardSelecionado.dataset.id;
                const alertaSalvamentoFavorito = document.querySelector(".confirmacao-adicao-carrinho");
            
            if (!this.favoritos.includes(idProduto)) {
                this.favoritos.push(idProduto);
                
                botao.style.color = "gold";

                const alertaAdicao = document.querySelector(".confirmacao-adicao-carrinho");
                alertaAdicao.querySelector(".container h5").innerHTML = `<i class="fas fa-check-circle me-2" style="color: #28a745;"></i>Produto adicionado aos favoritos`;
                    
                    alertaAdicao.style.display = "flex";

                    setTimeout(() => {
                        alertaAdicao.querySelector(".container").style.transform = "translateY(0)";
                    },200)

                    setTimeout(() => {
                        alertaAdicao.querySelector(".container").style.transform = "translateY(130%)";
                    
                    setTimeout(() => {
                        alertaAdicao.style.display = "none";
                    },600)
                },1000)
            } else {
                this.favoritos = this.favoritos.filter(id => id !== idProduto);
                botao.style.color = "inherit";

                    const alertaAdicao = document.querySelector(".confirmacao-adicao-carrinho");
                    alertaAdicao.querySelector(".container h5").innerHTML = `<i class="fas fa-times-circle me-2" style="color: #dc3545;"></i>Produto removido dos favoritos`;

                    alertaAdicao.style.display = "flex";

                    setTimeout(() => {
                        alertaAdicao.querySelector(".container").style.transform = "translateY(0)";
                    },200)

                    setTimeout(() => {
                        alertaAdicao.querySelector(".container").style.transform = "translateY(130%)";
                    
                    setTimeout(() => {
                        alertaAdicao.style.display = "none";
                    },600)
                },1000)
            }
            localStorage.setItem("meusFavoritos", JSON.stringify(this.favoritos));
            indicarProdutosNoCarrinhoEFavoritos()
        })
    })
    }
}