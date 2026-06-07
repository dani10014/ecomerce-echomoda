// Função para sanitizar dados e prevenir XSS
function sanitizarHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}
export function criarCardProdutos(dado){
    const containerCards = document.querySelector('.produtos-camisas .container-base-card');
    const containerTenis = document.querySelector('.produtos-tenis .container-base-card');

    const cardProduto = document.createElement('div');

            cardProduto.classList.add("base-card")

            const idUnico = `${dado.id}`;

            cardProduto.innerHTML = `<div class='card' data-id="${idUnico}">
                                        <div  id="${idUnico}" class="carousel slide" data-bs-ride="carousel">
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
                                        <h3>${sanitizarHTML(dado.preco)}</h3>
                                    </div>
                                    <div class="botao-favoritos">
                                        <i class="fa-solid fa-star"></i>
                                    </div>
                                </div>`
            if(dado.categoria === "tenis" && containerTenis){
                containerTenis.appendChild(cardProduto);
            }
            if(dado.categoria === "blusa" && containerCards){
                containerCards.appendChild(cardProduto);
            }
    }
    
export async function buscarProdutos() {
    try {
        const resposta = await fetch('./../produtos.json');
        
        if (!resposta.ok) throw new Error('Erro ao carregar JSON');
        
        const produtos = await resposta.json();

        /** Aqui onde filtrei o tipo de produto por cada secao */
        const apenasBlusas = produtos.filter(item => item.categoria === "blusa");
        const apenasTenis = produtos.filter(item => item.categoria === "tenis")

        console.log("Produtos da Echo Moda:", produtos);

        /** Criamos os cards que filtramos dinamicamente, usando o innerHTML para criar a estrutura do card e depois adicionamos ele ao container */
        apenasBlusas.forEach(dado => {
            criarCardProdutos(dado);
        });

        apenasTenis.forEach(dado => {
            criarCardProdutos(dado);
    })

    } catch (erro) {
        console.error("Falha no fetch:", erro);
    }
}
