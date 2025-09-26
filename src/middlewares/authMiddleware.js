// src/middlewares/authMiddleware.js

import jwt from "jsonwebtoken";
// As importações dos repositórios foram REMOVIDAS.

const SECRET = process.env.SECRET;

// A fábrica recebe os repositórios que o middleware precisa
export default function createAuthMiddleware(UserRepository, PostRepository) {
  return {
    verifyToken: (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          ok: false,
          message: "Token de autenticação não fornecido",
        });
      }

      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
      } catch (error) {
        const isExpired = error.name === "TokenExpiredError";
        return res.status(401).json({
          ok: false,
          message: isExpired ? "Sessão expirada" : "Falha na autenticação",
        });
      }
    },

    checkAdmin: (req, res, next) => {
      if (req.user?.acesso !== "admin") {
        return res.status(403).json({
          ok: false,
          message: "Apenas administradores podem realizar essa ação",
        });
      }
      next();
    },

    checkPostOwnerOrAdmin: async (req, res, next) => {
      try {
        const { postId } = req.params;
        if (!postId) {
          return res.status(400).json({ message: "Parâmetro postId é obrigatório" });
        }

        // Usa o PostRepository que foi injetado
        const post = await PostRepository.getById(postId);
        if (!post) {
          return res.status(404).json({ message: "Post não encontrado" });
        }

        const isAdmin = req.user.acesso === "admin";
        // O schema do Prisma usa 'authorId'
        const isOwner = post.authorId == req.user.id;

        if (!isAdmin && !isOwner) {
          return res.status(403).json({ message: "Você não tem permissão para modificar este post" });
        }

        req.post = post;
        next();
      } catch (error) {
        return res.status(500).json({ message: "Erro interno ao verificar propriedade do post" });
      }
    },
    
    checkOwnerOrAdmin: async (req, res, next) => {
        try {
          const userIdFromToken = req.user?.id;
          const targetId = req.params.id || req.query.id || req.body.id;
    
          if (!targetId) {
            return res.status(400).json({ message: "ID de destino não fornecido" });
          }
    
          const isAdmin = req.user.acesso === "admin";
          const isOwner = userIdFromToken == targetId;
    
          if (!isAdmin && !isOwner) {
            return res.status(403).json({ message: "Você não tem permissão para acessar esse recurso" });
          }
    
          next();
        } catch (error) {
          return res.status(500).json({ message: "Erro interno ao verificar propriedade do usuário" });
        }
      },
    
 
  };
}