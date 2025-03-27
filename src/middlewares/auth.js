import jwt from "jsonwebtoken";
import { promisify } from "util";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não existe" });
  }

  // Verifica se o token está no formato Bearer <token>
  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Token mal formatado" });
  }

  try {
    // Verifica e decodifica o token

    const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

    // Adiciona o ID do usuário ao objeto req para uso posterior
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido!" });
  }
};
