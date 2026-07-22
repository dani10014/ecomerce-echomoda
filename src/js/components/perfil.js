import {exibirAlerta} from "./alertaadicao.js";

export function editarPerfil(){
    new perfil()
}

class perfil{
    constructor(){
        this.btnMudarNome = document.querySelector("#btn-mudar-nome")
        this.espacoNome = document.querySelector("#nome-usuario")
        this.emailUsuario = document.querySelector("#email-usuario")
        this.campoNome = document.querySelector("#campo-nome")
        this.campoEmail = document.querySelector("#campo-email")
        this.campoTelefone = document.querySelector("#campo-telefone")
        this.setaVoltarHome = document.querySelector("#seta-voltar-home")
        this.cardDeAlteracaoNome = document.querySelector("#card-mudar-nome");
        this.btnFecharMenuNome = document.querySelector("#btn-fechar-menu-nome");
        this.backDropGlass = document.querySelector(".backdrop-glass")
        this.cardDeAlteracaoEmail = document.querySelector("#card-mudar-email");

        this.ouvinteMudarNome()
        this.ouvinteMudarEmail()
        this.atualizarPerfil()
        this.setaVoltar()
    }

    atualizarPerfil(){
        const usuario = JSON.parse(localStorage.getItem("Usuario")) || {}
        const nome = usuario.nome || "Nome do cliente"
        const email = usuario.email || (usuario.nome ? `${usuario.nome.toLowerCase().replace(/\s+/g, ".")}@exemplo.com` : "usuario@exemplo.com")
        const telefone = usuario.telefone || "Não informado"

        this.espacoNome.innerText = nome
        this.emailUsuario.innerText = email
        this.campoNome.innerText = nome
        this.campoEmail.innerText = email
        this.campoTelefone.innerText = telefone
    }

    ouvinteMudarNome(){
        document.addEventListener("click",async (event) =>{

            if (event.target.closest("#btn-mudar-nome")){
                const inputNome = document.querySelector("#card-mudar-nome__conteudo #input-nome");
                const idCliente = JSON.parse(localStorage.getItem("idUser"));
                
            if (inputNome) inputNome.value = ""; 

            this.cardDeAlteracaoNome.style.display = "block";
            this.backDropGlass.style.display = "flex"; 

            requestAnimationFrame(() => {
                this.cardDeAlteracaoNome.classList.add("ativo-card-atualizacao");
            });
                const btnEnviarNovoNome = document.querySelector("#btn-enviar-novo-nome");
                btnEnviarNovoNome.addEventListener("click", async () =>{
                    
                    if(!btnEnviarNovoNome){return}

                    if(inputNome.value.length === 0){
                        exibirAlerta("Nada presente nos campos","erro");
                        return
                    }else if(inputNome.value.length > 0 && inputNome.value.length <= 32){
                        try{
                            const resultado = await fetch("https://ecomerce-echomoda.onrender.com/api/alterar-nome-usuario",{
                                method:"PUT",
                                headers:{"Content-Type":"application/json"},
                                body:JSON.stringify({
                                    idclient:String(idCliente),
                                    novonome:String(inputNome.value),
                                })
                            })
                            
                            const dadosUser = await resultado.json()

                            if(resultado.status === 200){
                                localStorage.setItem("Usuario",JSON.stringify(dadosUser.Resultado));
                                this.cardDeAlteracaoNome.classList.remove("ativo-card-atualizacao");
            
                                setTimeout(() => {
                                    exibirAlerta("Nome alterado com sucesso","sucesso")
                                    this.cardDeAlteracaoNome.style.display = "none";
                                    this.backDropGlass.style.display = "none";
                                }, 200); 

                                this.atualizarPerfil();
                            }
                        }catch(erro){
                            exibirAlerta("Erro com o servidor","erro")
                        }
                    }
                })
        }

        if (event.target.matches("#btn-fechar-menu-nome")) {
        
            this.cardDeAlteracaoNome.classList.remove("ativo-card-atualizacao");
            
            setTimeout(() => {
                this.cardDeAlteracaoNome.style.display = "none";
                this.backDropGlass.style.display = "none";
            }, 200); 
        }

        })        
    }
    ouvinteMudarEmail(){
        document.addEventListener("click" ,async(event) => {
            if(event.target.closest("#mudar-email")){
                this.cardDeAlteracaoEmail.style.display = "block";
                this.backDropGlass.style.display = "flex"; 

                requestAnimationFrame(() => {
                    this.cardDeAlteracaoEmail.classList.add("ativo-card-atualizacao");
                });
            }
            if (event.target.matches("#btn-fechar-menu-email")) {
        
            this.cardDeAlteracaoEmail.classList.remove("ativo-card-atualizacao");
            
            setTimeout(() => {
                this.cardDeAlteracaoEmail.style.display = "none";
                this.backDropGlass.style.display = "none";
            }, 200); 
        }
        })
    }
    setaVoltar(){
        if (!this.setaVoltarHome) return
        this.setaVoltarHome.addEventListener("click", () => {
            window.location.href = "index.html"
        })
    }
}