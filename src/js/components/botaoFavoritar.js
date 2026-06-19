import { indicarProdutosNoCarrinhoEFavoritos } from "./indicador-notificacao.js";

export function ouvinteBotaoFavoritar(){

    /**Coletamos os botoes de favoritar  e puxamos o localStorage**/
    const botoesFavoritos = document.querySelectorAll(".botao-favoritos i");
    let favoritos = JSON.parse(localStorage.getItem("meusFavoritos")) || [];

    botoesFavoritos.forEach(botao => {
        /**Adicionamos ouvintes em cada botao*/
        botao.addEventListener("click", () => {
            const cardSelecionado = botao.closest(".card");
            const idProduto = cardSelecionado.dataset.id;
            const alertaSalvamentoFavorito = document.querySelector(".confirmacao-adicao-carrinho");

            
            console.log("ID do produto clicado:", idProduto);
            
            if (!favoritos.includes(idProduto)) {
                favoritos.push(idProduto);
                
                botao.style.color = "gold";

                const alertaAdicao = document.querySelector(".confirmacao-adicao-carrinho");
                alertaAdicao.querySelector(".container h5").innerHTML = `<i class="fas fa-check-circle me-2" style="color: #28a745;"></i>Produto adicionado aos favoritos`;
                    
                    alertaAdicao.style.display = "flex";

                    setTimeout(function(){
                        alertaAdicao.querySelector(".container").style.transform = "translateY(0)";
                    },200)

                    setTimeout(function(){
                        alertaAdicao.querySelector(".container").style.transform = "translateY(130%)";
                    
                    setTimeout(function(){
                        alertaAdicao.style.display = "none";
                    },600)
                },1000)
            } else {
                favoritos = favoritos.filter(id => id !== idProduto);
                botao.style.color = "inherit";

                    const alertaAdicao = document.querySelector(".confirmacao-adicao-carrinho");
                    alertaAdicao.querySelector(".container h5").innerHTML = `<i class="fas fa-times-circle me-2" style="color: #dc3545;"></i>Produto removido dos favoritos`;

                    alertaAdicao.style.display = "flex";

                    setTimeout(function(){
                        alertaAdicao.querySelector(".container").style.transform = "translateY(0)";
                    },200)

                    setTimeout(function(){
                        alertaAdicao.querySelector(".container").style.transform = "translateY(130%)";
                    
                    setTimeout(function(){
                        alertaAdicao.style.display = "none";
                    },600)
                },1000)
            }
            localStorage.setItem("meusFavoritos", JSON.stringify(favoritos));
            indicarProdutosNoCarrinhoEFavoritos()
        })
    })
}