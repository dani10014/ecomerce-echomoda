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
    
    if (usuarioExiste) {
        let usuario = JSON.parse(usuarioExiste);
        console.log("Usuário logado:", usuario);
        if(document.querySelector("#btn-entrar")){
            window.location.href = "index.html";
        }
    } else {
        console.log("Nenhum usuário logado no momento.");
        window.location.href = "login.html";
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