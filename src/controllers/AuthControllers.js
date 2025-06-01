import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.js";
import { loadUser, saveUser } from "../database/usuario.js";
import fs from "fs";
import { isCompleteName, isEmail, isPassword } from "../shared/util.js";

const SECRET = process.env.SECRET;
const TOKEN_EXPIRE = eval(process.env.TOKEN_EXPIRE);
const SALT_ROUNDS = 10;

const AuthController = {
  verifyCurrentPassword: async (userId, currentPassword) => {
    const currentUser = await UserRepository.getById(userId);
    if (!currentUser) throw new Error("Usuário não encontrado");
    const senhaValida = await bcrypt.compare(
      currentPassword,
      currentUser.senha
    );
    if (!senhaValida) throw new Error("Senha atual incorreta");
    return true;
  },

  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const usuario = await UserRepository.getUser(email, senha);
      if (!usuario) {
        return res
          .status(401)
          .json({ ok: false, message: "Credenciais inválidas" });
      }

      const user = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        acesso: usuario.acesso,
        foto: usuario.foto,
      };

      const token = jwt.sign(user, SECRET, { expiresIn: TOKEN_EXPIRE });
      return res.status(200).json({ ok: true, token, user });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  createUser: async (req, res, next) => {
const { nome, email, senha, confirma } = req.body;
    const msgErrors = [];

    console.log(nome, email, senha, confirma);
    const usuarioExistente = await UserRepository.getByEmail(email)
    //validar informações (nome, email e senha, confirma)
    if (!nome) {
      msgErrors.push("O Nome é obrigatório");
    } else {
      if (!isCompleteName(nome)) {
        msgErrors.push("Informe seu nome completo");
      }
    }
    if (!email) {
      msgErrors.push("O E-mail é obrigatório");
    } else {
      if (!isEmail(email)) {
        msgErrors.push("E-mail inválido");
      }
    }
        if (usuarioExistente) {
        return res
          .status(400)
          .json({ ok: false, message: "E-mail já cadastrado" });
      }
    if (!senha) {
      msgErrors.push("A Senha é obrigatória");
    } else {
      if (!isPassword(senha)) {
        msgErrors.push("A senha deve ter no mínimo 8 caracteres");
      } else {
        if (senha !== confirma) {
          msgErrors.push("A Senha e a Confirmação não conferem");
        }
      }
    }
    //criando novo usuario de acesso comum "user"
    if (msgErrors.length > 0) {
      //retornando mensagem de erro (necessário usar o return para parar a execução)
      return res.status(400).json({
        status: 400,
        ok: false,
        message: msgErrors,
      });
    } ;

const senhaHash= await bcrypt.hash(senha,SALT_ROUNDS)
const user={nome:nome,email:email,senha:senhaHash,acesso:"user"};
const resp=await UserRepository.create(user);
console.log(resp);
  },

  editUser: async (req, res, next) => {
    try {
      const { nome, email, senha, confirma, foto, currentEmail } = req.body;
      if (senha !== confirma) {
        return res
          .status(400)
          .json({ ok: false, message: "Senhas não conferem" });
      }

      const usuarioExistente = await UserRepository.getByEmail(currentEmail);
      if (!usuarioExistente) {
        return res
          .status(400)
          .json({ ok: false, message: "Usuário não encontrado" });
      }

      const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
      await UserRepository.update(currentEmail, {
        nome,
        email,
        senha: senhaHash,
        foto,
      });
      next();
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { email, id } = req.body;
      const usuarios = loadUser();
      const index = usuarios.findIndex(
        (u) => (email && u.email === email) || (id && u.id == id)
      );

      if (index === -1) {
        return res
          .status(404)
          .json({ ok: false, message: "Usuário não encontrado" });
      }

      usuarios.splice(index, 1);
      saveUser(usuarios);
      res.json({ ok: true, message: "Usuário deletado" });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.query;
      const usuario = await UserRepository.getById(id);
      if (!usuario) {
        return res
          .status(404)
          .json({ ok: false, message: "Usuário não encontrado" });
      }

      res.json({
        ok: true,
        user: {
          id: usuario.id,
          nome: usuario.nome,
          foto: usuario.foto || null,
        },
      });
    } catch (error) {
      res.status(500).json({ ok: false, message: "Erro interno" });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { id, nome, email, currentPassword, newPassword, confirmPassword } =
        req.body;
      const fotoFile = req.file;

      if (!id) {
        return res.status(400).json({ ok: false, message: "ID não fornecido" });
      }

      const currentUser = await UserRepository.getById(id);
      if (!currentUser) {
        return res
          .status(404)
          .json({ ok: false, message: "Usuário não encontrado" });
      }

      const senhaValida = await bcrypt.compare(
        currentPassword,
        currentUser.senha
      );
      if (!senhaValida) {
        return res
          .status(401)
          .json({ ok: false, message: "Senha atual incorreta" });
      }

      if (newPassword && newPassword !== confirmPassword) {
        return res
          .status(400)
          .json({ ok: false, message: "Senhas não coincidem" });
      }

      let fotoPath = currentUser.foto;
      if (fotoFile) {
        fotoPath = `/uploads/${fotoFile.filename}`;
      }

      let senhaHash = currentUser.senha;
      if (newPassword) {
        senhaHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
      }

      const updatedUser = await UserRepository.updateProfile(
        id,
        nome || currentUser.nome,
        email || currentUser.email,
        senhaHash,
        fotoPath
      );
      if (!updatedUser) {
        return res.status(500).json({ ok: false, message: "Falha ao atualizar usuário" });
      }
      return res.json({ ok: true, user: updatedUser });
    } catch (error) {
      if (req.file?.path) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({ ok: false, message: error.message });
    }
  },
};

export default AuthController;
