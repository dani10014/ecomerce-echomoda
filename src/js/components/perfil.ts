
import {exibirAlerta} from "./alertaadicao.js";
declare const $: any;

export function editarPerfil(){
    new perfil()
}
interface dados{
    nome:string,
    email:string,
    created_at:string,
    numero:string,
    cep:string,
    rua:string,
    bairro:string,
    UF:string,

}
class perfil{
        espacoNome:HTMLInputElement | null
        emailUsuario:HTMLInputElement | null
        setaVoltarHome:HTMLElement | null

    constructor(){
        this.espacoNome = document.querySelector("#campo-nome") as HTMLInputElement
        this.emailUsuario = document.querySelector("#espaco-email") as HTMLInputElement 
        this.setaVoltarHome = document.querySelector("#seta-voltar-home") as HTMLInputElement
        
        this.ouvintesBotoesMenu()
        this.atualizarPerfil()
        this.setaVoltar()
    }

    atualizarPerfil(){
        const usuario = JSON.parse(localStorage.getItem("Usuario") || "{}") as dados
        const nome = usuario.nome || "Nome do cliente"
        const email = usuario.email || (usuario.nome ? `${usuario.nome.toLowerCase().replace(/\s+/g, ".")}@exemplo.com` : "usuario@exemplo.com")
        if(this.espacoNome){
            this.espacoNome.innerText = nome
        }
        if(this.emailUsuario){
            this.emailUsuario.innerText = email
        }
    }
    atualizarDadosCards(){

        /*todos os card de cada seção */
        const cardMeusDados = document.querySelector("#meus-dados-card") as HTMLElement
        const cardEndereco = document.querySelector("#dados-endereco") as HTMLElement
        
        /****************************** Seção Perfil ****************************************** */

        if(cardMeusDados?.classList?.contains("ativo-card-conteudo")){
            const dadosUser = JSON.parse(localStorage.getItem("Usuario") || "{}") as dados
            const inputNumeroMeusDados = document.querySelector("#input-telefone-meus-dados") as HTMLInputElement
            const inputNomeMeusDados = document.querySelector("#nome-usuario-meus-dados") as HTMLInputElement
            const inputEMailMeusDados = document.querySelector("#input-email-meus-dados") as HTMLInputElement
            const botaoSalvarAlteracoes = document.querySelector("#btn-salvar-alteracao-meus-dados") as HTMLElement
            const btnCancelarAlteracoes = document.querySelector("#btn-cancelar-alteracao-meus-dados") as HTMLElement
            
            $(inputNumeroMeusDados).mask("(+00) 00 00000-0000")

            if(inputNomeMeusDados){
                inputNomeMeusDados.value = dadosUser.nome;
            }
            if(inputNomeMeusDados){
                inputEMailMeusDados.value = dadosUser.email;
            }

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
                const tokenUser = localStorage.getItem("Token");

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
                    
                    console.log(dadosNovos);

                    if(resultado.status === 200){
                        exibirAlerta("Dados atualizados com sucesso","sucesso")
                        localStorage.setItem("Usuario",JSON.stringify(dadosNovos.Resultado))
                        this.atualizarPerfil()
                    }
                }catch(erro){
                    exibirAlerta("Erro no servidor","erro")
                }
                
            })

        }
        /****************************** Seção endereço ****************************************** */
        if(cardEndereco?.classList?.contains("ativo-card-conteudo")){
            const dadosEndereco = JSON.parse(localStorage.getItem("endereco") || "{}") as dados

            const inputMeuEnderecoCep = document.querySelector("#input-endereco-cep") as HTMLInputElement;
            const btnBuscarCep = document.querySelector("#btn-buscar-cep") as HTMLButtonElement;
            const inputMeuEnderecoNumeroCasa = document.querySelector("#numeroCasa") as HTMLInputElement;
            const inputMeuEnderecoUf = document.querySelector("#uf") as HTMLInputElement;
            
            $(inputMeuEnderecoCep).mask("00000000");

            if (dadosEndereco.cep) {
                inputMeuEnderecoCep.value = dadosEndereco.cep;
            } else {
                inputMeuEnderecoCep.value = "Não informado";
            }
            
            if (dadosEndereco.numero) {
                inputMeuEnderecoNumeroCasa.value = dadosEndereco.numero;
            } else {
                inputMeuEnderecoNumeroCasa.value = "Não informado";
            }

            if (dadosEndereco.UF) {
                inputMeuEnderecoUf.value = dadosEndereco.UF;
            } else {
                inputMeuEnderecoUf.value = "Não informado"
            }
    }
}
    ouvintesBotoesMenu(){
        const btnConteudoInicial = document.querySelector("#botao-inicial-perfil") as HTMLElement;
        const conteudoInicialPerfil = document.querySelector("#meus-dados-card") as HTMLElement;
        const botoes = document.querySelectorAll(".corpo-menu-lateral_botoes button") as NodeListOf<HTMLButtonElement>
        const cardsConteudos = document.querySelectorAll(".meus-dados-card") as NodeListOf<HTMLElement>
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
                botao.classList.add("botao-ativo");

                if(botao.dataset.id === "perfil"){
                    const cardPerfil = document.querySelector("#meus-dados-card") as HTMLElement;
                    cardPerfil.classList.add("ativo-card-conteudo")
                    this.atualizarDadosCards()
                }
                if(botao.dataset.id === "endereco"){
                    const cardEndereco = document.querySelector("#dados-endereco") as HTMLElement;
                    cardEndereco.classList.add("ativo-card-conteudo")
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
