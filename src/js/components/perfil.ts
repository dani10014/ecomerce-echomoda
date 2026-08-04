
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
    estado:string,
    cidade:string,
    complemento:string,
}

class perfil{

        espacoNome:HTMLInputElement | null
        emailUsuario:HTMLInputElement | null
        setaVoltarHome:HTMLElement | null
        dadosUsuarioPerfil: object[];
        loadingFetch:HTMLElement | null;
        backDropGlass:HTMLElement| null ;
        dadosUsuarioEndereco: Partial<dados>;

    constructor(){
        this.espacoNome = document.querySelector("#campo-nome") as HTMLInputElement
        this.emailUsuario = document.querySelector("#espaco-email") as HTMLInputElement 
        this.setaVoltarHome = document.querySelector("#seta-voltar-home") as HTMLInputElement
        this.backDropGlass = document.querySelector(".backdrop-glass-perfil") as HTMLElement;
        this.loadingFetch = document.querySelector(".loading") as HTMLElement;

        this.dadosUsuarioEndereco = {};
        this.dadosUsuarioPerfil = [];

        this.buscarDadosUsuarioEndereco()
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
    /*********************** Preciso corrigir ainda *******************/
    async buscarDadosUsuarioEndereco(){
        const idUser = localStorage.getItem("idUser");
        this.backDropGlass?.classList.add("ativo-loading-glass");
        this.loadingFetch?.classList.add("ativo-loading-glass");

        try{
            const resultadoBuscaDados = await fetch(`https://ecomerce-echomoda.onrender.com/api/buscar-endereco/${idUser}`,{
                method:"GET",
                headers:{"Content-type":"application/json"},
                credentials:"include",
            })
            
            const dadosBusca = await resultadoBuscaDados.json();

            if(resultadoBuscaDados.status === 200){
                this.dadosUsuarioEndereco = dadosBusca.endereco
                this.backDropGlass?.classList.remove("ativo-loading-glass");
                this.loadingFetch?.classList.remove("ativo-loading-glass");

                /************************************************************************************* */
                /************************ Fetch buscando historico ********************************** */

            }
            if(resultadoBuscaDados.status === 400){
                exibirAlerta("Erro ao buscar dados","erro")
                return
            }
        
        }catch(erro){
            exibirAlerta("Erro no servidor","erro")
        }finally{
            this.backDropGlass?.classList.remove("ativo-loading-glass");
            this.loadingFetch?.classList.remove("ativo-loading-glass");
        }
    }
    atualizarDadosCards(){

        /*todos os card de cada seção */
        const cardMeusDados = document.querySelector("#meus-dados-card") as HTMLElement
        const cardEndereco = document.querySelector("#dados-endereco") as HTMLElement
        
        /****************************** Seção Perfil ****************************************** */

        if(cardMeusDados?.classList?.contains("ativo-card-conteudo")){
            const dadosUser = JSON.parse(localStorage.getItem("Usuario") || "{}") as dados;
            const inputNumeroMeusDados = document.querySelector("#input-telefone-meus-dados") as HTMLInputElement
            const inputNomeMeusDados = document.querySelector("#nome-usuario-meus-dados") as HTMLInputElement
            const inputEMailMeusDados = document.querySelector("#input-email-meus-dados") as HTMLInputElement
            const botaoSalvarAlteracoes = document.querySelector("#btn-salvar-alteracao-meus-dados") as HTMLElement
            const btnCancelarAlteracoes = document.querySelector("#btn-cancelar-alteracao-meus-dados") as HTMLElement
            
            $(inputNumeroMeusDados).mask("(+00) 00 00000-0000")

            if(inputNomeMeusDados){
                inputNomeMeusDados.value = dadosUser.nome ?? "";
            }
            if(inputEMailMeusDados){
                inputEMailMeusDados.value = dadosUser.email ?? "";
            }

            if(!dadosUser.numero){
                inputNumeroMeusDados.value = "Não informado"
            }else{
                inputNumeroMeusDados.value = dadosUser.numero
            }

            let alteracaoRolando = false;

            botaoSalvarAlteracoes.addEventListener("click",async (event)=>{
                event.preventDefault();

                const emailUsuario = inputEMailMeusDados.value;
                const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const numeroUsuario = inputNumeroMeusDados.value.trim();
                const idUser = localStorage.getItem("idUser");

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
                
                alteracaoRolando = true;

                try{
                    const resultado = await fetch("https://ecomerce-echomoda.onrender.com/api/alterar-dados-usuario",{
                        method:"PUT",
                        headers:{"Content-type":"application/json"},
                        credentials: "include",
                        body:JSON.stringify({
                            idUser:idUser,
                            nomeNovo:inputNomeMeusDados.value,
                            novoEmail:emailUsuario,
                            novoNumero:numeroUsuario
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
                }finally{
                    alteracaoRolando = false;
                }
                
            })
            btnCancelarAlteracoes.addEventListener("click", () => {
                if(alteracaoRolando === true){return}

                inputNomeMeusDados.value = dadosUser.nome ?? "";
                inputEMailMeusDados.value = dadosUser.email ?? "";
                inputNumeroMeusDados.value = dadosUser.numero || "Não informado";
            })

        }
        /****************************** Seção endereço ****************************************** */
        if(cardEndereco?.classList?.contains("ativo-card-conteudo")){
            const dadosEndereco = this.dadosUsuarioEndereco as dados;

            const inputMeuEnderecoCep = document.querySelector("#input-endereco-cep") as HTMLInputElement;
            const btnBuscarCep = document.querySelector("#btn-buscar-cep") as HTMLButtonElement;
            const inputMeuEnderecoNumeroCasa = document.querySelector("#numeroCasa") as HTMLInputElement;
            const inputMeuEnderecoUf = document.querySelector("#uf") as HTMLInputElement;
            const inputMeuEnderecoCidade = document.querySelector("#input-dados-endereco-cidade") as HTMLInputElement;
            const inputMeuEnderecoRua = document.querySelector("#input-dados-endereco-rua") as HTMLInputElement;
            const inputMeuEnderecoBairro = document.querySelector("#input-dados-endereco-bairro") as HTMLInputElement;
            const btnSalvarEndereco = document.querySelector("#btn-salvar-alteracao-endereco") as HTMLButtonElement;
            const inputMeuEnderecoComplemento = document.querySelector("#input-dados-endereco-referencia") as HTMLInputElement;

            $(inputMeuEnderecoCep).mask("00000000");

            if (dadosEndereco.cep) {
                inputMeuEnderecoCep.value = dadosEndereco.cep;
            } else {
                inputMeuEnderecoCep.value = "Não informado";
            }
            
            if(dadosEndereco.cidade){
                inputMeuEnderecoCidade.value = dadosEndereco.cidade;
            }else{
                inputMeuEnderecoCidade.value = "Não informado";
            }

            if (dadosEndereco.numero) {
                inputMeuEnderecoNumeroCasa.value = dadosEndereco.numero;
            } else {
                inputMeuEnderecoNumeroCasa.value = "Não informado";
            }

            if (dadosEndereco.estado) {
                inputMeuEnderecoUf.value = dadosEndereco.estado;
            } else {
                inputMeuEnderecoUf.value = "Não informado"
            }

            if(dadosEndereco.bairro){
                inputMeuEnderecoBairro.value = dadosEndereco.bairro;
            }else{
                inputMeuEnderecoBairro.value = "Não informado"
            }

            if(dadosEndereco.rua){
                inputMeuEnderecoRua.value = dadosEndereco.rua;
            }else{
                inputMeuEnderecoRua.value = "Não informado"
            }

            if(dadosEndereco.complemento){
                inputMeuEnderecoComplemento.value = dadosEndereco.complemento
            }
            
            btnBuscarCep.addEventListener("click", async (event) => {
                event.preventDefault();
                const cepDigitado = inputMeuEnderecoCep.value.trim();

                if (cepDigitado === "" || cepDigitado.length !== 8) {
                    exibirAlerta("Digite um CEP válido", "erro");
                    return;
                }

                try{
                    const resultado = await fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`);

                    const resposta = await resultado.json();

                    if(resultado.status === 200){
                        inputMeuEnderecoUf.value = resposta.uf;
                        inputMeuEnderecoCidade.value = resposta.localidade;
                    }
                    if(resultado.status === 400){
                        exibirAlerta("CEP não encontrado","erro");
                        return;
                    }

                }catch(erro){
                    exibirAlerta("Erro no servidor","erro");
                }
            })

            let alteracaoRolando:boolean = false;

            btnSalvarEndereco.addEventListener("click", async (event) => {
                event.preventDefault();
                
                if(inputMeuEnderecoCep.value.trim() === "" || inputMeuEnderecoCep.value.trim().length !== 8){
                    exibirAlerta("Digite um CEP válido","erro");
                    return;
                }
                if(inputMeuEnderecoNumeroCasa.value.trim() === ""){
                    exibirAlerta("Digite o numero da casa","erro");
                    return;
                }
                if(inputMeuEnderecoCidade.value.trim() === ""){
                    exibirAlerta("Digite a cidade","erro");
                    return;
                }
                if(inputMeuEnderecoUf.value.trim() === ""){
                    exibirAlerta("Digite a UF","erro");
                    return;
                }
                if(inputMeuEnderecoBairro.value.trim() === ""){
                    exibirAlerta("Digite o bairro","erro");
                    return;
                }
                if(inputMeuEnderecoRua.value.trim() === ""){
                    exibirAlerta("Digite a rua","erro");
                    return;
                }
        
                const idUser = localStorage.getItem("idUser");
                
                alteracaoRolando = true;

                try{ 
                    const resultado = await fetch("https://ecomerce-echomoda.onrender.com/api/alterar-endereco",{
                        method:"POST",
                        headers:{"Content-type":"application/json"},
                        credentials: "include",
                        body:JSON.stringify({
                            cep:inputMeuEnderecoCep.value,
                            numero:inputMeuEnderecoNumeroCasa.value,
                            rua:inputMeuEnderecoRua.value,
                            bairro:inputMeuEnderecoBairro.value,
                            cidade:inputMeuEnderecoCidade.value,
                            estado:inputMeuEnderecoUf.value,
                            idUser:idUser,
                            complemento:inputMeuEnderecoComplemento.value || "Não informado"
                        })
                    })

                    const dadosEnderecoAtualizados = await resultado.json();

                    if(resultado.status === 200){
                        exibirAlerta("Endereço atualizado com sucesso","sucesso");
                        this.dadosUsuarioEndereco = dadosEnderecoAtualizados.endereco;
                        
                        inputMeuEnderecoCep.value = dadosEnderecoAtualizados.endereco.cep;
                        inputMeuEnderecoNumeroCasa.value = dadosEnderecoAtualizados.endereco.numero;
                        inputMeuEnderecoRua.value = dadosEnderecoAtualizados.endereco.rua;
                        inputMeuEnderecoBairro.value = dadosEnderecoAtualizados.endereco.bairro;
                        inputMeuEnderecoCidade.value = dadosEnderecoAtualizados.endereco.cidade;
                        inputMeuEnderecoUf.value = dadosEnderecoAtualizados.endereco.estado;
                        inputMeuEnderecoComplemento.value = dadosEnderecoAtualizados.endereco.complemento;
                    }
                
                }catch(erro){
                    exibirAlerta("Erro no servidor","erro");
                }finally{
                    alteracaoRolando = false;
                }
            })
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
