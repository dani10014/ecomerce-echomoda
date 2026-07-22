import { PrismaClient } from '@prisma/client';
import { MercadoPagoConfig, Payment } from "mercadopago";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import { Resend } from 'resend';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5500";
const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:5173", // Porta padrão do Vite (caso use)
    "http://localhost:3000",
    "https://ecomerce-echomoda.vercel.app"
];
const resend = new Resend(process.env.RESEND_API_KEY);
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Bloqueado pelo CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(express.json({ limit: "1mb" }));

const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN,
    options: { timeout: 5000 }
});
const payment = new Payment(client);

BigInt.prototype.toJSON = function() {
    return this.toString();
};

console.log(prisma);

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

app.post("/api/calcular-produtos", async (req,res) =>{
    try{
        const {itens} = req.body;

        if(!itens){
            res.status(400).json({mensagem:"Dados invalidos"});
            return
        }

        const id = itens.map((item => Number(item.id)));
        
        const resultado = await prisma.produtos.findMany({
            where:{
                id:{in:id}
            }
        })

        let valorTotal = 0;

        itens.forEach(item => {
            const produtoBanco = resultado.find(produto => Number(produto.id) === Number(item.id));

            valorTotal += produtoBanco.preco * item.quantidade;

        })
            return res.status(200).json({sucesso:true,total:valorTotal})

    }catch(erro){
        console.error("Erro ao buscar produtos para pagamento:", erro);
        return res.status(500).json({ sucesso: false, erro: "Erro ao buscar produtos para pagamento" });
    }
})
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
        const lastName = nomePartes.slice(1).join(" ") || "Silva";

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
            idPagamento: resultado.id,
            copiaECola: transactionData.qr_code,
            qrCodeLink: transactionData.qr_code_base64
        });

    } catch (erro) {
        console.error("Erro detalhado ao criar pagamento:", erro);
        
        const mensagemErro ="Erro ao processar pagamento";
        return res.status(500).json({ sucesso: false, erro: mensagemErro });
    }
});
app.post("/api/verificar-cadastro" , async (req,res) => {
    try{
        const {nome,email,senha} = req.body;

        if(!nome || !email || !senha){
            return res.status(400).json({ erro: "Dados incompletos" });
        }
        
        const usuario = await prisma.usuarios.findUnique({
            where: {
                email:email.trim()
            }
        })
        if(usuario){
            return res.status(200).json({mensagem:"usuario existe no banco",usuario})
            
        }else{
            return res.status(409).json({mensagem:"Usuario não existe no banco"})
        }

    }catch(erro){
        console.error("Erro:", erro);
        return res.status(500).json({ erro: "Erro ao conectar no servidor" });
    }
})
app.post("/api/logar",async (req,res) => {
    try{
        const {email,senha} = req.body
        
        if(!email || !senha){
            res.status(400).json({mensagem:"Dados invalidos"})
            return
        }
        if(senha.trim().length !== 8){
            return res.status(400).json({erro:"Tamanho de senha incorreta"});
        }
        const resultado = await prisma.usuarios.findUnique({
            where:{
                email:email.trim(),
            }
        });

        if (!resultado || resultado.senha !== senha) {
            return res.status(401).json({ sucesso: false, erro: "E-mail ou senha inválidos" });
        }
        if(resultado && senha === resultado.senha){
            const { senha: _, ...usuarioSemSenha } = resultado;
            return res.status(200).json({ sucesso: true, usuario: usuarioSemSenha });
        }

    }catch(erro){
        console.error("Erro no login:", erro);
        return res.status(500).json({ sucesso: false, erro: "Erro interno no servidor" });
    }
})
function gerarCodigoVerificacao() {
    return crypto.randomInt(100000, 999999).toString();
}
const codigosTemporarios = new Map();

async function enviarEmailVerificacao(destinatario, codigo) {
    return await resend.emails.send({
        from: 'onboarding@resend.dev', 
        to: destinatario,
        subject: 'Seu código de verificação EchoModa',
        html: `<p>Olá! Seu código de verificação é: <strong>${codigo}</strong>. Ele expira em 5 minutos.</p>`
    });
}

app.post("/api/enviar-codigo", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ erro: "E-mail necessário" });

        const codigo = gerarCodigoVerificacao();
        const expiraEm = Date.now() + (5 * 60 * 1000);
        codigosTemporarios.set(email, { codigo, expiraEm });
        
        await enviarEmailVerificacao(email, codigo);
        
        return res.status(200).json({ mensagem: "Código enviado!" });
    } catch (erro) {
        console.error("ERRO DETALHADO NO SMTP:", erro);
        return res.status(500).json({ erro: "Falha ao enviar e-mail: "});
    }
});

app.post("/api/verificar-codigo", (req, res) => {
    const { email, codigo } = req.body;
    const registro = codigosTemporarios.get(email);

    if (!registro) {
        return res.status(400).json({ mensagem: "Solicite um código primeiro." });
    }

    if (Date.now() > registro.expiraEm) {
        codigosTemporarios.delete(email);
        return res.status(400).json({ mensagem: "Código expirado." });
    }

    if (codigo === registro.codigo) {
        codigosTemporarios.delete(email);
        return res.status(200).json({ mensagem: "Código verificado com sucesso!" });
    } else {
        return res.status(400).json({ mensagem: "Código incorreto." });
    }
});
app.post("/api/criar-cadastro",async (req,res) =>{
    try{
        const {nome,email,senha} = req.body

        if (!nome || typeof nome !== 'string' || nome.trim().length < 3) {
            return res.status(400).json({ erro: "O nome deve ter pelo menos 3 caracteres e ser válido." });
        }
        
        if (/\d/.test(nome)) {
            return res.status(400).json({ erro: "O nome não pode conter números." });
        }

        const senhaEhNumero = /^\d+$/.test(String(senha)); 

        if (!senhaEhNumero) {
            return res.status(400).json({ sucesso: false, erro: "A senha deve conter apenas números." });
        }
        
        if(nome.trim().length > 32){
            return res.status(400).json({erro:"Nome muito extenso"});
        }

        if(senha.length !== 8){
            return res.status(400).json({erro:"Tamanho de senha incorreta"})
        }
            const novoUsuario = await prisma.usuarios.create({
            data:{
                nome:nome,
                email:email,
                senha:senha
            }
        })

        return res.status(201).json({ mensagem: "Sucesso", novo: novoUsuario})

    }catch(erro){
        console.error(erro)
        return res.status(500).json({ erro: "Erro no servidor" });
    }
})
app.get("/api/buscar-produtos", async (req, res) => {
    try{
        const resultado = await prisma.produtos.findMany();

        return res.status(200).json(resultado);
    }
    catch(erro){
        console.error("ERRO EXATO NO FINDMANY:", erro);
        return res.status(500).json({ erro: "Erro ao buscar produtos"});
    }
})
app.post("/api/salvar-favoritos", async (req, res) => {
    try {
        const { idclient, idproduto } = req.body;

        if (!idclient || idproduto == null) {
            return res.status(400).json({ resultado: "Dados de favorito inválidos" });
        }

        if (!prisma.favoritos) {
            return res.status(500).json({ resultado: "Erro interno do servidor"});
        }

        const resultado = await prisma.favoritos.create({
            data: {
                id_client: String(idclient),
                id_produto: BigInt(idproduto)
            }
        });

        return res.status(200).json({ resultado: "Sucesso", dados: resultado });

    } catch (erro) {
        console.error("Erro ao salvar favorito:", erro);
        return res.status(500).json({ resultado: "Erro ao conectar no servidor"});
    }
});
app.delete("/api/remover-favoritos", async (req,res) =>{
    try{
        const {idclient,idproduto} = req.body
        
        if(!idclient || !idproduto){
            return res.status(400).json({mensagem:"Erro no servidor"})
        }
        const resultado = await prisma.favoritos.delete({
            where:{
                id_client_id_produto:{
                    id_client:idclient,
                    id_produto:BigInt(idproduto),
                }
            }
        })
        return res.status(200).json({mensagem:"Sucesso ao remover produto",produto:resultado})
        
    }catch(erro){
        console.error(erro)
        return res.status(500).json({mensagem:"Erro ao conversar com o servidor"})
    }
})
app.get("/api/buscar-favoritos", async (req,res) =>{
    try{
        const {idclient} = req.query
        
        if(!idclient){
            return res.status(400).json({mensagem:"Sem id do cliente"})
        }
        const resultado = await prisma.favoritos.findMany({
            where:{
                id_client:String(idclient),
            }
        })

        return res.status(200).json(resultado)

    }catch(erro){
        return res.status(500).json({mensagem:"Erro no servidor"})
    }
})
app.put("/api/alterar-nome-usuario", async (req,res) =>{
    try{
        const{idclient,novonome} = req.body

        if(!idclient || !novonome){
            return res.status(400).json("Nenhum id e nenhum nome recebido");
        }

        if(novonome.length > 32 || novonome.length < 3){
            return res.status(400).json("O nome deve ter entre 3 e 32 caracteres.");
        }

        if(/\d/.test(novonome)){
            return res.status(400).json({erro:"Nome não pode conter numeros"})
        }

        const resposta = await prisma.usuarios.update({
            where:{id:idclient},
            data:{
                nome:novonome
            }
        })

            return res.status(200).json({Mensagem:"Nome atualizado",Resultado:resposta})

    }catch(erro){
        console.error(erro.message)
        return res.status(500).json("Erro no servidor")
    }
})
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada" });
});

app.listen( PORT, ()=> {
    console.log(`CORS permitido para: ${allowedOrigins.join(", ")}`);
});
