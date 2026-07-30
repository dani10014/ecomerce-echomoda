
import {exibirAlerta} from "./alertaadicao.js";

export function editarPerfil(){
    new perfil()
}

class perfil{
    constructor(){
        this.espacoNome = document.querySelector("#campo-nome")
        this.emailUsuario = document.querySelector("#espaco-email")
        this.setaVoltarHome = document.querySelector("#seta-voltar-home")
        
        this.ouvintesBotoesMenu()
        this.atualizarPerfil()
        this.setaVoltar()
    }

    atualizarPerfil(){
        const usuario = JSON.parse(localStorage.getItem("Usuario")) || {}
        const nome = usuario.nome || "Nome do cliente"
        const email = usuario.email || (usuario.nome ? `${usuario.nome.toLowerCase().replace(/\s+/g, ".")}@exemplo.com` : "usuario@exemplo.com")
        
        this.espacoNome.innerText = nome
        this.emailUsuario.innerText = email
    }
    atualizarDadosCards(){

        /*todos os card de cada seção */
        const cardMeusDados = document.querySelector("#meus-dados-card")|| null
        

        if(cardMeusDados?.classList?.contains("ativo-card-conteudo")){
            const dadosUser = JSON.parse(localStorage.getItem("Usuario")) || {}
            const inputNumeroMeusDados = document.querySelector("#input-telefone-meus-dados");
            const inputNomeMeusDados = document.querySelector("#nome-usuario-meus-dados") || null;
            const inputEMailMeusDados = document.querySelector("#input-email-meus-dados") || null;
            const botaoSalvarAlteracoes = document.querySelector("#btn-salvar-alteracao-meus-dados");
            const btnCancelarAlteracoes = document.querySelector("#btn-cancelar-alteracao-meus-dados")

            $(inputNumeroMeusDados).mask("(+00) 00 00000-0000");

            inputNomeMeusDados.value = dadosUser.nome;
            inputEMailMeusDados.value = dadosUser.email;

            if(!dadosUser.numero){
                inputNumeroMeusDados.value = "Não informado"
            }else{
                inputNumeroMeusDados.value = dadosUser.numero
            }

            botaoSalvarAlteracoes.addEventListener("click",async (event)=>{
                event.preventDefault();

                const emailUsuario = inputEMailMeusDados.value;
                const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const numeroUsuario = inputNumeroMeusDados.value.trim();
                const idUser = localStorage.getItem("idUser");
                const tokenUser = localStorage.getItem("token");

                if(inputNomeMeusDados.value.trim() === "" || inputNomeMeusDados.value.trim().length > 32 || inputNomeMeusDados.value.trim().length < 3 ){
                    exibirAlerta("Preencha o campo nome","erro")
                    return
                }else if(!regexEmail.test(emailUsuario)){
                    exibirAlerta("Email incorreto","erro");
                    return
                }else if(numeroUsuario !== "Não informado" && numeroUsuario.trim().replace(/\D/g, "").length !== 13){
                    exibirAlerta("Numero invalido","erro");
                    return
                }

                try{
                    const resultado = await fetch("https://ecomerce-echomoda.onrender.com/api/alterar-dados-usuario",{
                        method:"PUT",
                        headers:{"Content-type":"application/json",
                                "Authorization": `Bearer ${tokenUser}`
                                },

                        body:JSON.stringify({
                            idUser:idUser,
                            nomeNovo:inputNomeMeusDados.value,
                            novoEmail:emailUsuario,
                            novoNumero:numeroUsuario,
                            token:tokenUser
                        })
                    })
                    const dadosNovos = await resultado.json();

                    if(resultado.status === 200){
                        exibirAlerta("Dados atualizados com sucesso","sucesso")
                        localStorage.setItem("Usuario",JSON.stringify(dadosNovos.resposta))
                    }
                }catch(erro){
                    exibirAlerta("Erro no servidor","erro")
                }
                
            })

        }
}
    ouvintesBotoesMenu(){
        const btnConteudoInicial = document.querySelector("#botao-inicial-perfil");
        const conteudoInicialPerfil = document.querySelector("#meus-dados-card");
        const botoes = document.querySelectorAll(".corpo-menu-lateral_botoes button")
        const cardsConteudos = document.querySelectorAll(".meus-dados-card");
        /*Por padrão eu iniciei ja com um botão seecionado*/
        btnConteudoInicial.classList.add("botao-ativo");
        conteudoInicialPerfil.classList.add("ativo-card-conteudo")
        this.atualizarDadosCards()


        botoes.forEach(botao =>{
            botao.addEventListener("click",() => {
                botoes.forEach(botaAtivo => {
                    botaAtivo.classList.remove("botao-ativo");
                    cardsConteudos.forEach(cardConteudo =>{
                        cardConteudo.classList.remove("ativo-card-conteudo")
                    })
                });
                botao.classList.add("botao-ativo")
                if(botao.dataset.id === "perfil"){
                    const cardPerfil = document.querySelector("#meus-dados-card");
                    cardPerfil.classList.add("ativo-card-conteudo")
                    this.atualizarDadosCards()
                }
            })
        })
        
    }
    setaVoltar(){
        if (!this.setaVoltarHome) return
        this.setaVoltarHome.addEventListener("click", () => {
            window.location.href = "/index.html"
        })
    }
}
