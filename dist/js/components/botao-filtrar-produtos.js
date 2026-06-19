import{iniciarCarroselSlick}from"./carrosel-slick.js";import{IniciarMenuVertical}from"./menu-vertical.js";function sanitizarHTML(a){var r=document.createElement("div");return r.textContent=String(a),r.innerHTML}function filtrarProdutos(){new produtosFiltrar}class criarCardFiltrado{constructor(a,r,i,e,t,o){this.nome=r,this.id=a,this.preco=i,this.imagem=e,this.imagem2=t,this.imagem3=o}devolverCard(){var a=document.createElement("div"),r=(a.classList.add("base-card"),""+this.id);return a.innerHTML=`
        <div class='card' data-id="${r}">
            <div id="${r}" class="carousel slide" data-bs-ride="carousel">
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
                <a class="carousel-control-prev" data-bs-target="#${r}" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" data-bs-target="#${r}" role="button" data-bs-slide="next">
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
        </div>`,a}}class produtosFiltrar{constructor(){this.containerFiltrar=document.querySelector(".container-filtrar"),this.botaoFiltrar=document.querySelector(".pesquisa__botao-filtrar"),this.fundoBorrado=document.querySelector(".backdrop-glass"),this.botaoFecharMenuFiltrar=document.querySelector(".container-filtrar .btn-close"),this.btnConfirmarFiltragem=document.querySelector(".btn-confirmar-filtragem"),this.containerRoupas=document.querySelector(".produtos-camisas .container-base-card"),this.containerTenis=document.querySelector(".produtos-tenis .container-base-card"),this.valorMinimo=document.querySelector("#valor-minimo"),this.valorMaximo=document.querySelector("#valor-maximo"),this.ouvinteBotaoFecharMenuFiltrar(),this.ouvinteBotaoFiltrar(),this.conFirmarFiltragem(),this.fecharMenuClicandoFora()}async filtrarDadosCliente(){try{var a=await fetch("./../produtos.json");if(!a.ok)throw new Error("Erro ao carregar JSON");var e=await a.json();let r=Number(this.valorMinimo.value)||0,i=Number(this.valorMaximo.value)||1/0;var t=e.filter(a=>a.preco>=r&&a.preco<=i);return 0<t.length?t:(alert("Nada presente nessa faixa"),[])}catch(a){return console.error("Falha no fetch:",a),[]}}conFirmarFiltragem(){this.btnConfirmarFiltragem.addEventListener("click",async a=>{var r;a.preventDefault(),""===this.valorMaximo.value&&""===this.valorMinimo.value?alert("Nada presente nos campos"):(a=await this.filtrarDadosCliente())&&0<a.length&&(this.containerRoupas.innerHTML="",this.containerTenis.innerHTML="",r=a.filter(a=>"blusa"===a.categoria),a=a.filter(a=>"tenis"===a.categoria),r.forEach(a=>{a=new criarCardFiltrado(a.id,a.nome,a.preco,a.imagem,a.imagem2,a.imagem3);this.containerRoupas.appendChild(a.devolverCard())}),a.forEach(a=>{a=new criarCardFiltrado(a.id,a.nome,a.preco,a.imagem,a.imagem2,a.imagem3);this.containerTenis.appendChild(a.devolverCard())}),this.iniciarCarrosel(),this.iniciarMenuVertical(),this.valorMaximo.value="",this.valorMinimo.value="",this.containerFiltrar.style.transform="scale(0)",this.fundoBorrado.style.display="none")})}ouvinteBotaoFiltrar(){this.botaoFiltrar.addEventListener("click",()=>{this.containerFiltrar.style.transform="scale(1)",this.fundoBorrado.style.display="flex"})}ouvinteBotaoFecharMenuFiltrar(){this.botaoFecharMenuFiltrar.addEventListener("click",()=>{this.containerFiltrar.style.transform="scale(0)",this.fundoBorrado.style.display="none",this.valorMaximo.value="",this.valorMinimo.value=""})}iniciarCarrosel(){iniciarCarroselSlick()}iniciarMenuVertical(){IniciarMenuVertical()}fecharMenuClicandoFora(){document.addEventListener("click",a=>{a.target===this.fundoBorrado&&(this.containerFiltrar.style.transform="scale(0)",this.valorMaximo.value="",this.valorMinimo.value="",setTimeout(()=>{this.fundoBorrado.style.display="none"}))})}}export{filtrarProdutos};