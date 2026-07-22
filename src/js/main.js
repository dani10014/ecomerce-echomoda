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
import { login } from './components/login.js';
import { editarPerfil } from './components/perfil.js';
import { pagamentoPedido } from "./components/pagamento.js";

export function verificarUsuarioExiste(){
    let usuarioExiste = localStorage.getItem("Usuario");
    let paginaAtual = window.location.pathname
    
    const ehPaginaPrivada = paginaAtual === "/" || 
                            paginaAtual.includes("index.html") || 
                            paginaAtual.includes("carrinho.html") || 
                            paginaAtual.includes("favoritos.html") ||
                            paginaAtual.includes("perfil.html") ||
                            paginaAtual.includes("pagamento.html");

    console.log(paginaAtual)

    if(!usuarioExiste && ehPaginaPrivada){
        window.location.href = "login.html";
    }
    if(usuarioExiste && paginaAtual.includes("login.html")){
        window.location.href = "index.html";
    }
}

verificarUsuarioExiste()

if(document.querySelector("#main-pagamento-final")){
    pagamentoPedido();
}

if(document.querySelector("#btn-entrar")){
    login();
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
if(cabecalhoH1){
    if(cabecalhoH1.innerText === "Perfil"){
        editarPerfil()
    }
}