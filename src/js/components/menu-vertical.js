import { indicarProdutosNoCarrinhoEFavoritos } from "./indicador-notificacao.js";

export function IniciarMenuVertical(){
    new menuVerticalBase()
}
    class menuVerticalBase{
        constructor(){
            this.cardClicavel = document.querySelectorAll(".container-base-card .card");
            this.botoesFavoritos = document.querySelectorAll(".botao-favoritos i");
            this.setasDeMudancaDeFoto = document.querySelectorAll(".carousel-control-prev, .carousel-control-next");
            this.menuVertical = document.querySelector(".menu-vertical")
            
            this.stopPropagation();
            this.ouvinteCliqueMenuVertical();
        }
        async buscarEFiltrarProdutos(id){
            try {
                const resposta = await fetch('./../produtos.json');
        
                const todosOsProdutos = await resposta.json();

                const idNumerico = Number(String(id).replace(/\D/g, ''));

                const produtoSelecionado = todosOsProdutos.find(item => Number(item.id) === idNumerico);
        
            return produtoSelecionado

            } catch (erro) {
                console.error("Erro ao filtrar dados:", erro);
            }
        }
        stopPropagation(){
            if(this.setasDeMudancaDeFoto){
                this.setasDeMudancaDeFoto.forEach(seta => {
                    seta.addEventListener("click", (event) => {
                        event.stopPropagation();
                    })
                });
            }
            if(this.botoesFavoritos){
                this.botoesFavoritos.forEach(botao => {
                    botao.addEventListener("click", (event) => {
                        event.stopPropagation();
                    })
                });
            }
        } 
        ouvinteCliqueMenuVertical(){
            this.cardClicavel.forEach(card => {
                card.addEventListener("click", async (event) => {
                const idProduto = card.dataset.id;
                const valorProduto = card.querySelector(".card-body h3").innerText;
            
                console.log(idProduto);
                console.log(valorProduto);
                this.menuVertical.style.display = "block";
                this.menuVertical.style.maxHeight = "100vh";
                this.menuVertical.style.overflowY = "auto";
                document.body.style.overflow = "hidden";
            
                setTimeout(() => {
                    this.menuVertical.style.transform = "translateX(0)";
                },200)  
            
                const produtoEncontrado = await this.buscarEFiltrarProdutos(idProduto);

                this.produtoSelecionado = produtoEncontrado;
                this.idCard = idProduto;

                if (produtoEncontrado) {
                    console.log("Descrição vindo do JSON:", produtoEncontrado.descricao);
                }
                
                this.menuVertical.innerHTML = `
                    <div class='container py-4'>
                        <div class='menu-vertical__cabecalho'>
                            <button class='btn-close' id='menu-vertical-fechar'></button>
                                <h5 class='menu-vertical__cabecalho__nome-loja'>Echo Moda</h5>
                        </div>

                        <div class='menu-vertical__imagens-produto'>
                            <div id="carouselExampleCaptions" class="carousel slide">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="${produtoEncontrado.imagem}" class="d-block w-100" alt="...">
                                        <div class="carousel-caption d-block d-md-block">
                                            <h5>${produtoEncontrado.caption}</h5>
                                            <p>${produtoEncontrado.preco}</p>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${produtoEncontrado.imagem2}" class="d-block w-100" alt="...">
                                        <div class="carousel-caption d-block d-md-block">
                                            <h5>${produtoEncontrado.caption2}</h5>
                                            <p>${produtoEncontrado.preco}</p>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${produtoEncontrado.imagem3}" class="d-block w-100" alt="...">
                                        <div class="carousel-caption d-block d-md-block">
                                            <h5>${produtoEncontrado.caption3}</h5>
                                            <p>${produtoEncontrado.preco}</p>
                                        </div>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>

                        <div class='menu-vertical__corpo-produto'>
                            <div class='container'>
                                <p class="marca-produto">
                                    ${card.querySelector(".card-body .card-title")?.innerText || 'Marca'}
                                </p>
                                <h2 class="nome-produto">${produtoEncontrado.nome}</h2>
                                <h2 class="valor-produto">R$ ${produtoEncontrado.preco}</h2>

                            <div class="texto-cor">
                                <div class="container-cor">
                                    Cor
                                </div>
                                <div class="container-tamanho">
                                    Tamanho
                                </div>
                            </div>

                            <div class="selecao-de-cor-e-tamanho" style="display: flex; justify-content: space-between; gap: 2rem;">
                                <div class="selecao-de-cor">
                                    <button class="botoes-selecao-cores" id="cor-1"></button>
                                    <button class="botoes-selecao-cores" id="cor-2"></button>
                                    <button class="botoes-selecao-cores" id="cor-3"></button>
                                    <button class="botoes-selecao-cores" id="cor-4"></button>
                                </div>
                                <div class="selecao-de-tamanho">
                                    <button class="botoes-selecao-tamanho" id="tam-1">P</button>
                                    <button class="botoes-selecao-tamanho" id="tam-2">M</button>
                                    <button class="botoes-selecao-tamanho" id="tam-3">G</button>
                                    <button class="botoes-selecao-tamanho" id="tam-4">GG</button>
                                </div>
                            </div>

                            <h5 class="menu-vertical__texto-descricao-produto">Descrição do produto</h5>
                                <p class="menu-vertical__descricao-produto">${produtoEncontrado.descricao}</p>
                            </div>
                        </div>
                    </div>

                    <div class="botao-adicionar-carrinho">
                        <div class="botao-mais-e-menos">
                            <i class="fa-solid fa-minus"></i>
                            <span class="quantidade">1</span>
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    <div class="botao-carrinho">Adicionar ao carrinho</div>
                </div>`;
        
            const botaoCor1 = this.menuVertical.querySelector("#cor-1");
            const botaoCor2 = this.menuVertical.querySelector("#cor-2");
            const botaoCor3 = this.menuVertical.querySelector("#cor-3");
            const botaoCor4 = this.menuVertical.querySelector("#cor-4");
        
            botaoCor1.style.backgroundColor = produtoEncontrado.cor1;
            botaoCor2.style.backgroundColor = produtoEncontrado.cor2;
            botaoCor3.style.backgroundColor = produtoEncontrado.cor3;
            botaoCor4.style.backgroundColor = produtoEncontrado.cor4;

            this.gerenciamentoDeQuantidadeProdutos()
            this.selecaoDeCorETamanho();
            this.salvamentoNoCarrinho();
            this.fecharMenuVertical();
        })
    })

    }
    selecaoDeCorETamanho(){
            const botoesCor = this.menuVertical.querySelectorAll('.botoes-selecao-cores');
                botoesCor.forEach(botao => {
                    botao.addEventListener('click', (e) => {
                        botoesCor.forEach(b => b.classList.remove('active'));
                        botao.classList.add('active');
                    });
                });

            const botoesTamanho = this.menuVertical.querySelectorAll('.botoes-selecao-tamanho');
                botoesTamanho.forEach(botao => {
                    botao.addEventListener('click', (e) => {
                        botoesTamanho.forEach(b => b.classList.remove('active'));
                        botao.classList.add('active');
                    });
                });
    }
    gerenciamentoDeQuantidadeProdutos(){
            const botaoMais = this.menuVertical.querySelector(".fa-plus");
            const botaoMenos = this.menuVertical.querySelector(".fa-minus");
            let quantidade = this.menuVertical.querySelector(".quantidade");

                botaoMais.addEventListener("click", () => {
                    let quantidadeAtual = parseInt(quantidade.innerText);
                        quantidadeAtual++;
                        quantidade.innerText = quantidadeAtual;
                });
        
                botaoMenos.addEventListener("click", () => {
                    let quantidadeAtual = parseInt(quantidade.innerText);
                        quantidadeAtual--;
                        quantidade.innerText = quantidadeAtual;
                        if(quantidadeAtual < 1){
                            quantidadeAtual = 1;
                            quantidade.innerText = quantidadeAtual;
                        }
                });
    }
    salvamentoNoCarrinho(){
            const botaoAdicionarCarrinho = this.menuVertical.querySelector(".botao-carrinho");

                botaoAdicionarCarrinho.addEventListener("click", (event) => {
                    const produtosExistentesNaMemoria = JSON.parse(localStorage.getItem("produtosCarrinho")) || [];
                    const corSelecionada = this.menuVertical.querySelector(".botoes-selecao-cores.active");
                    const tamanhoSelecionado = this.menuVertical.querySelector(".botoes-selecao-tamanho.active");
                    const id = this.idCard;
                    const quantidadeEl = this.menuVertical.querySelector(".quantidade");
                    let quantidadeSelecionada = parseInt(quantidadeEl.innerText);

                    if((corSelecionada === null) || (tamanhoSelecionado === null)){
                        return;
                    }

                    let produtoIgual = produtosExistentesNaMemoria.find(item => item.cor === corSelecionada.style.backgroundColor && item.tamanho === tamanhoSelecionado.innerText && item.id === id);

                    if(produtoIgual){
                        produtoIgual.quantidade += quantidadeSelecionada;
                    } else {
                        const produtoEscolhido = {
                            id: id,
                            nome: this.produtoSelecionado.nome,
                            cor: corSelecionada.style.backgroundColor,
                            tamanho: tamanhoSelecionado.innerText,
                            valor: this.produtoSelecionado.preco,
                            imagem: this.produtoSelecionado.imagem,
                            quantidade: quantidadeSelecionada
                        };

                        produtosExistentesNaMemoria.push(produtoEscolhido);
                    }

                    localStorage.setItem("produtosCarrinho",JSON.stringify(produtosExistentesNaMemoria));
                    indicarProdutosNoCarrinhoEFavoritos()

                    const alertaAdicao = document.querySelector(".confirmacao-adicao-carrinho");

                        if(alertaAdicao){
                            alertaAdicao.style.display = "flex";

                            setTimeout(() => {
                                alertaAdicao.querySelector(".container").style.transform = "translateY(0)";
                            },200)

                            setTimeout(() => {
                                alertaAdicao.querySelector(".container").style.transform = "translateY(130%)"
                                setTimeout(() => {
                                    alertaAdicao.style.display = "none";
                                },600)

                            },1000)
                        }
                })

    }
    fecharMenuVertical(){
        const fecharMenuVertical = document.querySelector("#menu-vertical-fechar");

            fecharMenuVertical.addEventListener("click", () => {
                this.menuVertical.style.transform = "translateY(100%)";
                document.body.style.overflow = "auto";
                document.body.style.height = "";
                setTimeout(() => {
                    this.menuVertical.style.display = "none"
                },500)
            })
    }
}
