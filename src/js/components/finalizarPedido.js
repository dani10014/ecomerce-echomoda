export function ouvinteFinalizarPedido() {
    
    // Instancia (ativa) a classe para os ouvintes começarem a escutar a tela
    new ProcessarPagamento();
}

class ProcessarPagamento {
    constructor() {
        this.botaoFinalizarCompra = document.querySelector(".botao-carrinho");
        this.menuFinalizacaoPagamento = document.querySelector("#container-finalizar");
        this.fundoBorrado = document.querySelector(".backdrop-glass");
        this.containerBotaoFinalizar = document.querySelector(".botao-finalizar-compra");

        this.espacoCep = document.querySelector("#cep");
        this.btnBuscarCep = document.querySelector("#btn-buscar-cep");
        this.espacoCidade = document.querySelector("#cidade");
        this.espacoNumeroCasa = document.querySelector("#numero");
        this.espacoComplemento = document.querySelector("#complemento");
        this.espacoUf = document.querySelector("#uf");
        this.btnProsseguir = document.querySelector("#btn-prosseguir-pagamento");
        this.espacoNome = document.querySelector("#nome");
        this.espacoEmail = document.querySelector("#email");
        this.espacoCPF = document.querySelector("#cpf");
        this.formasPagamento = document.querySelectorAll(".botao-opcao-pagamento");
        this.botaoFecharMenu = document.querySelector(".btn.btn-close");

        // Liga as configurações e os eventos assim que a classe nasce
        this.inicializarConfiguracoes();
        this.registrarEventos();
    }

    inicializarConfiguracoes() {
        $("#cep").mask("00000-000");
        $("#cpf").mask("000.000.000-00");
        if (this.espacoUf && this.espacoCidade) {
            this.espacoUf.readOnly = true;
            this.espacoCidade.readOnly = true;
        }
    }

    registrarEventos() {
        this.selecaoPagamento();
        this.abrirMenuPagamento();
    
        if (this.botaoFecharMenu) {
            this.botaoFecharMenu.addEventListener("click", () => this.fecharMenuPagamento());
        }
        if (this.btnBuscarCep) {
            this.btnBuscarCep.addEventListener("click", () => this.buscarCep());
        }
        if (this.btnProsseguir) {
            this.btnProsseguir.addEventListener("click", async (event) => {
                event.preventDefault();
                await this.finalizarPedido();
            });
        }
    }

    selecaoPagamento() {
        this.formasPagamento.forEach(forma => {
            forma.addEventListener("click", () => {
                this.formasPagamento.forEach(botao => botao.classList.remove("botao-ativo-pagamento"));
                forma.classList.add("botao-ativo-pagamento");
            });
        });
    }

    fecharMenuPagamento() {
        this.menuFinalizacaoPagamento.classList.remove("menu-ativo");
        this.limparFormulario();

        this.fundoBorrado.style.display = "none";
        this.containerBotaoFinalizar.style.display = "flex";

        this.formasPagamento.forEach(botao => botao.classList.remove("botao-ativo-pagamento"));

        setTimeout(() => {
            this.menuFinalizacaoPagamento.style.display = "none";
            this.containerBotaoFinalizar.style.transform = "translateY(0)";
        }, 200);
    }

    abrirMenuPagamento() {
        if (this.botaoFinalizarCompra) {
            this.botaoFinalizarCompra.addEventListener("click", () => {
                this.menuFinalizacaoPagamento.style.display = "block";

                setTimeout(() => {
                    this.menuFinalizacaoPagamento.classList.add("menu-ativo");
                }, 200);

                this.fundoBorrado.style.display = "flex";
                this.containerBotaoFinalizar.style.transform = "translateY(120%)";

                setTimeout(() => {
                    this.containerBotaoFinalizar.style.display = "none";
                }, 200);
            });
        }
    }

    limparFormulario() {
        this.espacoNome.value = "";
        this.espacoEmail.value = "";
        this.espacoCPF.value = "";
        this.espacoCep.value = "";
        this.espacoComplemento.value = "";
        this.espacoCidade.value = "";
        this.espacoNumeroCasa.value = "";
        this.espacoUf.value = "";
    }

    buscarCep() {
        if (this.espacoCep.value.trim() === "") {
            this.mostrarErro("Digite um CEP");
            return;
        }

        const endPoint = `https://viacep.com.br/ws/${this.espacoCep.value.trim()}/json/`;

        fetch(endPoint)
            .then(resposta => {
                if (!resposta.ok) throw new Error("Erro ao buscar CEP");
                return resposta.json();
            })
            .then(resposta => {
                if (resposta.erro) {
                    this.mostrarErro("CEP não encontrado");
                    this.limparCep(); // CORRIGIDO: nome da função ajustado
                    return;
                }
                this.espacoCidade.value = resposta.localidade;
                this.espacoUf.value = resposta.uf;
            })
            .catch(erro => {
                console.error("Erro:", erro);
                this.mostrarErro("Erro ao buscar CEP. Tente novamente.");
                this.limparCep(); // CORRIGIDO: nome da função ajustado
            });
    }

    limparCep() {
        this.espacoCep.value = "";
        this.espacoCidade.value = "";
        this.espacoUf.value = "";
    }

    mostrarSucesso(mensagem, copiaECola) {
        alert(mensagem);
        window.prompt("Copie o código PIX abaixo para pagar:", copiaECola);
    }

    mostrarErro(mensagem) {
        alert("⚠️ Erro: " + mensagem);
    }

    validarFormulario(formaSelecionada) {   
        if (!this.espacoNome.value.trim()) {
            this.mostrarErro("Nome é obrigatório");
            return false;
        }

        if (!this.espacoEmail.value.includes("@")) {
            this.mostrarErro("Email inválido");
            return false;
        }

        if (!this.espacoCep.value || !this.espacoCidade.value || !this.espacoNumeroCasa.value || !this.espacoComplemento.value || !formaSelecionada) {
            this.mostrarErro("Preencha todos os campos obrigatórios"); // CORRIGIDO: Adicionado o "this."
            return false;
        }

        return true;
    }

    calcularPrecoTotal() {
        const produtosCarrinho = JSON.parse(localStorage.getItem("produtosCarrinho")) || [];
        let precoTotal = 0;

        produtosCarrinho.forEach(produto => {
            precoTotal += parseFloat(produto.valor * produto.quantidade);
        });

        return precoTotal;
    }

    async finalizarPedido() {
        const formaPagamentoSelecionada = document.querySelector(".botao-ativo-pagamento");

        if (!this.validarFormulario(formaPagamentoSelecionada)) return;

        const totalCalculado = this.calcularPrecoTotal();

        console.log(totalCalculado);

        if (totalCalculado <= 0) {
            this.mostrarErro("Não é possível processar um carrinho vazio ou com valor zerado.");
            return;
        }

        const dados = {
            nome: this.espacoNome.value.trim(),
            email: this.espacoEmail.value.trim(),
            cpf: this.espacoCPF.value.replace(/\D/g, ''), 
            endereco: {
                cep: this.espacoCep.value,
                cidade: this.espacoCidade.value,
                uf: this.espacoUf.value,
                numero: this.espacoNumeroCasa.value,
                complemento: this.espacoComplemento.value
            },
            precoTotal: totalCalculado,
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

            if (!resposta.ok) {
                const erros = resultado.erros || [resultado.erro];
                this.mostrarErro(erros.join(", "));
                return;
            }

            this.mostrarSucesso("Pedido criado! Escaneie o QR Code para pagar.", resultado.copiaECola);

            localStorage.removeItem("produtosCarrinho");
            this.limparFormulario();

            // CORRIGIDO: Adicionado os parênteses () para chamar o método de fato
            setTimeout(() => this.fecharMenuPagamento(), 3000); 

        } catch (erro) {
            console.error("Erro ao finalizar pedido:", erro);
            this.mostrarErro("Erro ao processar seu pedido. Tente novamente.");
        }
    }
}