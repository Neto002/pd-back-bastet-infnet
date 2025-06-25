const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" "); // Divide o token no formato

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Armazena os dados do usuário decodificado no objeto de requisição
    next(); // Chama o próximo middleware ou rota
  } catch (error) {
    console.error("Erro ao verificar o token:", error);
    return res.status(401).json({ message: "Token inválido" });
  }
};
