import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

// As importações diretas de controllers e middlewares com dependências foram REMOVIDAS.
// Apenas middlewares sem dependências podem ser importados diretamente se necessário.

// 1. A fábrica agora recebe todas as suas dependências prontas.
export default function createRoutes(AuthController, PostController, UserRepository, authMiddleware) {
  const routes = Router();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // --- Configuração do Multer (sem alterações) ---
  const sanitizeFilename = (filename) => {
    return filename.replaceAll(/[^a-zA-Z0-9-_.]/g, '_').replaceAll(/_{2,}/g, '_');
  };
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, "../public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const userId = req.body.id || req.query.id;
      if (!userId) return cb(new Error("ID do usuário não fornecido"));
      const safeUserId = sanitizeFilename(userId.toString());
      cb(null, `profile_${safeUserId}.jpg`);
    }
  });
  const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error("Tipo de arquivo não suportado"), false);
  };
  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter
  }).single("fotoFile");

  // --- Definição das Rotas ---
  routes.get("/", (req, res) => {
    res.status(200).json({ mensagem: "Viagens Sustentáveis" });
  });
  
  // --- Rotas de Usuário ---
  routes.post("/users/login", AuthController.login);
  routes.post("/users/registrar", AuthController.createUser);
  
  // 2. Usamos os middlewares que foram injetados através do objeto 'authMiddleware'
  routes.delete("/users/deleteUser", authMiddleware.verifyToken, authMiddleware.checkOwnerOrAdmin, AuthController.deleteUser);
  routes.get("/users/get-by-id", authMiddleware.verifyToken, AuthController.getUserById);
  routes.put("/users/editUser", authMiddleware.verifyToken, authMiddleware.checkOwnerOrAdmin, AuthController.editUser);
  routes.delete("/users/removePhoto", authMiddleware.verifyToken, authMiddleware.checkOwnerOrAdmin, AuthController.removeProfilePhoto);

  routes.put(
    "/users/updateProfile",
    authMiddleware.verifyToken,
    authMiddleware.checkOwnerOrAdmin,
    (req, res, next) => { // O upload do multer precisa vir depois dos middlewares de auth que definem req.user
      upload(req, res, (err) => {
        if (err) {
          return res.status(400).json({ ok: false, message: err.message });
        }
        next();
      });
    },
    AuthController.updateProfile
  );

  // --- Rotas de Posts ---
  routes.get("/posts", PostController.getAllPosts);
  routes.post("/posts/create", authMiddleware.verifyToken, PostController.createPost);
  routes.delete("/posts/delete/:postId", authMiddleware.verifyToken, /*authMiddleware.checkPostOwnerOrAdmin,*/ PostController.deletePost);
  routes.post("/posts/response", authMiddleware.verifyToken, PostController.addResponse);
  routes.delete("/posts/response/delete", authMiddleware.verifyToken, PostController.deleteResponse); // Supondo que checkResponseOwnerOrAdmin será recriado se necessário

  return routes;
}