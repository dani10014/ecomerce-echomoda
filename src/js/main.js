import { buscarProdutos} from './components/criacao-de-cards.js';
import { iniciarCarroselSlick} from './components/carrosel-slick.js';
import { iniciarOuvinteMenuLateral } from './components/menu-lateral.js';
import { IniciarMenuVertical } from './components/menu-vertical.js';
import { ouvinteBotaoFavoritar } from './components/botaoFavoritar.js';
import { criarCardFavoritos } from './components/criacao-de-card-favoritos.js';
import { iniciarTrocaImagenOferta } from './components/troca-de-imagens-oferta.js';
import { inicarRenderizacaoProdutosCarrinhos } from './components/renderizarCarrinho.js';
import { filtrarProdutos } from './components/botao-filtrar-produtos.js';
import { indicarProdutosNoCarrinhoEFavoritos } from './components/indicador-notificacao.js';
import { ouvinteFinalizarPedido } from './components/finalizarPedido.js';
import { buscarProdutoPesquisado } from './components/botaoPesquisar.js';
import { verificarUsuario } from './components/verificaçãoDeUsuario.js';


export function verificarUsuarioExiste(){
    let usuarioExiste = localStorage.getItem("Usuario");
    let paginasPrivadas = ["index.html","carrinho.html","favoritos.html"]
    let paginaAtual = window.location.pathname
    console.log(paginaAtual)
    if(!usuarioExiste && paginasPrivadas.some(pagina => paginaAtual.includes(pagina))){
        window.location.href = "login.html";
    }
    if(usuarioExiste && paginaAtual === "/login.html"){
        window.location.href = "index.html";
    }
}
if(document.querySelector("#menu-hamburguer")){
    verificarUsuarioExiste();
}

if(document.querySelector("#btn-entrar")){
    verificarUsuario();
}

if(document.querySelector(".produtos-camisas .container-base-card")){
    await buscarProdutos();
}

if(document.querySelector(".produtos-camisas .container-base-card")){
    iniciarCarroselSlick();
}

if(document.querySelector("#menu-hamburguer")){
    iniciarOuvinteMenuLateral();
    indicarProdutosNoCarrinhoEFavoritos()
}

if(document.querySelector("#btn-pesquisar")){
    buscarProdutoPesquisado()
}
if(document.querySelector(".botao-favoritos i")){
    ouvinteBotaoFavoritar();
}

if(document.querySelector(".card")){
    IniciarMenuVertical();
}

const cabecalhoH1 = document.querySelector('.cabecalho h1');
if (cabecalhoH1 && cabecalhoH1.innerText === 'Favoritos') {
    criarCardFavoritos();
}

if(document.querySelector(".bloco-ofertas")){
    iniciarTrocaImagenOferta();
}

if(window.location.pathname.includes("carrinho.html")){
    inicarRenderizacaoProdutosCarrinhos();
}

if(document.querySelector(".pesquisa__botao-filtrar")){
    filtrarProdutos();
}

if(document.querySelector(".botao-carrinho")){
    ouvinteFinalizarPedido();
}