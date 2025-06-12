import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.js";
import PostRepository from "../repositories/postRepository.js";

const SECRET = process.env.SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      ok: false,
      message: "Token de autenticação não fornecido",
      code: "AUTH_REQUIRED",
      redirectToLogin: true
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
      code: isExpired ? "SESSION_EXPIRED" : "AUTH_FAILED",
      redirectToLogin: true
    });
  }
};

export const checkAdmin = (req, res, next) => {
  if (req.user?.acesso !== "admin") {
    return res.status(403).json({
      ok: false,
      message: "Apenas administradores podem realizar essa ação",
      code: "UNAUTHORIZED_ACCESS"
    });
  }
  next();
};

export const checkPostOwnerOrAdmin = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({
        ok: false,
        message: "Parâmetro postId é obrigatório",
        code: "MISSING_POST_ID"
      });
    }

    const post = await PostRepository.getPostById(postId);

    if (!post) {
      return res.status(404).json({
        ok: false,
        message: "Post não encontrado",
        code: "POST_NOT_FOUND"
      });
    }

    const isAdmin = req.user.acesso === "admin";
    const isOwner = post.userId == req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        ok: false,
        message: "Você não tem permissão para modificar este post",
        code: "UNAUTHORIZED_ACCESS"
      });
    }

    req.post = post;
    next();
  } catch (error) {
    console.error("Erro em checkPostOwnerOrAdmin:", error);
    return res.status(500).json({
      ok: false,
      message: "Erro interno ao verificar propriedade do post",
      code: "PERMISSION_CHECK_ERROR"
    });
  }
};

export const checkResponseOwnerOrAdmin = async (req, res, next) => {
  try {
    const { postId, responseId } = req.body;

    if (!postId || !responseId) {
      return res.status(400).json({
        ok: false,
        message: "postId e responseId são obrigatórios",
        code: "MISSING_IDS"
      });
    }

    const post = await PostRepository.getPostById(postId);

    if (!post) {
      return res.status(404).json({
        ok: false,
        message: "Post não encontrado",
        code: "POST_NOT_FOUND"
      });
    }

    const response = post.responses?.find((r) => r.idResponse == responseId);
    if (!response) {
      return res.status(404).json({
        ok: false,
        message: "Resposta não encontrada",
        code: "RESPONSE_NOT_FOUND"
      });
    }

    const isAdmin = req.user.acesso === "admin";
    const isOwner = response.userId === req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        ok: false,
        message: "Você não tem permissão para modificar essa resposta",
        code: "UNAUTHORIZED_ACCESS"
      });
    }

    req.post = post;
    req.response = response;
    next();
  } catch (error) {
    console.error("Erro em checkResponseOwnerOrAdmin:", error);
    return res.status(500).json({
      ok: false,
      message: "Erro interno ao verificar propriedade da resposta",
      code: "PERMISSION_CHECK_ERROR"
    });
  }
};

export const checkOwnerOrAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const targetId = req.params.id || req.query.id || req.body.id;
    if (!targetId) {
      return res.status(400).json({
        ok: false,
        message: "ID de destino não fornecido",
        code: "MISSING_USER_ID"
      });
    }

    const user = await UserRepository.getById(targetId);
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuário não encontrado",
        code: "USER_NOT_FOUND"
      });
    }

    const isAdmin = req.user.acesso === "admin";
    const isOwner = userId === user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        ok: false,
        message: "Você não tem permissão para acessar esse recurso",
        code: "UNAUTHORIZED_ACCESS"
      });
    }

    req.targetUser = user;
    next();
  } catch (error) {
    console.error("Erro em checkOwnerOrAdmin:", error);
    return res.status(500).json({
      ok: false,
      message: "Erro interno ao verificar propriedade do usuário",
      code: "PERMISSION_CHECK_ERROR"
    });
  }
};