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
            this.espacoSenha = document.querySelector("#senha");

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

                if(nome === "" || !email.includes("@") || email === "" || senha === ""){
                        this.alertaAdicao.style.display = "flex";

                        this.alertaAdicao.querySelector(".container h5").innerHTML =( `<i class="fas fa-times-circle me-2" style="color: #dc3545;"></i>Senha ou email incorreta`)
                        
                            setTimeout(() => {
                                this.alertaAdicao.querySelector(".container").style.transform = "translateY(0)";
                            },200)

                            setTimeout(() => {
                                this.alertaAdicao.querySelector(".container").style.transform = "translateY(130%)"
                                setTimeout(() => {
                                    this.alertaAdicao.style.display = "none";
                                },400)

                            },2000)
                    return
                }else{
                    let dadosUser = {
                        nome:nome,
                        email:email,
                        senha:senha,
                    }
                    try{
                        const resposta =  await fetch("http://localhost:3000/api/logar",{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify({
                                email:dadosUser.email,
                                senha:senha
                            })
                        })
                        if(resposta.ok){
                            this.alertaAdicao.style.display = "flex";

                            this.alertaAdicao.querySelector(".container h5").innerHTML =( `<i class="fas fa-check-circle me-2" style="color: #28a745;"></i>Logado com sucesso`)
                        
                            setTimeout(() => {
                                this.alertaAdicao.querySelector(".container").style.transform = "translateY(0)";
                            },200)

                            setTimeout(() => {
                                this.alertaAdicao.querySelector(".container").style.transform = "translateY(130%)"
                                setTimeout(() => {
                                    this.alertaAdicao.style.display = "none";
                                },400)

                            },2000)

                            localStorage.setItem("Usuario",JSON.stringify(dadosUser))
                            senha = "";
                            email = "";
                            nome = "";
                        }
                        if(resposta.status === 401){
                            this.alertaAdicao.style.display = "flex";

                            this.alertaAdicao.querySelector(".container h5").innerHTML =( `<i class="fas fa-times-circle me-2" style="color: #dc3545;"></i>Nenhuma conta existente`)
                        
                            setTimeout(() => {
                                this.alertaAdicao.querySelector(".container").style.transform = "translateY(0)";
                            },200)

                            setTimeout(() => {
                                this.alertaAdicao.querySelector(".container").style.transform = "translateY(130%)"
                                setTimeout(() => {
                                    this.alertaAdicao.style.display = "none";
                                },400)

                            },2000)
                        return
                        }
                    }catch(erro){
                        alert("Erro no servidor: ",erro)
                    }
                }
                setTimeout(()=> {
                    verificarUsuarioExiste()
                },800)
            })
        }
        }
        /**Ouvinte no botao que envia os dados para o servidor e cadastrar*/
        ouvinteBotaoCadastrar(){
            if(this.btnCadastrar){
                this.btnCadastrar.addEventListener("click", async (event) => {
                    event.preventDefault()
                    let nome = document.querySelector("#nome-cadastro").value.trim();
                    let email = document.querySelector("#email-cadastro").value.trim();
                    let senha = document.querySelector("#senha-cadastro").value.trim();

                    if(nome === "" || !email.includes("@") || email === "" || senha === ""){
                        alert("Por favor Preencha todos os campos")
                        return
                    }else{
                        let dadosUser ={
                            nome:nome,
                            email:email,
                            senha:senha
                        }
                        try{
                            const resposta = await fetch("http://localhost:3000/api/cadastro",{
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

                            const resultado = await resposta.json()
                            
                            if(resposta.ok){
                                alert("Usuario cadastrado com sucesso")

                                localStorage.setItem("Usuario",JSON.stringify(dadosUser))
                                senha = "";
                                email = "";
                                nome = "";
                            }
                            else{
                                this.alertaAdicao.style.display = "flex";

                                this.alertaAdicao.querySelector(".container h5").innerHTML =( `<i class="fas fa-times-circle me-2" style="color: #dc3545;"></i>Conta ja existente`)
                        
                                setTimeout(() => {
                                    this.alertaAdicao.querySelector(".container").style.transform = "translateY(0)";
                                },200)

                                setTimeout(() => {
                                    this.alertaAdicao.querySelector(".container").style.transform = "translateY(130%)"
                                setTimeout(() => {
                                    this.alertaAdicao.style.display = "none";
                                },400)

                            },2000)
                                return
                            }

                        }catch(erro){
                            alert("Erro no servidor")
                        }
                }
                setTimeout(()=>{
                    verificarUsuarioExiste()
                },800)
                })
            }
        }
        /**Ouvinte no botao que muda para cadastro ou login  */
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
    }