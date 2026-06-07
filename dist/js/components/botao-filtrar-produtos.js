import{iniciarCarroselSlick}from"./carrosel-slick.js";function sanitizarHTML(e){var a=document.createElement("div");return a.textContent=String(e),a.innerHTML}function criarCardHTML(e){var a=document.createElement("div"),r=(a.classList.add("base-card"),""+e.id);return a.innerHTML=`
        <div class='card' data-id="${r}">
            <div id="${r}" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="${e.imagem}" alt="First slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="${e.imagem2}" alt="Second slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="${e.imagem3}" alt="Third slide">
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
                <h5 class='card-title'>${sanitizarHTML(e.nome)}</h5>
                <h3>R$ ${sanitizarHTML(e.preco)}</h3>
            </div>
            <div class="botao-favoritos">
                <i class="fa-solid fa-star"></i>
            </div>
        </div>`,a}function filtrarProdutos(){let r=document.querySelector(".container-filtrar");var e=document.querySelector(".pesquisa__botao-filtrar");let t=document.querySelector(".backdrop-glass");var a=document.querySelector(".container-filtrar .btn-close"),s=document.querySelector(".btn-confirmar-filtragem");let i=document.querySelector(".produtos-camisas .container-base-card"),l=document.querySelector(".produtos-tenis .container-base-card"),c=document.querySelector("#valor-minimo"),n=document.querySelector("#valor-maximo");s.addEventListener("click",async function(e){var a;e.preventDefault(),""===n.value&&""===c.value?alert("Nada presente nos campos"):(e=await(async()=>{try{var e=await fetch("./../produtos.json");if(!e.ok)throw new Error("Erro ao carregar JSON");var t=await e.json();let a=Number(c.value),r=Number(n.value);var s=t.filter(e=>e.preco>=a&&e.preco<=r);return 0<s.length?s:(alert("Nada presente nessa faixa"),[])}catch(e){return console.error("Falha no fetch:",e),[]}})())&&0<e.length&&(i.innerHTML="",l.innerHTML="",a=e.filter(e=>"blusa"===e.categoria),e=e.filter(e=>"tenis"===e.categoria),a.forEach(e=>{e=criarCardHTML(e);i.appendChild(e)}),e.forEach(e=>{e=criarCardHTML(e);l.appendChild(e)}),n.value="",c.value="",r.style.transform="scale(0)",t.style.display="none")}),e.addEventListener("click",function(){r.style.transform="scale(1)",t.style.display="flex"}),a.addEventListener("click",function(){r.style.transform="scale(0)",t.style.display="none",n.value="",c.value=""}),document.addEventListener("click",function(e){e.target===t&&(r.style.transform="scale(0)",n.value="",c.value="",setTimeout(function(){t.style.display="none"}))})}export{filtrarProdutos};