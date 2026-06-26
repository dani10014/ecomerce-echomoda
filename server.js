import { PrismaClient } from '@prisma/client'; // Importa a biblioteca
import { MercadoPagoConfig, Payment } from "mercadopago";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto"; // 🔥 Necessário para gerar a chave de idempotência

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5500";
const allowedOrigins = [FRONTEND_URL, FRONTEND_URL.replace("localhost", "127.0.0.1")];

console.log(prisma)
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json({ limit: "1mb" }));

const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN,
    options: { timeout: 5000 }
});
const payment = new Payment(client);

function validarDadosUsuario(dados) {
    const erros = [];

    if (!dados.email || !dados.email.includes("@")) {
        erros.push("Email inválido");
    }

    if (!dados.nome || dados.nome.trim().length < 3) {
        erros.push("Nome deve ter no mínimo 3 caracteres");
    }

    if (!dados.cpf || !/^\d{11}$/.test(dados.cpf.replace(/\D/g, ""))) {
        erros.push("CPF inválido (deve ter 11 dígitos)");
    }

    if (typeof dados.precoTotal !== "number" || dados.precoTotal <= 0) {
        erros.push("Preço total inválido");
    }

    return erros;
}

function sanitizarCPF(cpf) {
    return cpf.replace(/\D/g, "");
}

app.post("/api/criar-pagamento", async (req, res) => {
    try {
        const { email, nome, cpf, precoTotal } = req.body;
        const erros = validarDadosUsuario({ email, nome, cpf, precoTotal });

        if (erros.length > 0) {
            return res.status(400).json({ sucesso: false, erros });
        }

        const cpfSanitizado = sanitizarCPF(cpf);
        const nomePartes = nome.trim().split(" ");
        const firstName = nomePartes[0];
        const lastName = nomePartes.slice(1).join(" ") || "Silva"; // Mercado Pago prefere sobrenomes reais se possível

        const body = {
            transaction_amount: Number(precoTotal),
            description: "Compra na loja EchoModa",
            payment_method_id: "pix",
            payer: {
                email: email.trim(),
                first_name: firstName,
                last_name: lastName,
                identification: {
                    type: "CPF",
                    number: cpfSanitizado
                }
            }
        };

        const requestOptions = {
            idempotencyKey: crypto.randomUUID() 
        };

        const resultado = await payment.create({ body, requestOptions });

        const transactionData = resultado.point_of_interaction?.transaction_data;
        
        if(resultado && resultado.id){
            const pedidoSalvo = await prisma.pedidos.create({
                data: {
                    id:crypto.randomUUID(),
                    mp_id:resultado.id.toString(),
                    total: Number(precoTotal),
                    status: "pendente",
                    data_pedido:new Date(),
                }
            });
            console.log("Pedido salvo com ID:", pedidoSalvo.id);
        } else {
            throw new Error("Falha ao obter ID do pagamento do Mercado Pago.");
        }

        if (!transactionData) {
            throw new Error("Dados de interação do PIX não retornados pelo Mercado Pago.");
        }

        return res.json({
            sucesso: true,
            idPagamento: resultado.id, // Útil para você salvar no banco ou consultar o status depois
            copiaECola: transactionData.qr_code,
            qrCodeLink: transactionData.ticket_url
        });

    } catch (erro) {
        console.error("Erro detalhado ao criar pagamento:", erro);
        
        // Se o erro veio da API do Mercado Pago, podemos tentar expor algo mais limpo para o front
        const mensagemErro = erro.message || "Erro ao processar pagamento";
        return res.status(500).json({ sucesso: false, erro: mensagemErro });
    }
});
app.post("/api/cadastro" , async (req,res) => {
    try{
        const {nome,email,senha} = req.body;

        if(!nome || !email || !senha){
            return res.status(400).json({ erro: "Dados incompletos" });
        }

        const usuario = await prisma.usuarios.create({
            data : {
                id:crypto.randomUUID(),
                nome:nome,
                email:email,
                senha:senha.toString(),
                created_at:new Date(),
            }
        })

        return res.status(201).json({ sucesso: true, usuario });

    }catch(erro){
        console.error("Erro:", erro);
        return res.status(500).json({ erro: "Erro ao cadastrar usuário" });
    }
})

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada" });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`CORS permitido para: ${allowedOrigins.join(", ")}`);
});