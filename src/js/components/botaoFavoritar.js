import { exibirAlerta } from "./alertaadicao.js";
import { indicarProdutosNoCarrinhoEFavoritos } from "./indicador-notificacao.js";

export function ouvinteBotaoFavoritar(){
    new botaoFavoritar()
}
class botaoFavoritar{
    constructor(){
        this.botoesFavoritos = document.querySelectorAll(".botao-favoritos i");
        this.favoritos = JSON.parse(localStorage.getItem("meusFavoritos")) || [];
        
        this.buscarFavoritosClientes();
        this.ouvinteBotaoFavoritar();
    }
    ouvinteBotaoFavoritar(){
        this.botoesFavoritos.forEach(botao => {
            botao.addEventListener("click", async () => {
                const cardSelecionado = botao.closest(".card");
                const idProduto = cardSelecionado.dataset.id;
                const idCliente = JSON.parse(localStorage.getItem("idUser"));

            if (!this.favoritos.includes(idProduto)) {
                this.favoritos.push(idProduto);
                
                botao.style.color = "gold";

                try{
                    const resultado = await fetch("https://ecomerce-echomoda.onrender.com/api/salvar-favoritos",{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify({
                            idclient:idCliente,
                            idproduto:Number(idProduto),
                        })
                    })
                    if(resultado.status === 200){
                        exibirAlerta("Produto adicionado aos favoritos","sucesso");
                    }else{
                        exibirAlerta("Produto ja esta nos favoritos","erro");
                        return
                    }
                }catch(erro){
                    exibirAlerta("Erro com o servidor",erro)
                    return
                }
                    localStorage.setItem("meusFavoritos", JSON.stringify(this.favoritos));

                } else {
                    try{
                        const resultadoDeletar = await fetch("https://ecomerce-echomoda.onrender.com/api/remover-favoritos",{
                            method:"DELETE",
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify({
                                idclient:idCliente,
                                idproduto:Number(idProduto), 
                            })
                        })
                        if(resultadoDeletar.status === 200){
                            exibirAlerta("Produto removido dos favoritos","sucesso")
                        }
                        if(resultadoDeletar.status === 400){
                            exibirAlerta("Erro ao remover produto","erro")
                        }
                    }catch(erro){
                            exibirAlerta("Tivemos um erro com o servidor","erro")
                    }
                this.favoritos = this.favoritos.filter(id => id !== idProduto);
                botao.style.color = "inherit";

            }
            localStorage.setItem("meusFavoritos", JSON.stringify(this.favoritos));
            indicarProdutosNoCarrinhoEFavoritos()
        })
    })
    }
    async buscarFavoritosClientes(){
        if(this.favoritos.length === 0){
            const idCliente = JSON.parse(localStorage.getItem("idUser"))
        
            try{
                const resultado = await fetch(`https://ecomerce-echomoda.onrender.com/api/buscar-favoritos?idclient=${idCliente}`,{
                    method:"GET",
                    headers:{"Content-Type":"application/json"},
                })

                const produtos = await resultado.json()

                if(resultado.status === 200){
                    const idsFavoritos = produtos.map(produto => produto.id_produto)

                    localStorage.setItem("meusFavoritos",JSON.stringify(idsFavoritos))

                    this.favoritos = idsFavoritos
                }else{
                    return
                }
            }catch(erro){
                exibirAlerta("Erro com o servidor",erro)
            }
            indicarProdutosNoCarrinhoEFavoritos()

    }
}
}