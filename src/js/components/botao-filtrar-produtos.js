import { iniciarCarroselSlick } from "./carrosel-slick.js";

function sanitizarHTML(texto) {
    const div = document.createElement('div');
    div.textContent = String(texto); // Garante que aceita números sem quebrar
    return div.innerHTML;
}

export function filtrarProdutos(){

class criarCardFiltrado{
    constructor(id,nome,preco,imagem,imagem2,imagem3){
        this.nome = nome;
        this.id = id;
        this.preco = preco;
        this.imagem = imagem;
        this.imagem2 = imagem2;
        this.imagem3 = imagem3;
    }
    devolverCard(){
        const cardProduto = document.createElement('div');
        cardProduto.classList.add("base-card");
    
        const idUnico = `${this.id}`;
        cardProduto.innerHTML = `
        <div class='card' data-id="${idUnico}">
            <div id="${idUnico}" class="carousel slide" data-bs-ride="carousel">
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
                <h3>R$ ${sanitizarHTML(this.preco)}</h3>
            </div>
            <div class="botao-favoritos">
                <i class="fa-solid fa-star"></i>
            </div>
        </div>`;
    return cardProduto;
    }
}
class filtrarProdutos{
    constructor(){

    this.containerFiltrar = document.querySelector(".container-filtrar");
    this.botaoFiltrar = document.querySelector(".pesquisa__botao-filtrar");
    this.fundoBorrado = document.querySelector(".backdrop-glass");
    this.botaoFecharMenuFiltrar = document.querySelector(".container-filtrar .btn-close");
    this.btnConfirmarFiltragem = document.querySelector(".btn-confirmar-filtragem");
    this.containerRoupas = document.querySelector(".produtos-camisas .container-base-card");
    this.containerTenis = document.querySelector(".produtos-tenis .container-base-card");
    this.valorMinimo = document.querySelector("#valor-minimo");
    this.valorMaximo = document.querySelector("#valor-maximo");
    }

    async filtrarDadosCliente(){
        try {
            const resposta = await fetch('./../produtos.json');
            if (!resposta.ok) throw new Error('Erro ao carregar JSON');
            
            const produtos = await resposta.json();
            
            const min = Number(this.valorMinimo.value);
            const max = Number(this.valorMaximo.value);

            const produtosNaFaixa = produtos.filter(item => item.preco >= min && item.preco <= max);
            
            if(produtosNaFaixa.length > 0){
                return produtosNaFaixa;
            } else {
                alert("Nada presente nessa faixa");
                return [];
            }
        } catch (erro) {
            console.error("Falha no fetch:", erro);
            return [];
        }
}
    conFirmarFiltragem(){

        btnConfirmarFiltragem.addEventListener("click", async (event)=> {
        event.preventDefault(); 

        if(this.valorMaximo.value === "" && this.valorMinimo.value === ""){
            alert("Nada presente nos campos");
            return;
        }

        /*coleta de Produtos de acordo com o nosso jason*/
        const produtosComEssaFaixa = await this.filtrarDadosCliente();

        if (produtosComEssaFaixa && produtosComEssaFaixa.length > 0) {

            this.containerRoupas.innerHTML = "";
            this.containerTenis.innerHTML = "";
            

            /* separacao de produto por categoria */
            const produtosBlusa = produtosComEssaFaixa.filter(item => item.categoria === "blusa");
            const produtoTenis = produtosComEssaFaixa.filter(item => item.categoria === "tenis");

            produtosBlusa.forEach(dado => {
                const card = new criarCardFiltrado(dado.id,dado.nome,dado.preco,dado.imagem,dado.imagem2,dado.imagem3);
                this.containerRoupas.appendChild(card.devolverCard());
            });

            produtoTenis.forEach(dado => {
                const card = new criarCardFiltrado(dado.id,dado.nome,dado.preco,dado.imagem,dado.imagem2,dado.imagem3);
                this.containerTenis.appendChild(card.devolverCard());
            });

            this.valorMaximo.value = "";
            this.valorMinimo.value = "";
            this.containerFiltrar.style.transform = "scale(0)";
            this.fundoBorrado.style.display = "none";
        }
    }); 
    }
    ouvinteBotaoFiltrar(){
            this.botaoFiltrar.addEventListener("click", ()=> {
            this.containerFiltrar.style.transform = "scale(1)";
            this.fundoBorrado.style.display = "flex";
    });
    }
    ouvinteBotaoFecharMenuFiltrar(){
            this.botaoFecharMenuFiltrar.addEventListener("click",()=> {
            this.containerFiltrar.style.transform = "scale(0)";
            this.fundoBorrado.style.display = "none";
            this.valorMaximo.value = "";
            this.valorMinimo.value = "";
    });
    }
    fecharMenuClicandoFora(){
        document.addEventListener("click", (event) => {
        if(event.target === this.fundoBorrado){
            this.containerFiltrar.style.transform = "scale(0)";
            this.valorMaximo.value = "";
            this.valorMinimo.value = "";
            setTimeout(function(){
                this.fundoBorrado.style.display = "none";
            });
        }
    });
    }
}
}
    

   

    

    