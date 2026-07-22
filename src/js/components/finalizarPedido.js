import { inicarRenderizacaoProdutosCarrinhos } from "./renderizarCarrinho.js";
import { exibirAlerta } from "./alertaadicao.js";

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
            exibirAlerta("Digite um CEP válido", "erro");
            return;
        }

        const endPoint = `https://viacep.com.br/ws/${this.espacoCep.value.trim()}/json/`;

        fetch(endPoint)
            .then(resposta => {
                if (!resposta.ok) exibirAlerta("Erro ao buscar CEP","erro");
                return resposta.json();
            })
            .then(resposta => {
                if (resposta.erro) {
                    exibirAlerta("CEP não encontrado","erro");
                    this.limparCep(); // CORRIGIDO: nome da função ajustado
                    return;
                }
                this.espacoCidade.value = resposta.localidade;
                this.espacoUf.value = resposta.uf;
            })
            .catch(erro => {
                console.error("Erro:", erro);
                exibirAlerta("Erro ao buscar CEP. Tente novamente.","erro");
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

    validarFormulario(formaSelecionada) {   
        if (!this.espacoNome.value.trim()) {
            exibirAlerta("Nome é obrigatório","erro");
            return false;
        }

        if (!this.espacoEmail.value.includes("@")) {
            exibirAlerta("Email inválido","erro");
            return false;
        }

        if (!this.espacoCep.value || !this.espacoCidade.value || !this.espacoNumeroCasa.value || !this.espacoComplemento.value || !formaSelecionada) {
            exibirAlerta("Preencha todos os campos obrigatórios","erro"); // CORRIGIDO: Adicionado o "this."
            return false;
        }

        return true;
    }
    async finalizarPedido() {
        const formaPagamentoSelecionada = document.querySelector(".botao-ativo-pagamento");
        const ids = JSON.parse(localStorage.getItem("produtosCarrinho"))

        if (!this.validarFormulario(formaPagamentoSelecionada)) return;

        try{
            const idsProdutos = ids.map(produto => ({
                id:(produto.id),
                quantidade:(produto.quantidade)
            }));

            const resposta = await fetch("https://ecomerce-echomoda.onrender.com/api/calcular-produtos",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    itens:idsProdutos
                })
            })  
            
            if(!resposta.ok){
                exibirAlerta("Erro ao conversar com o server","erro")
                return
            }

            const resultado = await resposta.json();
            
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

            formaPagamento: formaPagamentoSelecionada.textContent
            };

            sessionStorage.setItem("metodoPagamento",JSON.stringify(dados.formaPagamento))


            if(!resultado.sucesso){
                exibirAlerta("Erro ao calcular o preço total dos produtos","erro")
                return
            }

            sessionStorage.setItem("totalPix",JSON.stringify((resultado.total)));
            
            try {
                const resposta = await fetch("https://ecomerce-echomoda.onrender.com/api/criar-pagamento",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome: dados.nome,
                        email: dados.email,
                        cpf: dados.cpf,
                        precoTotal:Number(resultado.total),
                    })
                });

                const resultadoCriarPagamento = await resposta.json();

                if (!resultadoCriarPagamento.sucesso) {
                    const erros = resultadoCriarPagamento.erros || [resultadoCriarPagamento.erro || "Erro desconhecido"];
                    exibirAlerta(erros.join(", "), "erro");
                    return;
                }

                exibirAlerta("Pedido criado! seguindo para o pagamento", "sucesso");
                sessionStorage.setItem("dadosPix", JSON.stringify(resultadoCriarPagamento));
                localStorage.removeItem("produtosCarrinho");
                this.limparFormulario();

                setTimeout(()=>{
                    window.location.href = "pagamento.html";
                },500)
    
            // CORRIGIDO: Adicion this.mostrarErro(erros.join(", "));ado os parênteses () para chamar o método de fato
                setTimeout(() => this.fecharMenuPagamento(), 3000); 

                } catch (erro) {
                    console.error("Erro ao finalizar pedido:", erro);
                    exibirAlerta("Erro ao processar seu pedido. Tente novamente.","erro");
                }
            }catch(erro){
                console.error("Erro ao buscar produtos para pagamento:", erro);
                exibirAlerta("Erro no servidor","erro")
                return
            }
    }
}