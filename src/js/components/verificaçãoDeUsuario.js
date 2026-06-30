import {verificarUsuarioExiste} from "../main.js";

export function verificarUsuario(){
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
                    try{
                        const resposta =  await fetch("http://localhost:3000/api/verificar-cadastro",{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify({
                                nome:dadosUser.nome,
                                email:dadosUser.email,
                                senha:senha,
                            })
                        })
                        if(resposta.status === 409){
                            this.exibirAlerta("seguindo para verificação de email","sucesso");
                            this.formularioLogin.style.display = "none";
                            this.btnLinkCadastrar.style.display = "none"
                            this.exibirVerificacaoEmail(email);
                            this.enviarCodigoEmail(email);
                            this.verificarCodigo6Digitos()
                        }
                        if(resposta.status === 200){
                            this.exibirAlerta("Email ou senha incorreta","erro")
                        return
                        }
                    }catch(erro){
                        alert("Erro no servidor: ",erro)
                        return
                    }finally{
                        this.exibirLoading("entrar")
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
                        try{
                            const resposta = await fetch("http://localhost:3000/api/verificar-cadastro",{
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

                            if(resposta.status === 409){
                                this.exibirAlerta("Conta ja existente","erro")
                                return
                            }
                            if(resposta.status === 200){
                                this.exibirAlerta("Seguindo para verificação de email","sucesso")
                                this.formularioCadastro.style.display ="none";
                                this.btnLinkCadastrar.style.display = "none";
                                this.textoLogin.style.display = "none";
                                this.exibirVerificacaoEmail(email)
                                this.enviarCodigoEmail();
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
                email = document.querySelector("#email").value
            }
        try {
            const resultado = await fetch("http://localhost:3000/api/enviar-codigo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
        if (resultado.ok) {
            this.exibirAlerta("Código enviado com sucesso!", "sucesso");
        }
        } catch (erro) {
            console.error("Erro ao solicitar código:", erro);
            this.exibirAlerta("Erro ao enviar e-mail", "erro");
        }
}
        /*Faz um fetch no meu servidor verificando se o email digitado é identico ao gerado e mandado no email do cliente*/ 
        verificarCodigo6Digitos(){
            if(this.btnEnviarCodigo){
                this.btnEnviarCodigo.addEventListener("click",async (event) => {
                    event.preventDefault();

                    const espacosCodigos = document.querySelectorAll(".codigo-6-digitos");
                    let emailUsuario = document.querySelector("#email-cadastro").value.trim();
                    let emailVerificado = false;
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
                    }else{
                        try{
                            const resposta = await fetch("http://localhost:3000/api/verificar-codigo",{
                                method:"POST",
                                headers:{"Content-Type":"application/json"},
                                
                                body:JSON.stringify({
                                    codigo:todoOCodigo,
                                    email:emailUsuario
                                })
                            })
                            if(resposta.status === 200){
                                    this.exibirAlerta("Código verificado!", "sucesso");
    
                                    // PEGUE OS DADOS QUE ESTÃO NO FORMULÁRIO AQUI
                                    let nome = document.querySelector("#nome-cadastro").value.trim();
                                    let email = document.querySelector("#email-cadastro").value.trim();
                                    let senha = document.querySelector("#senha-cadastro").value.trim();
                                    
                                    if(!nome && !email && !senha){
                                        nome = document.querySelector("#nome").value
                                        email = document.querySelector("#email").value.trim()
                                        senha = document.querySelector("#senha").value.trim()
                                    }
                                    // Agora chame a função que envia para o /api/criar-cadastro
                                    await this.criarCadastro(email, senha, nome, true);
                                    localStorage.setItem("Usuario",JSON.stringify({nome,email,senha}))
                                    verificarUsuarioExiste()
                                    
                            }
                            else{
                                this.exibirAlerta("Codigo invalido","erro")
                                return
                            }
                        }catch(erro){
                            this.exibirAlerta("Erro no servidor","erro")
                        }finally{
                            this.exibirLoading("verificar-codigo")
                        }
                    }
                    
                })
            }
        }
        async criarCadastro(email,senha,nome,emailVerificado){
            if(emailVerificado === true){
                try{
                    const resposta = await fetch("http://localhost:3000/api/criar-cadastro",{
                            method:"POST",
                            headers:{"Content-Type":"application/json"},
                            body:
                                JSON.stringify({
                                    email:email,
                                    nome:nome,
                                    senha:senha,
                                })
                    })
                    if(resposta.status === 201){
                        this.exibirAlerta("Usuario cadastrado com sucesso","sucesso")
                    }
                }catch(erro){
                        this.exibirAlerta("Erro no servidor",erro)
                    }
                }else{
                    return
                }
            }
        }