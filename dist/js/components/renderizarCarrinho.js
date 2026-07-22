import{verificarUsuarioExiste}from"../main.js";import{exibirAlerta}from"./alertaadicao.js";function inicarRenderizacaoProdutosCarrinhos(){new cardsCarrinho}verificarUsuarioExiste();class cardsCarrinho{constructor(){this.valorTotal=0,this.IndicadorTotal=document.querySelector(".valor-total"),this.produtosCarrinho=JSON.parse(localStorage.getItem("produtosCarrinho"))||[],this.containerCardsCarrinho=document.querySelector(".base-cards-carrinho"),this.botaoFinalizarCompra=document.querySelector(".botao-finalizar-compra"),this.containerCardsCarrinho.innerHTML="",this.verificaProdutosPresente(),this.desenharCardExistente(),this.criarQuantidadeValorECor(),this.ouvinteRemoverCard()}verificaProdutosPresente(){this.produtosCarrinho.length<1?(this.containerCardsCarrinho.innerHTML='<p class="text-center text-light mb-0">Nada no carrinho</p>',this.valorTotal=0,this.IndicadorTotal.innerText="R$ "+this.valorTotal,this.botaoFinalizarCompra.style.transform="translateY(120%)",setTimeout(()=>{this.botaoFinalizarCompra.style.display="none"},200)):(this.botaoFinalizarCompra.style.display="flex",setTimeout(()=>{this.botaoFinalizarCompra.style.transform="translateY(0)"},200))}desenharCardExistente(){this.produtosCarrinho.forEach(r=>{var a=document.createElement("div");a.innerHTML=`
                    <div class='card' data-id="${r.id}">
                        <img src='${r.imagem}'>
                    <div class='card-body'>
                        <h5 class='card-title'>${r.nome}</h5>
                        <h3 class="valor">${r.valor}</h3>
                        <h5 class="mb-0 mt-3">Tamanho:</h5>
                        <h4 class="tamanho">${r.tamanho}</h4>
                        <h5 class="mb-0 mt-3">Cor:</h5>
                        <h4 class="cor">${r.cor}</h4>
                        <h5 class="mb-0 mt-3">Quantidade:</h5>
                        <h4 class="quantidade">${r.quantidade}</h4>
                    </div>
                    <div class="botao-remover">
                        <button class="botao-remover__botao">
                            Remover
                        </button>
                    </div>
                    </div>`,this.containerCardsCarrinho.appendChild(a)})}criarQuantidadeValorECor(){var r=document.querySelectorAll(".base-cards-carrinho .card");let o=0;r.forEach(r=>{var a=r.querySelector(".card-body .valor").innerText,r=r.querySelector(".card-body .quantidade").innerText,a=parseFloat(a.replace("R$ ","")),r=parseFloat(r),a=a*parseInt(r);o+=a}),this.IndicadorTotal.innerText="R$ "+o.toFixed(2).replace(".",",")}ouvinteRemoverCard(){document.querySelectorAll(".botao-remover__botao").forEach(a=>{a&&a.addEventListener("click",r=>{r.stopPropagation();let e=a.closest(".card");e.style.transition="opacity 0.5s ease",e.style.opacity="0",exibirAlerta("Produto removido do carrinho","sucesso"),setTimeout(()=>{let a=e.querySelector(".card-body .cor").innerText,o=e.querySelector(".card-body .tamanho").innerText,t=e.dataset.id;var r=this.produtosCarrinho.filter(r=>!(String(r.id)===String(t)&&String(r.tamanho)===String(o)&&String(r.cor)===String(a)));this.produtosCarrinho=r,localStorage.setItem("produtosCarrinho",JSON.stringify(this.produtosCarrinho)),inicarRenderizacaoProdutosCarrinhos()},500)})})}}export{inicarRenderizacaoProdutosCarrinhos};