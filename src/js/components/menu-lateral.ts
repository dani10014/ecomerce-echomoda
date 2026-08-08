export function iniciarOuvinteMenuLateral(){
    new menuLateralBase()
}
    
interface dados{
    nome:string,
    email:string,
    numero:string,
}
    class menuLateralBase{
        menuLateral:HTMLElement;
        btnMenuHamburguer:HTMLButtonElement;
        botaoFechar:HTMLButtonElement;
        backdropFilter:HTMLElement;
        nomeClienteNoTopo:HTMLElement;

        constructor(){
            this.btnMenuHamburguer = document.querySelector("#menu-hamburguer") as HTMLButtonElement;
            this.menuLateral = document.querySelector(".menu-lateral")as HTMLElement;
            this.botaoFechar = document.querySelector("#botao-fechar") as HTMLButtonElement;
            this.backdropFilter = document.querySelector(".backdrop-glass") as HTMLElement;
            this.nomeClienteNoTopo = document.querySelector("#menu-lateral__nome-cliente") as HTMLElement;

            this.ouvinteBotaoMenuLateral();
            this.botaoFecharMenuLateral();
            this.ouvinteFehcarMenuClicandoFora();
        }
        ouvinteBotaoMenuLateral(){
            this.btnMenuHamburguer.addEventListener("click",() => {
            this.menuLateral.style.display = "block";
        
            const nomeCliente = JSON.parse(localStorage.getItem("Usuario") || "{}") as dados ;
            
            if(!nomeCliente.nome){return}
            
            setTimeout(() => {
                this.backdropFilter.style.display = "flex";
                this.menuLateral.style.transform = "translateX(0)";
                this.menuLateral.style.backdropFilter = "blur(1px)"
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