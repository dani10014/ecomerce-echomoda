import{indicarProdutosNoCarrinhoEFavoritos}from"./indicador-notificacao.js";import{exibirAlerta}from"./alertaadicao.js";function IniciarMenuVertical(){new menuVerticalBase}class menuVerticalBase{constructor(){this.cardClicavel=document.querySelectorAll(".container-base-card .card"),this.botoesFavoritos=document.querySelectorAll(".botao-favoritos i"),this.setasDeMudancaDeFoto=document.querySelectorAll(".carousel-control-prev, .carousel-control-next"),this.menuVertical=document.querySelector(".menu-vertical"),this.stopPropagation(),this.ouvinteCliqueMenuVertical()}async buscarEFiltrarProdutos(e){try{var o=await(await fetch("./../produtos.json")).json();let a=Number(String(e).replace(/\D/g,""));return o.find(e=>Number(e.id)===a)}catch(e){console.error("Erro ao filtrar dados:",e),exibirAlerta("Erro ao buscar produto","erro")}}stopPropagation(){this.setasDeMudancaDeFoto&&this.setasDeMudancaDeFoto.forEach(e=>{e.addEventListener("click",e=>{e.stopPropagation()})}),this.botoesFavoritos&&this.botoesFavoritos.forEach(e=>{e.addEventListener("click",e=>{e.stopPropagation()})})}ouvinteCliqueMenuVertical(){this.cardClicavel.forEach(i=>{i.addEventListener("click",async e=>{var a=i.dataset.id,o=i.querySelector(".card-body h3").innerText,o=(console.log(a),console.log(o),this.menuVertical.style.display="block",this.menuVertical.style.maxHeight="100vh",this.menuVertical.style.overflowY="auto",document.body.style.overflow="hidden",setTimeout(()=>{this.menuVertical.style.transform="translateX(0)"},200),await this.buscarEFiltrarProdutos(a)),a=(this.produtoSelecionado=o,this.idCard=a,this.menuVertical.innerHTML=`
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
                                        <img src="${o.imagem}" class="d-block w-100" alt="...">
                                        <div class="carousel-caption d-block d-md-block">
                                            <h5>${o.caption}</h5>
                                            <p>${o.preco}</p>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${o.imagem2}" class="d-block w-100" alt="...">
                                        <div class="carousel-caption d-block d-md-block">
                                            <h5>${o.caption2}</h5>
                                            <p>${o.preco}</p>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${o.imagem3}" class="d-block w-100" alt="...">
                                        <div class="carousel-caption d-block d-md-block">
                                            <h5>${o.caption3}</h5>
                                            <p>${o.preco}</p>
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
                                    ${i.querySelector(".card-body .card-title")?.innerText||"Marca"}
                                </p>
                                <h2 class="nome-produto">${o.nome}</h2>
                                <h2 class="valor-produto">R$ ${o.preco}</h2>

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
                                <p class="menu-vertical__descricao-produto">${o.descricao}</p>
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
                </div>`,this.menuVertical.querySelector("#cor-1")),t=this.menuVertical.querySelector("#cor-2"),s=this.menuVertical.querySelector("#cor-3"),r=this.menuVertical.querySelector("#cor-4");a.style.backgroundColor=o.cor1,t.style.backgroundColor=o.cor2,s.style.backgroundColor=o.cor3,r.style.backgroundColor=o.cor4,this.gerenciamentoDeQuantidadeProdutos(),this.selecaoDeCorETamanho(),this.salvamentoNoCarrinho(),this.fecharMenuVertical()})})}selecaoDeCorETamanho(){let o=this.menuVertical.querySelectorAll(".botoes-selecao-cores"),t=(o.forEach(a=>{a.addEventListener("click",e=>{o.forEach(e=>e.classList.remove("active")),a.classList.add("active")})}),this.menuVertical.querySelectorAll(".botoes-selecao-tamanho"));t.forEach(a=>{a.addEventListener("click",e=>{t.forEach(e=>e.classList.remove("active")),a.classList.add("active")})})}gerenciamentoDeQuantidadeProdutos(){var e=this.menuVertical.querySelector(".fa-plus"),a=this.menuVertical.querySelector(".fa-minus");let o=this.menuVertical.querySelector(".quantidade");e.addEventListener("click",()=>{var e=parseInt(o.innerText);e++,o.innerText=e}),a.addEventListener("click",()=>{var e=parseInt(o.innerText);e--,(o.innerText=e)<1&&(o.innerText=1)})}salvamentoNoCarrinho(){this.menuVertical.querySelector(".botao-carrinho").addEventListener("click",e=>{var a=JSON.parse(localStorage.getItem("produtosCarrinho"))||[];let o=this.menuVertical.querySelector(".botoes-selecao-cores.active"),t=this.menuVertical.querySelector(".botoes-selecao-tamanho.active"),s=this.idCard;var r,i=this.menuVertical.querySelector(".quantidade"),i=parseInt(i.innerText);null===o||null===t?exibirAlerta("Selecione cor e tamanho","erro"):((r=a.find(e=>e.cor===o.style.backgroundColor&&e.tamanho===t.innerText&&e.id===s))?r.quantidade+=i:(r={id:s,nome:this.produtoSelecionado.nome,cor:o.style.backgroundColor,tamanho:t.innerText,valor:this.produtoSelecionado.preco,imagem:this.produtoSelecionado.imagem,quantidade:i},a.push(r)),localStorage.setItem("produtosCarrinho",JSON.stringify(a)),indicarProdutosNoCarrinhoEFavoritos(),exibirAlerta("Produto adicionado ao carrinho com sucesso!","sucesso"))})}fecharMenuVertical(){document.querySelector("#menu-vertical-fechar").addEventListener("click",()=>{this.menuVertical.style.transform="translateY(100%)",document.body.style.overflow="auto",document.body.style.height="",setTimeout(()=>{this.menuVertical.style.display="none"},500)})}}export{IniciarMenuVertical};