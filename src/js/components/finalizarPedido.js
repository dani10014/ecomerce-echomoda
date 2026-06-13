export function ouvinteFinalizarPedido(){
    const botaoFinalizarCompra = document.querySelector(".botao-carrinho");
    const menuFinalizacaoPagamento = document.querySelector("#container-finalizar");
    const fundoBorrado = document.querySelector(".backdrop-glass");
    const containerBotaoFinaizar = document.querySelector(".botao-finalizar-compra");

    if(botaoFinalizarCompra){
        botaoFinalizarCompra.addEventListener("click", function(){
            abrirMenuPagamento();
        })
    }

    // Máscara de CEP usando jQuery
    $("#cep").mask("00000-000");
    $("#cpf").mask("000.000.000-00");
    
    let espacoCep = document.querySelector("#cep");
    let btnBuscarCep = document.querySelector("#btn-buscar-cep");
    let espacoCidade = document.querySelector("#cidade");
    let espacoNumeroCasa = document.querySelector("#numero");
    let espacoComplemento = document.querySelector("#complemento");
    let espacoUf = document.querySelector("#uf");
    let btnProsseguir = document.querySelector("#btn-prosseguir-pagamento");
    let espacoNome = document.querySelector("#nome");
    let espacoEmail = document.querySelector("#email");
    let espacoCPF = document.querySelector("#cpf");
    
    espacoUf.readOnly = true;
    espacoCidade.readOnly = true;

    // Buscar CEP via ViaCEP
    btnBuscarCep.addEventListener("click", buscarCEP);

    // Selecionar forma de pagamento
    const formasPagamento = document.querySelectorAll(".botao-opcao-pagamento");
    formasPagamento.forEach(forma => {
        forma.addEventListener("click", function(){
            formasPagamento.forEach(botao => botao.classList.remove("botao-ativo-pagamento"));
            forma.classList.add("botao-ativo-pagamento");
        })
    })

    // Finalizar pedido e enviar para o backend
    btnProsseguir.addEventListener("click", async function(event){
        event.preventDefault();
        await finalizarPedido();
    });

    // Fechar menu
    const botaoFecharMenu = document.querySelector(".btn.btn-close");
    botaoFecharMenu.addEventListener("click", fecharMenuPagamento);

    function abrirMenuPagamento() {
        const btnProsseguir = document.querySelector("#btn-prosseguir-pagamento");
        menuFinalizacaoPagamento.style.display = "block";
        setTimeout(function(){
            menuFinalizacaoPagamento.classList.add("menu-ativo");
        }, 200);
        fundoBorrado.style.display = "flex";
        containerBotaoFinaizar.style.transform = "translateY(120%)";
        setTimeout(function(){
            containerBotaoFinaizar.style.display = "none";
        }, 200);
    }

    function fecharMenuPagamento() {
        menuFinalizacaoPagamento.classList.remove("menu-ativo");
        limparCamposFormulario();
        fundoBorrado.style.display = "none";
        containerBotaoFinaizar.style.display = "flex";
        formasPagamento.forEach(botao => botao.classList.remove("botao-ativo-pagamento"));
        setTimeout(function(){
            menuFinalizacaoPagamento.style.display = "none";
            containerBotaoFinaizar.style.transform = "translateY(0)";
        }, 200);
    }

    function limparCamposFormulario() {
        espacoNome.value = "";
        espacoEmail.value = "";
        espacoCPF.value = "";
        espacoCep.value = "";
        espacoComplemento.value = "";
        espacoCidade.value = "";
        espacoNumeroCasa.value = "";
        espacoUf.value = "";
    }

    function buscarCEP() {
        if(espacoCep.value.trim() === ""){
            mostrarErro("Digite um CEP");
            return;
        }

        const endPoint = `https://viacep.com.br/ws/${espacoCep.value.trim()}/json/`;
        
        fetch(endPoint)
            .then(resposta => {
                if(!resposta.ok) throw new Error("Erro ao buscar CEP");
                return resposta.json();
            })
            .then(resposta => {
                if(resposta.erro){
                    mostrarErro("CEP não encontrado");
                    limparCamposCEP();
                    return;
                }
                espacoCidade.value = resposta.localidade;
                espacoUf.value = resposta.uf;
            })
            .catch(erro => {
                console.error("Erro:", erro);
                mostrarErro("Erro ao buscar CEP. Tente novamente.");
                limparCamposCEP();
            });
    }

    function limparCamposCEP() {
        espacoCep.value = "";
        espacoCidade.value = "";
        espacoUf.value = "";
    }

    async function finalizarPedido() {
        const formaPagamentoSelecionada = document.querySelector(".botao-ativo-pagamento");
        
        if(!validarFormulario(formaPagamentoSelecionada)) return;

        const totalCalculado = calcularPrecoTotal();
        
        console.log(totalCalculado);

        if (totalCalculado <= 0) {
            mostrarErro("Não é possível processar um carrinho vazio ou com valor zerado.");
            return;
        }

        const dados = {
            nome: espacoNome.value.trim(),
            email: espacoEmail.value.trim(),
            cpf: espacoCPF.value.replace(/\D/g, ''), // Remove máscara
            endereco: {
                cep: espacoCep.value,
                cidade: espacoCidade.value,
                uf: espacoUf.value,
                numero: espacoNumeroCasa.value,
                complemento: espacoComplemento.value
            },
            precoTotal: calcularPrecoTotal(),
            formaPagamento: formaPagamentoSelecionada.textContent
        };

        try {
            const resposta = await fetch("http://localhost:3000/api/criar-pagamento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: dados.nome,
                    email: dados.email,
                    cpf: dados.cpf,
                    precoTotal: dados.precoTotal
                })
            });

            const resultado = await resposta.json();

            if(!resposta.ok) {
                const erros = resultado.erros || [resultado.erro];
                mostrarErro(erros.join(", "));
                return;
            }

            // Sucesso: mostrar QR code do Pix
            mostrarSucesso("Pedido criado! Escaneie o QR Code para pagar.", resultado.copiaECola);
            
            // Limpar carrinho APENAS após sucesso
            localStorage.removeItem("produtosCarrinho");
            limparCamposFormulario();
        
            setTimeout(fecharMenuPagamento, 3000);

        } catch(erro) {
            console.error("Erro ao finalizar pedido:", erro);
            mostrarErro("Erro ao processar seu pedido. Tente novamente.");
        }
    }
    function mostrarSucesso(mensagem, copiaECola) {
        alert(mensagem);
        window.prompt("Copie o código PIX abaixo para pagar:", copiaECola);
    }

    function mostrarErro(mensagem) {
        alert("⚠️ Erro: " + mensagem);
    }

    function validarFormulario(formaSelecionada) {
        if(!espacoNome.value.trim()) {
            mostrarErro("Nome é obrigatório");
            return false;
        }

        if(!espacoEmail.value.includes("@")) {
            mostrarErro("Email inválido");
            return false;
        }

        if(!espacoCep.value || !espacoCidade.value || !espacoNumeroCasa.value || !espacoComplemento.value || !formaSelecionada) {
            mostrarErro("Preencha todos os campos obrigatórios");
            return false;
        }

        return true;
    }

    function calcularPrecoTotal() {
        const produtosCarrinho = JSON.parse(localStorage.getItem("produtosCarrinho")) || []
        let precoTotal = 0;

        produtosCarrinho.forEach(produto => {
            precoTotal += parseFloat( produto.valor * produto.quantidade);
        })

        return precoTotal;
    }
} 