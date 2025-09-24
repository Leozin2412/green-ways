import fs from "fs";
import { isCompleteName, isEmail, isPassword } from "../shared/util.js";

const SALT_ROUNDS = 10;

export default function createAuthController(UserRepository, bcrypt, jwt, SECRET, TOKEN_EXPIRE) {
  // 1. Criamos a constante 'controller' primeiro, em vez de retornar o objeto diretamente.
  const controller = {
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
        const usuario = await UserRepository.login(email);

        if (!usuario) {
          return res.status(401).json({
            status: 401,
            ok: false,
            message: 'Usuário não encontrado'
          });
        }

        const validaSenha = await bcrypt.compare(senha, usuario.senha);

        if (!validaSenha) {
          return res.status(401).json({
            status: 401,
            ok: false,
            message: 'Senha inválida'
          });
        }

        const user = {
          // Corrigido para pegar o idUsers do banco, que é o nome correto da coluna
          id: usuario.idUsers, 
          nome: usuario.nome,
          acesso: usuario.permissao, // Corrigido para pegar permissao
          ativo: usuario.ativo
        };
        
        const token = jwt.sign(user, SECRET, { expiresIn: TOKEN_EXPIRE });

        return res.status(200).json({
          status: 200,
          ok: true,
          message: 'Acesso autorizado',
          token: token,
          user: user,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          status: 500,
          ok: false,
          message: 'Erro interno no servidor',
        });
      }
    },
    
    createUser: async (req, res, next) => {
      const { nome, email, senha, confirma } = req.body;
      const msgErrors = [];

      const usuarioExistente = await UserRepository.getByEmail(email);

      if (!nome || !isCompleteName(nome)) {
        msgErrors.push("Informe seu nome completo");
      }
      if (!email || !isEmail(email)) {
        msgErrors.push("E-mail inválido");
      }
      if (usuarioExistente) {
        return res.status(400).json({ ok: false, message: "E-mail já cadastrado" });
      }
      if (!senha || !isPassword(senha) || senha !== confirma) {
        msgErrors.push("A senha deve ter no mínimo 8 caracteres e as senhas devem coincidir");
      }

      if (msgErrors.length > 0) {
        return res.status(400).json({
          status: 400,
          ok: false,
          message: msgErrors.join(', '),
        });
      }

      const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
      // O acesso/permissao é definido por padrão no banco, não precisa enviar aqui
      const user = { nome, email, senha: senhaHash };
      await UserRepository.create(user);
      
      // 2. ALTERAÇÃO PRINCIPAL: Usamos 'controller.login' em vez de 'this.login'.
      return controller.login(req, res);
    },

    deleteUser: async (req, res) => {
      try {
        const { id } = req.body; 
        if (!id) {
          return res.status(400).json({ ok: false, message: "ID do usuário não fornecido" });
        }
        
        const result = await UserRepository.deleteById(id);

        if (result.affectedRows === 0) {
           return res.status(404).json({ ok: false, message: "Usuário não encontrado" });
        }

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
          return res.status(404).json({ ok: false, message: "Usuário não encontrado" });
        }

        res.json({
          ok: true,
          user: {
            // Corrigido para pegar o idUsers
            id: usuario.idUsers,
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
        const { id, nome, email, currentPassword, newPassword, confirmPassword } = req.body;
        const fotoFile = req.file;

        if (!id || !currentPassword) {
          return res.status(400).json({ ok: false, message: "ID e senha atual são obrigatórios" });
        }

        // Para comparar a senha, precisamos pegar o usuário com a senha
        const currentUserWithPass = await UserRepository.getByEmail(currentUser.email);
        if (!currentUserWithPass) {
          return res.status(404).json({ ok: false, message: "Usuário não encontrado" });
        }
        
        const senhaValida = await bcrypt.compare(currentPassword, currentUserWithPass.senha);
        if (!senhaValida) {
          return res.status(401).json({ ok: false, message: "Senha atual incorreta" });
        }

        if (newPassword && newPassword !== confirmPassword) {
          return res.status(400).json({ ok: false, message: "As novas senhas não coincidem" });
        }

        const currentUser = await UserRepository.getById(id); // Pega o usuário sem senha para os dados atuais

        const updatedData = {
            nome: nome || currentUser.nome,
            email: email || currentUser.email,
            senha: currentUserWithPass.senha, // Mantém a senha antiga por padrão
            foto: currentUser.foto,
        };

        if (fotoFile) {
            updatedData.foto = `/uploads/${fotoFile.filename}`;
        }
        if (newPassword) {
            updatedData.senha = await bcrypt.hash(newPassword, SALT_ROUNDS);
        }

        const updatedUser = await UserRepository.updateProfile(id, updatedData);
        return res.json({ ok: true, user: updatedUser });
      } catch (error) {
        if (req.file?.path) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ ok: false, message: error.message });
      }
    },
  };

  // 3. Retornamos a constante no final.
  return controller;
}