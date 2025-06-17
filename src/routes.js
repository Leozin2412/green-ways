import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import AuthController from "./controllers/AuthControllers.js";
import PostController from "./controllers/PostController.js";
import UserRepository from "./repositories/UserRepository.js";
import { verifyToken, checkAdmin, checkOwnerOrAdmin, checkPostOwnerOrAdmin, checkResponseOwnerOrAdmin } from "./middlewares/authMiddleware.js";
import bcrypt from "bcrypt";

const routes = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sanitizeFilename = (filename) => {
  return filename.replace(/[^a-zA-Z0-9-_.]/g, '_').replace(/_{2,}/g, '_');
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
    if (!userId) return cb(new Error("ID do usuário não fornecido"), null);

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
}).single("foto");


routes.delete("/users/removePhoto", verifyToken, checkOwnerOrAdmin, async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ ok: false, message: "ID não fornecido" });

    const safeId = sanitizeFilename(id.toString());
    const photoPath = path.join(__dirname, `../public/uploads/profile_${safeId}.jpg`);

    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }

    const updatedUser = await UserRepository.removeProfilePhoto(id);
    res.json({ ok: true, message: "Foto removida", user: updatedUser });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Erro ao remover foto" });
  }
});

routes.post("/users/login", AuthController.login);
routes.post("/users/registrar", AuthController.createUser, AuthController.login);
routes.delete("/users/deleteUser", verifyToken, checkOwnerOrAdmin, AuthController.deleteUser);
routes.get("/users/get-by-id", verifyToken, AuthController.getUserById);

routes.post(
  "/users/updateProfile",
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        console.error("Erro no upload:", err);
        return res.status(400).json({ ok: false, message: err.message });
      }
      next();
    });
  },
  verifyToken,
  checkOwnerOrAdmin,
  AuthController.updateProfile,
);

routes.post("/users/editUser", verifyToken, checkOwnerOrAdmin, AuthController.editUser);
routes.get("/posts", PostController.getAllPosts);
routes.post("/posts/create", verifyToken, PostController.createPost);
routes.delete("/posts/delete/:postId", verifyToken, checkPostOwnerOrAdmin, PostController.deletePost);
routes.post("/posts/response", verifyToken, PostController.addResponse);
routes.delete("/posts/response/delete", verifyToken, checkResponseOwnerOrAdmin, PostController.deleteResponse);
export default routes;
