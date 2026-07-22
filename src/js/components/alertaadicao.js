export function exibirAlerta(mensagem,tipo){
            const alertaAdicao = document.querySelector(".confirmacao-adicao-carrinho");

            const icon = tipo === 'sucesso' ? "fa-check-circle" : "fa-times-circle";
            const cor = tipo === 'sucesso' ? "#28a745" : "#dc3545";

            alertaAdicao.querySelector(".container h5").innerHTML = 
                `<i class="fas ${icon} me-2" style="color: ${cor};"></i>${mensagem}`;
    
            alertaAdicao.style.display = "flex";
                setTimeout(() => alertaAdicao.querySelector(".container").style.transform = "translateY(0)", 200);
    
                setTimeout(() => {
                    alertaAdicao.querySelector(".container").style.transform = "translateY(130%)";
                    setTimeout(() => alertaAdicao.style.display = "none", 400);
                }, 2000);
        }