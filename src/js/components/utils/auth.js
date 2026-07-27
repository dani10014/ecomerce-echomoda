import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.JWT_SECRET;

export function gerarToken(usuario){
    const payload = {
        id:usuario.id,
        email:usuario.email,

    }
    return jwt.sign(payload,SECRET_KEY,{expiresIn:"7d"})
}
export function verificarToken(req,res,next){
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

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