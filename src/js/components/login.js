import {verificarUsuarioExiste} from "../main.js";

export function login(){
    new userVerific()
}
    class userVerific{
        constructor(){
            this.alertaAdicao = document.querySelector(".confirmacao-adicao-carrinho");
            this.btnEntrar = document.querySelector("#btn-entrar");
            this.btnLinkCadastrar = document.querySelector("#btn-link-cadastrar");
            this.formularioLogin = document.querySelector(".formulario-entrar");
            this.formularioCadastro = document.querySelector(".formulario-cadastrar");
            this.textoLogin = document.querySelector(".texto-logar");
            this.textoJaPossuiCadastro = document.querySelector("#texto-ja-possui-login");
            this.btnCadastrar = document.querySelector("#btn-cadastrar");
            this.formularioVerificarEmail = document.querySelector(".formulario-verificar-codigo");
            this.loadingLogin = document.querySelector("#spinner-loading-login");
            this.loadingCadastrar = document.querySelector("#spinner-loading-cadastro");
            this.formularioVerificarEmail = document.querySelector(".formulario-verificar-codigo")
            this.btnEnviarCodigo = document.querySelector("#btn-verificar-codigo");
            this.loadingEnviarCodigo = document.querySelector("#spinner-loading-verificar-codigo");
            
            this.ouvinteBotaoEntrar();
            this.ouvinteMudançaDeBotaoCadastrar();
            this.ouvinteBotaoCadastrar();
        }
        /** Ouvinte no botao de logar para verificar os campos e verificar com o servidor*/
        ouvinteBotaoEntrar(){
            if(this.btnEntrar){
            this.btnEntrar.addEventListener("click",async (event) => {
                event.preventDefault()
                    let nome = document.querySelector("#nome").value.trim()
                    let email = document.querySelector("#email").value.trim()
                    let senha = document.querySelector("#senha").value.trim()
                    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    this.exibirLoading("entrar")

                if(nome === "" || !regexEmail.test(email) || email === "" || senha === ""){
                        this.exibirAlerta("Por favor preencha todos os campos","erro")
                        setTimeout(()=>{
                            this.exibirLoading("entrar")
                        },1000)
                    return
                }else{
                    let dadosUser = {
                        nome:nome,
                        email:email.toLowerCase(),
                        senha:senha,
                    }
                try {
                    
                    const resposta = await fetch("https://ecomerce-echomoda.onrender.com/api/logar", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, senha })
                    });   
                
                    if(!resposta.ok){
                        this.exibirAlerta("Impossivel entrar","erro");
                        return
                    }

                    const resultado = await resposta.json();

                    if (resposta.status === 200 && resultado.sucesso === true) {
                        this.exibirAlerta("Código de segurança enviado!", "sucesso");
                    
                        sessionStorage.setItem("tipo_acao", "login");

                        sessionStorage.setItem("temp_user_login", JSON.stringify({
                            email: email,
                            nome: resultado.usuario.nome || nome,
                        }));
                    
                        localStorage.setItem("idUser",JSON.stringify(resultado.usuario.id))

                        this.formularioLogin.style.display = "none";
                        this.btnLinkCadastrar.style.display = "none";
                        this.textoLogin.style.display = "none";
                        this.exibirVerificacaoEmail(email);
                        await this.enviarCodigoEmail();
                        this.verificarCodigo6Digitos();
                    } 
                
                    else {
                        this.exibirAlerta(resultado.erro || "E-mail ou senha inválidos", "erro");
                        return
                    }

                } catch (erro) {
                    this.exibirAlerta("Erro de conexão com o servidor", "erro");
                    return
                } finally {
                    this.exibirLoading("entrar");
                }
            }
        })
    }
}
        /**Ouvinte no botao que envia os dados para o servidor e verificar se o usuario ja tem uma conta com esses dados*/
        ouvinteBotaoCadastrar(){
            if(this.btnCadastrar){
                this.btnCadastrar.addEventListener("click", async (event) => {
                    event.preventDefault()
                    let nome = document.querySelector("#nome-cadastro").value.trim();
                    let email = document.querySelector("#email-cadastro").value.trim();
                    let senha = document.querySelector("#senha-cadastro").value.trim();
                    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    this.exibirLoading("cadastrar")

                    if(nome === "" || !regexEmail.test(email) || email === "" || senha === ""){
                        this.exibirAlerta("Por favor preencha todos os campos","erro")
                        setTimeout(()=>{
                            this.exibirLoading("cadastrar")
                        },1000)
                        return
                    }else{
                        let dadosUser ={
                            nome:nome,
                            email:email.toLowerCase(),
                            senha:senha
                        }
                        sessionStorage.setItem("temp_user", JSON.stringify({ nome, email, senha }));
                        try{
                            
                            const resposta = await fetch("https://ecomerce-echomoda.onrender.com/api/verificar-cadastro",{
                                method:"POST",
                                headers:{
                                    "Content-Type": "application/json" 
                                },
                                body:JSON.stringify({
                                    nome:dadosUser.nome,
                                    email:dadosUser.email,
                                    senha:dadosUser.senha,
                                })
                            });
                            
                            if(resposta.status === 200){
                                this.exibirAlerta("Conta ja existente","erro")
                                return
                            }
                            if(resposta.status === 409){
                                this.exibirAlerta("Seguindo para verificação de email","sucesso")

                                sessionStorage.setItem("tipo_acao", "cadastro");
                                
/*______________________________Preciso salvar o UIDD do cliente______________________________________________________*/

                                this.formularioCadastro.style.display ="none";
                                this.btnLinkCadastrar.style.display = "none";
                                this.textoLogin.style.display = "none";
                                this.exibirVerificacaoEmail(email)
                                await this.enviarCodigoEmail();
                                this.verificarCodigo6Digitos();
                            }

                        }catch(erro){
                            this.exibirAlerta("Ocorreu um erro em nosso servidor","erro")
                            return
                        }finally{
                            this.exibirLoading("cadastrar")
                        }
                }
                })
            }
        }
        /**Ouvinte no botao que muda para cadastro ou login */
        ouvinteMudançaDeBotaoCadastrar(){
            this.btnLinkCadastrar.addEventListener("click",(event) => {
                event.preventDefault();

                if(this.btnLinkCadastrar.textContent.trim() === "Entrar"){
                    this.textoLogin.textContent = "Faça login";
                    this.textoJaPossuiCadastro.textContent = "Não possui login?";
                    this.btnLinkCadastrar.textContent = "Cadastre-se";

                    this.formularioCadastro.classList.add("formulario-cadastrar-desativado");
                    setTimeout(() => {
                        this.formularioCadastro.style.display = "none";
                        this.formularioCadastro.classList.remove("formulario-cadastrar-desativado");
                    }, 500);

                    this.formularioLogin.style.display = "flex";
                    setTimeout(() => {
                        this.formularioLogin.offsetHeight;
                        this.formularioLogin.classList.add("formulario-cadastrar-ativo");
                    }, 20);
                    return;
                }

                this.textoLogin.textContent = "Cadastro";
                this.textoJaPossuiCadastro.textContent = "Ja possui login?";
                this.btnLinkCadastrar.textContent = "Entrar";

                this.formularioLogin.classList.add("formulario-cadastrar-desativado");
                setTimeout(() => {
                    this.formularioLogin.style.display = "none";
                    this.formularioLogin.classList.remove("formulario-cadastrar-desativado");
                }, 500);

                
                this.formularioCadastro.style.display = "flex";
                
                setTimeout(() => {
                    this.formularioCadastro.offsetHeight;
                    this.formularioCadastro.classList.add("formulario-cadastrar-ativo");
                }, 200);
            })
        }
        /*Metodo que exibi um alerta se foi sucesso ou erro*/
        exibirAlerta(mensagem,tipo){
            const icon = tipo === 'sucesso' ? "fa-check-circle" : "fa-times-circle";
            const cor = tipo === 'sucesso' ? "#28a745" : "#dc3545";

            this.alertaAdicao.querySelector(".container h5").innerHTML = 
                `<i class="fas ${icon} me-2" style="color: ${cor};"></i>${mensagem}`;
    
            this.alertaAdicao.style.display = "flex";
                setTimeout(() => this.alertaAdicao.querySelector(".container").style.transform = "translateY(0)", 200);
    
                setTimeout(() => {
                    this.alertaAdicao.querySelector(".container").style.transform = "translateY(130%)";
                    setTimeout(() => this.alertaAdicao.style.display = "none", 400);
                }, 2000);
        }
        /*Exibi loading nos botões*/
        exibirLoading(botao){
            if(botao === "entrar"){
                this.loadingLogin.classList.toggle("spinner-loading-ativo")
                this.btnEntrar.classList.toggle("esconder-botao-entrar-ou-cadastro")
            }
            if(botao === "verificar-codigo"){  
                this.loadingEnviarCodigo.classList.toggle("spinner-loading-ativo")
                this.btnEnviarCodigo.classList.toggle("esconder-botao-entrar-ou-cadastro")
            }else{
                this.loadingCadastrar.classList.toggle("spinner-loading-ativo")
                this.btnCadastrar.classList.toggle("esconder-botao-entrar-ou-cadastro")
            }
        }
        /*Exibi o card de verificação de email*/
        exibirVerificacaoEmail(email){
            this.formularioVerificarEmail.style.display = "flex";
            setTimeout(()=>{
                this.formularioVerificarEmail.querySelector("h5").innerHTML = `Codigo enviado para: ${email}`;
                this.formularioVerificarEmail.classList.add("formulario-cadastrar-ativo")
            })
        }

        async enviarCodigoEmail(){
            let email = document.querySelector("#email-cadastro").value.trim();
            if(!email){
                email = document.querySelector("#email").value.trim()
            }

            this.exibirLoading("verificar-codigo");
            this.textoJaPossuiCadastro.style.display = "none";

        try {
            const resultado = await fetch("https://ecomerce-echomoda.onrender.com/api/enviar-codigo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
        if (resultado.ok) {
            this.exibirAlerta("Código enviado com sucesso!", "sucesso");
            this.reenvioCodigoEmail();
        }
        if(!resultado.ok){
            this.exibirAlerta("Erro ao enviar o codigo","erro")
        }
        } catch (erro) {
            console.error("Erro ao solicitar código:", erro);
            this.exibirAlerta("Erro ao enviar e-mail", "erro");
        }finally{
            this.exibirLoading("verificar-codigo");
        }
}
        /*Faz um fetch no meu servidor verificando se o email digitado é identico ao gerado e mandado no email do cliente*/ 
        verificarCodigo6Digitos(){
            if(this.btnEnviarCodigo){
                this.btnEnviarCodigo.addEventListener("click",async (event) => {
                    event.preventDefault();

                    const espacosCodigos = document.querySelectorAll(".codigo-6-digitos");
                    let emailUsuario = document.querySelector("#email-cadastro").value.trim();
                    let todoOCodigo = "";

                    if(!emailUsuario){
                        emailUsuario = document.querySelector("#email").value
                    }

                    this.exibirLoading("verificar-codigo")

                    espacosCodigos.forEach(codigo => {
                        todoOCodigo += codigo.value
                    });
    
                    if(todoOCodigo.length < 6){
                        this.exibirAlerta("Preencha todos os campos","erro")
                        this.exibirLoading("verificar-codigo")
                        return
                    }else{
                        try{
                            const resposta = await fetch("https://ecomerce-echomoda.onrender.com/api/verificar-codigo",{
                                method:"POST",
                                headers:{"Content-Type":"application/json"},
                                body:JSON.stringify({
                                    codigo:todoOCodigo,
                                    email:emailUsuario
                                })
                            })
                            if(!resposta.ok){
                                this.exibirAlerta("Erro ao verificar o codigo","erro");
                                return
                            }

                            if(resposta.status === 200){
                                    this.exibirAlerta("Código verificado!", "sucesso");
    
                                    // Descobre se o cliente veio do Login ou do Cadastro
                                    const tipoAcao = sessionStorage.getItem("tipo_acao");
                                    
                                    if (tipoAcao === "cadastro") {
                                        const dadosTemp = JSON.parse(sessionStorage.getItem("temp_user"));
                                        if(!dadosTemp) return this.exibirAlerta("Erro ao recuperar dados", "erro");
                                        
                                        const cadastroSucesso = await this.criarCadastro(dadosTemp.email, dadosTemp.senha, dadosTemp.nome, true);
                                        
                                        if(cadastroSucesso){
                                            localStorage.setItem("Usuario", JSON.stringify(dadosTemp));
                                            sessionStorage.removeItem("tipo_acao");
                                            verificarUsuarioExiste();
                                        }
                                    } 
                                    else if (tipoAcao === "login") {
                                        const dadosLogin = JSON.parse(sessionStorage.getItem("temp_user_login"));
                                        if(!dadosLogin) return this.exibirAlerta("Erro ao recuperar dados de login", "erro");
                                        
                                        localStorage.setItem("Usuario", JSON.stringify(dadosLogin));
                                        
                                        if (dadosLogin.id) {
                                            localStorage.setItem("idUser", JSON.stringify(dadosLogin.id));
                                        }

                                        sessionStorage.removeItem("temp_user_login");
                                        sessionStorage.removeItem("tipo_acao");
                                        verificarUsuarioExiste();
                                    }
                            }
                            else{
                                this.exibirAlerta("Codigo invalido","erro");
                                return
                            }
                        }catch(erro){
                            this.exibirAlerta("Erro no servidor","erro")
                            return
                        }finally{
                            this.exibirLoading("verificar-codigo")
                        }
                    }
                })
            }
        }
        async criarCadastro(email, senha, nome, emailVerificado){
            
            if(emailVerificado !== true) return false;
            
            try{
                const resposta = await fetch("https://ecomerce-echomoda.onrender.com/api/criar-cadastro",{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body: JSON.stringify({ email, nome, senha })
                })

                if(!resposta.ok){
                    this.exibirAlerta("Erro ao criar cadastro","erro")
                    return
                }

                const dados = await resposta.json();

                if(resposta.status === 201){
                    this.exibirAlerta("Usuario cadastrado com sucesso","sucesso");
                    localStorage.setItem("idUser",JSON.stringify(dados.novo.id))
                    sessionStorage.removeItem("temp_user");
                    return true;
                } else {
                    this.exibirAlerta("Erro ao cadastrar no servidor", "erro");
                    return false;
                }
            }catch(erro){
                this.exibirAlerta("Erro de conexão com o servidor","erro");
                return false;
            }
        }
        reenvioCodigoEmail(){
            const btnReenviarCodigo = document.querySelector("#btn-reenviar-codigo");

        if (!btnReenviarCodigo) {
            console.error("Botão de reenvio não encontrado");
            return;
        }

        let tempoRestante = 300; 
        btnReenviarCodigo.disabled = true;

        const intervalo = setInterval(() => {
        tempoRestante--;
        
        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;
        btnReenviarCodigo.textContent = `Aguarde ${minutos}:${segundos.toString().padStart(2, '0')}`;

        if (tempoRestante <= 0) {
            clearInterval(intervalo);
            btnReenviarCodigo.disabled = false;
            btnReenviarCodigo.textContent = "Reenviar";
        }
    }, 1000);
}
}