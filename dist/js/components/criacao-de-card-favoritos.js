function sanitizarHTML(t){var r=document.createElement("div");return r.textContent=t,r.innerHTML}class criarProduto{constructor(t,r,e,o){this.id=t,this.nome=r,this.imagem=o,this.preco=e}devolverCard(){var t=document.createElement("div");return t.innerHTML=` <div class='card' data-id="${this.id}">
                                            <img src='${this.imagem}'>
                                            <div class='card-body'>
                                                <h5 class='card-title'>${sanitizarHTML(this.nome)}</h5>
                                                <h3>${sanitizarHTML(this.preco)}</h3>
                                            </div>
                                                <div class="botao-remover">
                                                    <button class="botao-remover__botao">
                                                        Remover
                                                    </button>
                                                </div>
                                        </div>`,t}}async function criarCardFavoritos(){let o=localStorage.getItem("meusFavoritos");var t,r=document.querySelector(".produtos-favoritados");let a=JSON.parse(o)||[];r.innerHTML="",a.length<1&&(r.innerHTML='<p class="text-light text-center nenhum-favorito mb-0">Nenhum produto favoritado</p>');for(t of a){var e=await(async t=>{try{var e=await(await fetch("./../produtos.json")).json();let r=Number(String(t).replace(/\D/g,""));return e.find(t=>Number(t.id)===r)}catch(t){console.error("Erro ao filtrar dados:",t)}})(t),e=new criarProduto(e.id,e.nome,e.preco,e.imagem).devolverCard();r.appendChild(e)}document.querySelectorAll(".card").forEach(e=>{e.querySelectorAll(".botao-remover").forEach(t=>{t.addEventListener("click",t=>{t.stopPropagation(),e.style.filter="opacity(0)",setTimeout(function(){let r=e.dataset.id;var t=a.filter(t=>String(t)!==String(r));o=t,localStorage.setItem("meusFavoritos",JSON.stringify(o)),criarCardFavoritos()},500)})})}),document.querySelector("#seta-voltar-home").addEventListener("click",()=>{window.location.href="index.html"})}export{criarCardFavoritos};