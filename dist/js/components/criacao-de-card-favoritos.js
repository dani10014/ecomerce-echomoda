function sanitizarHTML(t){var e=document.createElement("div");return e.textContent=t,e.innerHTML}async function criarCardFavoritos(){let o=localStorage.getItem("meusFavoritos");var t,e=document.querySelector(".produtos-favoritados");let a=JSON.parse(o)||[];e.innerHTML="",a.length<1&&(e.innerHTML='<p class="text-light text-center nenhum-favorito mb-0">Nenhum produto favoritado</p>');for(t of a){var r,i=await(async t=>{try{var r=await(await fetch("./../produtos.json")).json();let e=Number(String(t).replace(/\D/g,""));return r.find(t=>Number(t.id)===e)}catch(t){console.error("Erro ao filtrar dados:",t)}})(t);i&&(r=document.createElement("div"),i.id,r.innerHTML=` <div class='card' data-id="${i.id}">
                                            <img src='${i.imagem}'>
                                            <div class='card-body'>
                                                <h5 class='card-title'>${sanitizarHTML(i.nome)}</h5>
                                                <h3>${sanitizarHTML(i.preco)}</h3>
                                            </div>
                                                <div class="botao-remover">
                                                    <button class="botao-remover__botao">
                                                        Remover
                                                    </button>
                                                </div>
                                        </div>`,e.appendChild(r))}document.querySelectorAll(".card").forEach(r=>{r.querySelectorAll(".botao-remover").forEach(t=>{t.addEventListener("click",t=>{t.stopPropagation(),r.style.filter="opacity(0)",setTimeout(function(){let e=r.dataset.id;var t=a.filter(t=>String(t)!==String(e));o=t,localStorage.setItem("meusFavoritos",JSON.stringify(o)),criarCardFavoritos()},500)})})}),document.querySelector("#seta-voltar-home").addEventListener("click",()=>{window.location.href="index.html"})}export{criarCardFavoritos};