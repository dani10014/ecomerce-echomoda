function sanitizarHTML(a){var s=document.createElement("div");return s.textContent=a,s.innerHTML}class CriarProduto{constructor(a,s,e,r,i,t,o){this.id=a,this.nome=s,this.imagem=e,this.imagem2=r,this.imagem3=i,this.preco=t,this.categoria=o}devolverCard(){var a=document.createElement("div"),s=(a.classList.add("base-card"),""+this.id);a.innerHTML=`<div class='card' data-id="${s}">
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
                                </div>`,"blusa"===this.categoria&&document.querySelector(".produtos-camisas .container-base-card").appendChild(a),"tenis"===this.categoria&&document.querySelector(".produtos-tenis .container-base-card").appendChild(a)}}async function buscarProdutos(){try{var a=await fetch("./../produtos.json");if(!a.ok)throw new Error("Erro ao carregar JSON");var s=await a.json();console.log("Produtos da Echo Moda:",s),s.forEach(a=>{new CriarProduto(a.id,a.nome,a.imagem,a.imagem2,a.imagem3,a.preco,a.categoria).devolverCard()})}catch(a){console.error("Falha no fetch:",a)}}export{buscarProdutos};