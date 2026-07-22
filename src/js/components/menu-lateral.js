export function iniciarOuvinteMenuLateral(){
    new menuLateralBase()
}
    class menuLateralBase{
        constructor(){
            this.btnMenuHamburguer = document.querySelector("#menu-hamburguer");
            this.menuLateral = document.querySelector(".menu-lateral");
            this.botaoFechar = document.querySelector("#botao-fechar");
            this.backdropFilter = document.querySelector(".backdrop-glass");
            this.nomeClienteNoTopo = document.querySelector("#menu-lateral__nome-cliente")

            this.ouvinteBotaoMenuLateral();
            this.botaoFecharMenuLateral();
            this.ouvinteFehcarMenuClicandoFora();
        }
        ouvinteBotaoMenuLateral(){
            this.btnMenuHamburguer.addEventListener("click",() => {
            this.menuLateral.style.display = "block";
        
            const nomeCliente = JSON.parse(localStorage.getItem("Usuario"));
            
            if(!nomeCliente){return}
            
            setTimeout(() => {
                this.backdropFilter.style.display = "flex";
                this.menuLateral.style.transform = "translateX(0)";
                this.menuLateral.style.backdropfilter = "blur(1px)"
            },100)

            const {nome,...restoDados} = nomeCliente

            const primeirosNomes = nome.trim().split(" ").slice(0, 2).join(" ")

            this.nomeClienteNoTopo.textContent = `${primeirosNomes}`
        })
        }
        botaoFecharMenuLateral(){
            this.botaoFechar.addEventListener("click",() => {
            this.menuLateral.style.transform = "translateX(-120%)";
            this.backdropFilter.style.display = "none";
        
            setTimeout(() => {
                this.menuLateral.style.display = "none";
            },500)
            })
        }
        ouvinteFehcarMenuClicandoFora(){
            document.addEventListener("click",(event) => {
                if(event.target === this.backdropFilter){
                    this.menuLateral.style.transform = "translateX(-120%)";
            
                setTimeout(() => {
                    this.menuLateral.style.display = "none";
                    this.backdropFilter.style.display = "none";
                },500)
                }
            })
        }

    }