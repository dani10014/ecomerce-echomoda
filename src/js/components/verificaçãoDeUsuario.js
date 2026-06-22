import {verificarUsuarioExiste} from "../main.js";

export function verificarUsuario(){
    new userVerific()
}
    class userVerific{
        constructor(){
            this.btnEntrar = document.querySelector("#btn-entrar");
            this.btnLinkCadastrar = document.querySelector("#btn-link-cadastrar");
            this.formularioLogin = document.querySelector(".formulario-entrar");
            this.formularioCadastro = document.querySelector(".formulario-cadastrar");
            this.textoLogin = document.querySelector(".texto-logar");
            this.textoJaPossuiCadastro = document.querySelector("#texto-ja-possui-login");
            this.btnCadastrar = document.querySelector("#btn-cadastrar");

            this.ouvinteBotaoEntrar();
            this.ouvinteMudançaDeBotaoCadastrar();
            this.ouvinteBotaoCadastrar();
        }
        /** Ouvinte no botao de logar para verificar os campos e verificar com o servidor*/
        ouvinteBotaoEntrar(){
            if(this.btnCadastrar){
            this.btnEntrar.addEventListener("click",(event) => {
                event.preventDefault()
                    let nome = document.querySelector("#nome").value.trim()
                    let email = document.querySelector("#email").value.trim()
                    let senha = document.querySelector("#senha").value.trim()

                if(nome === "" || email === "" || senha === ""){
                    alert("Por favor Preencha todos os campos")
                    return
                }else{
                    let dadosUser ={
                        nome:nome,
                        email:email,
                        senha:senha
                    }
                }
                verificarUsuarioExiste()
            })
        }
        }
        /**Ouvinte no botao que envia os dados para o servidor e cadastrar*/
        ouvinteBotaoCadastrar(){
            if(this.btnCadastrar){
                this.btnCadastrar.addEventListener("click",(event) => {
                    event.preventDefault()
                    let nome = document.querySelector("#nome-cadastro").value.trim();
                    let email = document.querySelector("#email-cadastro").value.trim();
                    let senha = document.querySelector("#senha-cadastro").value

                    if(nome === "" || email === "" || senha === ""){
                        alert("Por favor Preencha todos os campos")
                        return
                    }else{
                        let dadosUser ={
                            nome:nome,
                            email:email,
                            senha:senha
                        }
                    localStorage.setItem("Usuario",JSON.stringify(dadosUser))
                }
                verificarUsuarioExiste()
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