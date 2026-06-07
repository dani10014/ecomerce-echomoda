import { iniciarCarroselSlick } from "./carrosel-slick.js";

function sanitizarHTML(texto) {
    const div = document.createElement('div');
    div.textContent = String(texto); // Garante que aceita números sem quebrar
    return div.innerHTML;
}

function criarCardHTML(dado) {
    const cardProduto = document.createElement('div');
    cardProduto.classList.add("base-card");
    
    const idUnico = `${dado.id}`;
    cardProduto.innerHTML = `
        <div class='card' data-id="${idUnico}">
            <div id="${idUnico}" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="${dado.imagem}" alt="First slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="${dado.imagem2}" alt="Second slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="${dado.imagem3}" alt="Third slide">
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
                <h5 class='card-title'>${sanitizarHTML(dado.nome)}</h5>
                <h3>R$ ${sanitizarHTML(dado.preco)}</h3>
            </div>
            <div class="botao-favoritos">
                <i class="fa-solid fa-star"></i>
            </div>
        </div>`;
    return cardProduto;
}

export function filtrarProdutos(){
    const containerFiltrar = document.querySelector(".container-filtrar");
    const botaoFiltrar = document.querySelector(".pesquisa__botao-filtrar");
    const fundoBorrado = document.querySelector(".backdrop-glass");
    const botaoFecharMenuFiltrar = document.querySelector(".container-filtrar .btn-close");
    const btnConfirmarFiltragem = document.querySelector(".btn-confirmar-filtragem");
    let containerRoupas = document.querySelector(".produtos-camisas .container-base-card");
    let containerTenis = document.querySelector(".produtos-tenis .container-base-card");
    let valorMinimo = document.querySelector("#valor-minimo");
    let valorMaximo = document.querySelector("#valor-maximo");


    async function filtrarDadosCliente(){
        try {
            const resposta = await fetch('./../produtos.json');
            if (!resposta.ok) throw new Error('Erro ao carregar JSON');
            
            const produtos = await resposta.json();
            
            const min = Number(valorMinimo.value);
            const max = Number(valorMaximo.value);

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

    btnConfirmarFiltragem.addEventListener("click", async function (event){
        event.preventDefault(); 

        if(valorMaximo.value === "" && valorMinimo.value === ""){
            alert("Nada presente nos campos");
            return;
        }

        /*coleta de Produtos de acordo com o nosso jason*/
        const produtosComEssaFaixa = await filtrarDadosCliente();

        if (produtosComEssaFaixa && produtosComEssaFaixa.length > 0) {

            containerRoupas.innerHTML = "";
            containerTenis.innerHTML = "";
            

            /* separacao de produto por categoria */
            const produtosBlusa = produtosComEssaFaixa.filter(item => item.categoria === "blusa");
            const produtoTenis = produtosComEssaFaixa.filter(item => item.categoria === "tenis");

            produtosBlusa.forEach(dado => {
                const card = criarCardHTML(dado);
                containerRoupas.appendChild(card);
            });

            produtoTenis.forEach(dado => {
                const card = criarCardHTML(dado);
                containerTenis.appendChild(card);
            });

            valorMaximo.value = "";
            valorMinimo.value = "";
            containerFiltrar.style.transform = "scale(0)";
            fundoBorrado.style.display = "none";
        }
    }); 

    botaoFiltrar.addEventListener("click", function(){
        containerFiltrar.style.transform = "scale(1)";
        fundoBorrado.style.display = "flex";
    });

    botaoFecharMenuFiltrar.addEventListener("click", function(){
        containerFiltrar.style.transform = "scale(0)";
        fundoBorrado.style.display = "none";
        valorMaximo.value = "";
        valorMinimo.value = "";
    });

    document.addEventListener("click", function(event){
        if(event.target === fundoBorrado){
            containerFiltrar.style.transform = "scale(0)";
            valorMaximo.value = "";
            valorMinimo.value = "";
            setTimeout(function(){
                fundoBorrado.style.display = "none";
            });
        }
    });
}