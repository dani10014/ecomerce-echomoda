export function indicarProdutosNoCarrinhoEFavoritos(){
    new indicadorNotificacao();
}
    class indicadorNotificacao{
        constructor(){
            this.indicadorFavorito = document.querySelectorAll(".indicador-favoritos");
            this.indicadorCarrinho = document.querySelector(".indicador-carrinho");
    
            this.produtosFavoritos = JSON.parse(localStorage.getItem("meusFavoritos")) || [];
            this.produtosCarrinho = JSON.parse(localStorage.getItem("produtosCarrinho")) || [];

            this.verificarProdutosFavoritadosECarrinho();
        }
        verificarProdutosFavoritadosECarrinho(){
            if (this.produtosFavoritos.length < 1) {
                if (this.indicadorFavorito) {
                    this.indicadorFavorito.forEach(ponto => {
                        ponto.style.display = "none";
                    });   
                }
            } else {
                if (this.indicadorFavorito) {
                    this.indicadorFavorito.forEach(ponto => {
                        ponto.style.display = "inline-block";
                    });  
                }
            }
            if (this.produtosCarrinho.length < 1) {
                if (this.indicadorCarrinho) {
                    this.indicadorCarrinho.style.display = "none";
                }
            } else {
                if (this.indicadorCarrinho) {
                    this.indicadorCarrinho.style.display = "inline-block"; 
                }
            }
        }

    }