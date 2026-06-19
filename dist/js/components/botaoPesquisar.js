import{IniciarMenuVertical}from"./menu-vertical.js";import{iniciarCarroselSlick}from"./carrosel-slick.js";import{ouvinteBotaoFavoritar}from"./botaoFavoritar.js";function sanitizarHTML(a){var s=document.createElement("div");return s.textContent=a,s.innerHTML}function buscarProdutoPesquisado(){new ProdutoPesquisado}class ProdutoPesquisado{constructor(){this.btnPesquisar=document.getElementById("btn-pesquisar"),this.espacoDaPesquisa=document.querySelector("#espaco-pesquisa"),this.containerRoupas=document.querySelector(".produtos-camisas .container-base-card"),this.containerTenis=document.querySelector(".produtos-tenis .container-base-card"),this.botaoDropdownTenis=document.getElementById("dropdown-tenis"),this.debugBotao()}debugBotao(){this.btnPesquisar.addEventListener("click",async()=>{if(""===this.espacoDaPesquisa.value.trim())alert("Nao há nada presente no campo"),this.espacoDaPesquisa.value="";else{var a=await this.buscarProduto();if(0===a.length)alert("Erro ao buscar produtos do banco");else{if(0<a.length){let s=sanitizarHTML(this.espacoDaPesquisa.value.trim().toLowerCase());a=a.filter(a=>a.nome.toLowerCase().includes(s));if(0===a.length)return void alert("nenhum produto encontrado");$(".container-base-card").each(function(){$(this).hasClass("slick-initialized")&&$(this).slick("unslick")}),this.containerTenis.style.display="none",this.containerRoupas.innerHTML="",this.containerTenis.innerHTML="",this.botaoDropdownTenis.style.display="none",a.forEach(a=>{var a=new CriarProduto(a.id,a.nome,a.imagem,a.imagem2,a.imagem3,a.preco),s=a.devolverCard();console.log(a),this.containerRoupas.appendChild(s)}),IniciarMenuVertical(),iniciarCarroselSlick(),ouvinteBotaoFavoritar()}this.espacoDaPesquisa.value=""}}})}async buscarProduto(){try{var a=await fetch("./../produtos.json");if(a.ok)return await a.json();throw new Error("Erro ao carregar JSON")}catch(a){return console.error("Falha no fetch:",a),[]}}}class CriarProduto{constructor(a,s,e,i,t,o){this.id=a,this.nome=s,this.imagem=e,this.imagem2=i,this.imagem3=t,this.preco=o}devolverCard(){var a=document.createElement("div"),s=(a.classList.add("base-card"),""+this.id);return a.innerHTML=`<div class='card' data-id="${s}">
                                        <div  id="${s}" class="carousel slide" data-bs-ride="carousel">
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
                                            <a class="carousel-control-prev" data-bs-target="#${s}" role="button" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="sr-only">Previous</span>
                                            </a>
                                            <a class="carousel-control-next" data-bs-target="#${s}" role="button" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="sr-only">Next</span>
                                            </a> 
                                        </div>
                                    <div class='card-body'>
                                        <h5 class='card-title'>${sanitizarHTML(this.nome)}</h5>
                                        <h3>${sanitizarHTML(this.preco)}</h3>
                                    </div>
                                    <div class="botao-favoritos">
                                        <i class="fa-solid fa-star"></i>
                                    </div>
                                </div>`,a}}export{buscarProdutoPesquisado};