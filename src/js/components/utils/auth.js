import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.JWT_SECRET;

export function gerarToken(usuario){
    if (!SECRET_KEY) {
        throw new Error('JWT_SECRET não configurado no ambiente');
    }
    
    const payload = {
        id: usuario.id,
        email: usuario.email,
    };
    
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
}
function extrairTokenDeCookie(cookieHeader) {
    if (!cookieHeader) return null;
    return cookieHeader.split(';').reduce((token, cookie) => {
        const [nome, valor] = cookie.trim().split('=');
        if (nome === 'token' || nome === 'AuthToken') {
            return decodeURIComponent(valor || '');
        }
        return token;
    }, null);
}

export function verificarToken(req,res,next){
    const authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        token = extrairTokenDeCookie(req.headers.cookie || '');
    }

    if (!token) {
        return res.status(401).json({ erro: 'Token não fornecido ou acesso negado.' });
    }

    jwt.verify(token, SECRET_KEY, (err, usuarioDecodificado) => {
        if (err) {
            return res.status(403).json({ erro: 'Token inválido ou expirado.' });
        }
        
        req.usuario = usuarioDecodificado; 
        next();
    });
}

const saltRounds = 10; 


export async function criarHash(senhaPura) {
    return await bcrypt.hash(senhaPura, saltRounds);
}

export async function compararSenha(senhaPura, senhaComHash) {
    return await bcrypt.compare(senhaPura, senhaComHash);
}