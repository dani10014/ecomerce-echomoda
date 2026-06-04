function inicarRenderizacaoProdutosCarrinhos(){var e=document.querySelector(".valor-total");let n=JSON.parse(localStorage.getItem("produtosCarrinho"))||[],t=document.querySelector(".base-cards-carrinho"),r=document.querySelector(".botao-finalizar-compra");if(t.innerHTML="",n.length<1)t.innerHTML='<p class="text-center text-light mb-0">Nada no carrinho</p>',e.innerText="R$ 0",r.style.transform="translateY(120%)",setTimeout(function(){r.style.display="none"},200);else{r.style.display="flex",setTimeout(function(){r.style.transform="translateY(0)"},200),n.forEach(e=>{var r=document.createElement("div");r.innerHTML=`
            <div class='card' data-id="${e.id}">
                <img src='${e.imagem}'>
                <div class='card-body'>
                    <h5 class='card-title'>${e.nome}</h5>
                    <h3 class="valor">${e.valor}</h3>
                    <h5 class="mb-0 mt-3">Tamanho:</h5>
                    <h4 class="tamanho">${e.tamanho}</h4>
                    <h5 class="mb-0 mt-3">Cor:</h5>
                    <h4 class="cor">${e.cor}</h4>
                    <h5 class="mb-0 mt-3">Quantidade:</h5>
                    <h4 class="quantidade">${e.quantidade}</h4>
                </div>
                <div class="botao-remover">
                    <button class="botao-remover__botao">
                        Remover
                    </button>
                </div>
            </div>`,t.appendChild(r)});var o=document.querySelectorAll(".base-cards-carrinho .card");let a=0;o.forEach(e=>{var r=e.querySelector(".card-body valor").innerText,e=e.querySelector(".card-body .quantidade").innerText,r=parseFloat(r.replace("R$ ","")),e=parseFloat(e),r=r*parseInt(e);a+=r}),e.innerText="R$ "+a.toFixed(2).replace(".",","),document.querySelectorAll(".botao-remover__botao").forEach(r=>{r&&r.addEventListener("click",e=>{e.stopPropagation();let o=r.closest(".card");o.style.transition="opacity 0.5s ease",o.style.opacity="0",setTimeout(function(){let r=o.querySelector(".card-body .cor").innerText,a=o.querySelector(".card-body .tamanho").innerText,t=o.dataset.id;var e=n.filter(e=>!(String(e.id)===String(t)&&String(e.tamanho)===String(a)&&String(e.cor)===String(r)));n=e,localStorage.setItem("produtosCarrinho",JSON.stringify(n)),inicarRenderizacaoProdutosCarrinhos()},500)})})}}export{inicarRenderizacaoProdutosCarrinhos};