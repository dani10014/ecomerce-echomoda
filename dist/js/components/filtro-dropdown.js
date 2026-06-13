import{iniciarCarroselSlick}from"./carrosel-slick.js";import{IniciarMenuVertical}from"./menu-vertical.js";function sanitizarHTML(a){var r=document.createElement("div");return r.textContent=String(a),r.innerHTML}function criarCardHTML(a){var r=document.createElement("div"),e=(r.classList.add("base-card"),""+a.id);return r.innerHTML=`
        <div class='card' data-id="${e}">
            <div id="${e}" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="${a.imagem}" alt="First slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="${a.imagem2}" alt="Second slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="${a.imagem3}" alt="Third slide">
                    </div>
                </div>
                <a class="carousel-control-prev" data-bs-target="#${e}" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" data-bs-target="#${e}" role="button" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a> 
            </div>
            <div class='card-body'>
                <h5 class='card-title'>${sanitizarHTML(a.nome)}</h5>
                <h3>${sanitizarHTML(a.preco)}</h3>
            </div>
            <div class="botao-favoritos">
                <i class="fa-solid fa-star"></i>
            </div>
        </div>`,r}async function inicializarFiltrosDropdown(){document.querySelectorAll(".secao-de-selecao-produtos .dropdown").forEach((a,r)=>{let t=a.querySelector("button");a=a.querySelectorAll(".dropdown-item");let o="blusas"===t.textContent.trim().toLowerCase()?"blusa":"tenis",c="blusa"==o?document.querySelector(".produtos-camisas .container-base-card"):document.querySelector(".produtos-tenis .container-base-card");a.forEach(s=>{s.addEventListener("click",async a=>{a.preventDefault();var r,e,a=s.textContent.trim();let i=(await(async()=>{try{var a=await fetch("./../produtos.json");if(a.ok)return await a.json();throw new Error("Erro ao carregar JSON")}catch(a){return console.error("Falha no fetch:",a),[]}})()).filter(a=>a.categoria===o);if("Promoções"!==a){let r="Masculinas"===a?"Masculino":"feminino";i=i.filter(a=>a.sexo===r)}$(c).hasClass("slick-initialized")&&$(c).slick("unslick"),r=c,e=i,r.innerHTML="",e.forEach(a=>{r.appendChild(criarCardHTML(a))}),iniciarCarroselSlick(),IniciarMenuVertical(),t.innerHTML=""+sanitizarHTML(a)})})})}export{inicializarFiltrosDropdown};