import{iniciarCarroselSlick}from"./carrosel-slick.js";import{IniciarMenuVertical}from"./menu-vertical.js";import{exibirAlerta}from"./alertaadicao.js";function sanitizarHTML(r){var a=document.createElement("div");return a.textContent=String(r),a.innerHTML}function filtrarProdutos(){new produtosFiltrar}class criarCardFiltrado{constructor(r,a,i,e,t,o){this.nome=a,this.id=r,this.preco=i,this.imagem=e,this.imagem2=t,this.imagem3=o}devolverCard(){var r=document.createElement("div"),a=(r.classList.add("base-card"),""+this.id);return r.innerHTML=`
        <div class='card' data-id="${a}">
            <div id="${a}" class="carousel slide" data-bs-ride="carousel">
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
                <a class="carousel-control-prev" data-bs-target="#${a}" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" data-bs-target="#${a}" role="button" data-bs-slide="next">
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
        </div>`,r}}class produtosFiltrar{constructor(){this.containerFiltrar=document.querySelector(".container-filtrar"),this.botaoFiltrar=document.querySelector(".pesquisa__botao-filtrar"),this.fundoBorrado=document.querySelector(".backdrop-glass"),this.botaoFecharMenuFiltrar=document.querySelector(".container-filtrar .btn-close"),this.btnConfirmarFiltragem=document.querySelector(".btn-confirmar-filtragem"),this.containerRoupas=document.querySelector(".produtos-camisas .container-base-card"),this.containerTenis=document.querySelector(".produtos-tenis .container-base-card"),this.valorMinimo=document.querySelector("#valor-minimo"),this.valorMaximo=document.querySelector("#valor-maximo"),this.ouvinteBotaoFecharMenuFiltrar(),this.ouvinteBotaoFiltrar(),this.conFirmarFiltragem(),this.fecharMenuClicandoFora()}async filtrarDadosCliente(){try{var r=await fetch("https://ecomerce-echomoda.onrender.com/api/buscar-produtos");if(!r.ok)throw new Error("Erro ao carregar JSON");var e=await r.json();let a=Number(this.valorMinimo.value)||0,i=Number(this.valorMaximo.value)||1/0;var t=e.filter(r=>r.preco>=a&&r.preco<=i);return 0<t.length?t:(exibirAlerta("Nada presente nessa faixa","erro"),[])}catch(r){return console.error("Falha no fetch:",r),[]}}conFirmarFiltragem(){this.btnConfirmarFiltragem.addEventListener("click",async r=>{var a;r.preventDefault(),""===this.valorMaximo.value&&""===this.valorMinimo.value?exibirAlerta("Preencha os campos","erro"):(exibirAlerta("Produtos filtrados","sucesso"),(r=await this.filtrarDadosCliente())&&0<r.length&&(this.containerRoupas.innerHTML="",this.containerTenis.innerHTML="",a=r.filter(r=>"blusa"===r.categoria),r=r.filter(r=>"tenis"===r.categoria),a.forEach(r=>{r=new criarCardFiltrado(r.id,r.nome,r.preco,r.imagem,r.imagem2,r.imagem3);this.containerRoupas.appendChild(r.devolverCard())}),r.forEach(r=>{r=new criarCardFiltrado(r.id,r.nome,r.preco,r.imagem,r.imagem2,r.imagem3);this.containerTenis.appendChild(r.devolverCard())}),this.iniciarCarrosel(),this.iniciarMenuVertical(),this.valorMaximo.value="",this.valorMinimo.value="",this.containerFiltrar.style.transform="scale(0)",this.fundoBorrado.style.display="none"))})}ouvinteBotaoFiltrar(){this.botaoFiltrar.addEventListener("click",()=>{this.containerFiltrar.style.transform="scale(1)",this.fundoBorrado.style.display="flex"})}ouvinteBotaoFecharMenuFiltrar(){this.botaoFecharMenuFiltrar.addEventListener("click",()=>{this.containerFiltrar.style.transform="scale(0)",this.fundoBorrado.style.display="none",this.valorMaximo.value="",this.valorMinimo.value=""})}iniciarCarrosel(){iniciarCarroselSlick()}iniciarMenuVertical(){IniciarMenuVertical()}fecharMenuClicandoFora(){document.addEventListener("click",r=>{r.target===this.fundoBorrado&&(this.containerFiltrar.style.transform="scale(0)",this.valorMaximo.value="",this.valorMinimo.value="",setTimeout(()=>{this.fundoBorrado.style.display="none"}))})}}export{filtrarProdutos};