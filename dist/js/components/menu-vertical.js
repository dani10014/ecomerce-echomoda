import{indicarProdutosNoCarrinhoEFavoritos}from"./indicador-notificacao.js";function IniciarMenuVertical(){new menuVerticalBase}class menuVerticalBase{constructor(){this.cardClicavel=document.querySelectorAll(".container-base-card .card"),this.botoesFavoritos=document.querySelectorAll(".botao-favoritos i"),this.setasDeMudancaDeFoto=document.querySelectorAll(".carousel-control-prev, .carousel-control-next"),this.menuVertical=document.querySelector(".menu-vertical"),this.stopPropagation(),this.ouvinteCliqueMenuVertical()}async buscarEFiltrarProdutos(e){try{var a=await(await fetch("./../produtos.json")).json();let t=Number(String(e).replace(/\D/g,""));return a.find(e=>Number(e.id)===t)}catch(e){console.error("Erro ao filtrar dados:",e)}}stopPropagation(){this.setasDeMudancaDeFoto&&this.setasDeMudancaDeFoto.forEach(e=>{e.addEventListener("click",e=>{e.stopPropagation()})}),this.botoesFavoritos&&this.botoesFavoritos.forEach(e=>{e.addEventListener("click",e=>{e.stopPropagation()})})}ouvinteCliqueMenuVertical(){this.cardClicavel.forEach(c=>{c.addEventListener("click",async e=>{var t=c.dataset.id,a=c.querySelector(".card-body h3").innerText,a=(console.log(t),console.log(a),this.menuVertical.style.display="block",this.menuVertical.style.maxHeight="100vh",this.menuVertical.style.overflowY="auto",this.document.body.style.overflow="hidden",setTimeout(()=>{this.menuVertical.style.transform="translateX(0)"},500),await this.buscarEFiltrarProdutos(t)),t=(a&&console.log("Descrição vindo do JSON:",a.descricao),this.menuVertical.innerHTML=`
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
                                        <img src="${a.imagem}" class="d-block w-100" alt="...">
                                        <div class="carousel-caption d-block d-md-block">
                                            <h5>${a.caption}</h5>
                                            <p>${a.preco}</p>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${a.imagem2}" class="d-block w-100" alt="...">
                                        <div class="carousel-caption d-block d-md-block">
                                            <h5>${a.caption2}</h5>
                                            <p>${a.preco}</p>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${a.imagem3}" class="d-block w-100" alt="...">
                                        <div class="carousel-caption d-block d-md-block">
                                            <h5>${a.caption3}</h5>
                                            <p>${a.preco}</p>
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
                                    ${c.querySelector(".card-body .card-title")?.innerText||"Marca"}
                                </p>
                                <h2 class="nome-produto">${a.nome}</h2>
                                <h2 class="valor-produto">R$ ${a.preco}</h2>

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
                                <p class="menu-vertical__descricao-produto">${a.descricao}</p>
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
                </div>`,this.menuVertical.querySelector("#cor-1")),o=this.menuVertical.querySelector("#cor-2"),s=this.menuVertical.querySelector("#cor-3"),r=this.menuVertical.querySelector("#cor-4");t.style.backgroundColor=a.cor1,o.style.backgroundColor=a.cor2,s.style.backgroundColor=a.cor3,r.style.backgroundColor=a.cor4,this.gerenciamentoDeQuantidadeProdutos(),this.selecaoDeCorETamanho(),this.salvamentoNoCarrinho(),this.fecharMenuVertical()})})}selecaoDeCorETamanho(){let a=this.menuVertical.querySelectorAll(".botoes-selecao-cores"),o=(a.forEach(t=>{t.addEventListener("click",e=>{a.forEach(e=>e.classList.remove("active")),t.classList.add("active")})}),this.menuVertical.querySelectorAll(".botoes-selecao-tamanho"));o.forEach(t=>{t.addEventListener("click",e=>{o.forEach(e=>e.classList.remove("active")),t.classList.add("active")})})}gerenciamentoDeQuantidadeProdutos(){var e=this.menuVertical.querySelector(".fa-plus"),t=this.menuVertical.querySelector(".fa-minus");let a=this.menuVertical.querySelector(".quantidade");e.addEventListener("click",()=>{var e=parseInt(a.innerText);e++,a.innerText=e}),t.addEventListener("click",()=>{var e=parseInt(a.innerText);e--,(a.innerText=e)<1&&(a.innerText=1)})}salvamentoNoCarrinho(){document.querySelector(".botao-carrinho").addEventListener("click",()=>{var t=JSON.parse(localStorage.getItem("produtosCarrinho"))||[];let a=document.querySelector(".botoes-selecao-cores.active"),o=document.querySelector(".botoes-selecao-tamanho.active"),s=this.menuVertical.closest(".card").dataset.id;var r=parseInt(quantidade.innerText);if(null!==a&&null!==o){var c=t.find(e=>e.cor===a.style.backgroundColor&&e.tamanho===o.innerText&&e.id===s);c?(c.quantidade+=r,quantidade.innerText++):(c={id:this.idCard,nome:produtoEncontrado.nome,cor:a.style.backgroundColor,tamanho:o.innerText,valor:produtoEncontrado.preco,imagem:produtoEncontrado.imagem,quantidade:r},t.push(c)),localStorage.setItem("produtosCarrinho",JSON.stringify(t)),indicarProdutosNoCarrinhoEFavoritos();let e=document.querySelector(".confirmacao-adicao-carrinho");e.style.display="flex",setTimeout(()=>{e.querySelector(".container").style.transform="translateY(0)"},200),setTimeout(()=>{e.querySelector(".container").style.transform="translateY(130%)",setTimeout(()=>{e.style.display="none"},600)},1e3)}})}fecharMenuVertical(){document.querySelector("#menu-vertical-fechar").addEventListener("click",()=>{this.menuVertical.style.transform="translateY(100%)",document.body.style.overflow="auto",document.body.style.height="",setTimeout(()=>{this.menuVertical.style.display="none"},500)})}}export{IniciarMenuVertical};