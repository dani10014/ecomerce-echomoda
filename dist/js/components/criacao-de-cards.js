function sanitizarHTML(a){var s=document.createElement("div");return s.textContent=a,s.innerHTML}function criarCardProdutos(a){var s=document.querySelector(".produtos-camisas .container-base-card"),r=document.querySelector(".produtos-tenis .container-base-card"),o=document.createElement("div"),e=(o.classList.add("base-card"),""+a.id);o.innerHTML=`<div class='card' data-id="${e}">
                                        <div  id="${e}" class="carousel slide" data-bs-ride="carousel">
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
                                </div>`,"tenis"===a.categoria&&r&&r.appendChild(o),"blusa"===a.categoria&&s&&s.appendChild(o)}async function buscarProdutos(){try{var a=await fetch("./../produtos.json");if(!a.ok)throw new Error("Erro ao carregar JSON");var s=await a.json(),r=s.filter(a=>"blusa"===a.categoria),o=s.filter(a=>"tenis"===a.categoria);console.log("Produtos da Echo Moda:",s),r.forEach(a=>{criarCardProdutos(a)}),o.forEach(a=>{criarCardProdutos(a)})}catch(a){console.error("Falha no fetch:",a)}}export{criarCardProdutos,buscarProdutos};