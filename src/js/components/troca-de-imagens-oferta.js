export function iniciarTrocaImagenOferta(){
    const menuLateral = document.querySelector(".menu-lateral");


        const secaoBackground = document.querySelector(".bloco-ofertas");
        const backdropfade = document.querySelector(".backdrop-fade-out");
        const TextoOferta = document.querySelector(".text-oferta")

        if (!secaoBackground) return;

        const imagens = [
            "../../src/imagens/background-bloco-de-ofertas.png",
            "../../src/imagens/background-bloco-de-ofertas-2.png",
            "../../src/imagens/background-bloco-de-ofertas-3.png"
        ];
        
        let indiceAtual = 0;

        function mudarSlide() {
            if(window.getComputedStyle(menuLateral).display === "block"){
                return
            }
            setTimeout(function(){
                TextoOferta.style.position = "absolute";
                backdropfade.style.filter = "opacity(1)";
            },500)
            setTimeout(function(){
                backdropfade.style.filter = "opacity(0)";
                indiceAtual = (indiceAtual + 1) % imagens.length;
                secaoBackground.style.backgroundImage = `url(${imagens[indiceAtual]})`;
            },1000)
        }
        setInterval(mudarSlide, 5000);
    }