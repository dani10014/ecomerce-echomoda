function sanitizarHTML(i){var a=document.createElement("div");return a.textContent=i,a.innerHTML}class CriarProduto{constructor(i,a,r,e,o,t,c,s,l,n,d){this.id=i,this.nome=a,this.imagem=r,this.imagem2=e,this.imagem3=o,this.preco=t,this.categoria=c,this.cor1=s,this.cor2=l,this.cor3=n,this.cor4=d}devolverCard(){var i=document.createElement("div"),a=(i.classList.add("base-card"),""+this.id);i.innerHTML=`<div class='card' data-id="${a}">
                                        <div  id="${a}" class="carousel slide" data-bs-ride="carousel">
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
                                        <h3>${sanitizarHTML(this.preco)}</h3>
                                        <div class="estrelas d-flex justify-content-between">
                                            <div class="container-estrelas">
                                                <i class="fas fa-star"></i>
                                                <p class="mb-0">2.5/5</p>
                                            </div>
                                            <div class="container-cores">
                                                    <button id="cor-exibic-tela-inicial-1"></button>
                                                    <button id="cor-exibic-tela-inicial-2"></button>
                                                    <button id="cor-exibic-tela-inicial-3"></button>
                                                    <button id="cor-exibic-tela-inicial-4"></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="botao-favoritos">
                                        <i class="fa-solid fa-star"></i>
                                    </div>
                                </div>`,this.cor1?i.querySelector("#cor-exibic-tela-inicial-1").style.backgroundColor=""+this.cor1:i.querySelector("#cor-exibic-tela-inicial-1").style.backgroundColor="grey",this.cor2?i.querySelector("#cor-exibic-tela-inicial-2").style.backgroundColor=""+this.cor2:i.querySelector("#cor-exibic-tela-inicial-2").style.backgroundColor="grey",this.cor3?i.querySelector("#cor-exibic-tela-inicial-3").style.backgroundColor=""+this.cor3:i.querySelector("#cor-exibic-tela-inicial-3").style.backgroundColor="grey",this.cor4?i.querySelector("#cor-exibic-tela-inicial-4").style.backgroundColor=""+this.cor4:i.querySelector("#cor-exibic-tela-inicial-4").style.backgroundColor="grey","blusa"===this.categoria&&document.querySelector(".produtos-camisas .container-base-card").appendChild(i),"tenis"===this.categoria&&document.querySelector(".produtos-tenis .container-base-card").appendChild(i)}}let buscaProdutosJaFeita=!1;async function buscarProdutos(){if(!1===buscaProdutosJaFeita)try{var i=await fetch("https://ecomerce-echomoda.onrender.com/api/buscar-produtos");if(!i.ok)throw new Error("Erro ao carregar JSON");var a=await i.json();if(!i.ok||!Array.isArray(a))throw new Error("Resposta inválida do servidor");a.forEach(i=>{new CriarProduto(i.id,i.nome,i.imagem,i.imagem2,i.imagem3,i.preco,i.categoria,i.cor1,i.cor2,i.cor3,i.cor4,i.cor5).devolverCard()}),buscaProdutosJaFeita=!0}catch(i){console.error("Falha no fetch:",i)}}export{buscarProdutos};