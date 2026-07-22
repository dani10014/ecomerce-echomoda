
export function pagamentoPedido(){
    new pagamentoDados();
}

interface dadosPix{
    qrCodeLink:string,
    copiaECola:string,
    idPagamento:string,
}
    
class pagamentoDados{
        imgQrCode:HTMLImageElement;
        metodoEscolhido:HTMLElement;
        espacoCopiaEcola:HTMLInputElement | undefined;
        textoTotal:HTMLElement;
        textoTotalCentro:HTMLElement | undefined;
        espacoIdPagamento:HTMLElement;

    constructor(){
        this.imgQrCode = document.querySelector("#qr-code-imagem") as HTMLImageElement ;
        this.metodoEscolhido = document.querySelector("#metodo-selecionado") as HTMLElement;
        this.espacoCopiaEcola = document.querySelector("#copia-e-cola-espaco") as HTMLInputElement;
        this.textoTotal = document.querySelector("#valor-total") as HTMLElement;
        this.textoTotalCentro = document.querySelector("#total-pix") as HTMLElement
        this.espacoIdPagamento = document.querySelector("#id-pagamento") as HTMLElement

        this.atualizarDadosPagamentos();
    }
    atualizarDadosPagamentos(){

        const dadosPagamento = JSON.parse(sessionStorage.getItem("dadosPix") || "{}") as dadosPix;
        const valorTotalPagamento = JSON.parse(sessionStorage.getItem("totalPix") || "0");
        const metodoPagamento = JSON.parse(sessionStorage.getItem("metodoPagamento") || "")
        

        if(!dadosPagamento){return}
        if(!valorTotalPagamento){return}
        if(!metodoPagamento){return}

        this.metodoEscolhido.textContent = metodoPagamento
        this.textoTotal.textContent = valorTotalPagamento
        this.imgQrCode.src = `data:image/png;base64,${dadosPagamento.qrCodeLink}`
        if(this.espacoIdPagamento){
            this.espacoIdPagamento.textContent = `${dadosPagamento.idPagamento}`
        } 
        if(this.textoTotalCentro){
            this.textoTotalCentro.textContent= valorTotalPagamento;
        }
        if(this.espacoCopiaEcola){
            this.espacoCopiaEcola.value = `${dadosPagamento.copiaECola}`
        }
    }
}