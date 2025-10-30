import { isCompleteName, isEmail, isPassword } from "../shared/util.js";
import fs from "fs"; // Necessário para deletar a foto em caso de erro no upload

const SALT_ROUNDS = 10;

// 1. O arquivo agora exporta uma FUNÇÃO "fábrica" que recebe suas dependências
export default function createAuthController(UserRepository, bcrypt, jwt, SECRET, TOKEN_EXPIRE) {
  
  // 2. Criamos o objeto controller aqui dentro para resolver o problema do 'this'
  const controller = {
    login: async (req, res) => {
      try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ ok: false, message: "Email e senha são obrigatórios." });
        }

        const usuario = await UserRepository.login(email);
        if (!usuario) {
          return res.status(401).json({ ok: false, message: 'Usuário não encontrado' });
        }

        const validaSenha = await bcrypt.compare(senha, usuario.senha);
        if (!validaSenha) {
          return res.status(401).json({ ok: false, message: 'Senha inválida' });
        }

        // Monta o payload do token com os dados corretos do schema do Prisma
        const user = { id: usuario.id, nome: usuario.nome, acesso: usuario.acesso, ativo: usuario.ativo };
        const token = jwt.sign(user, SECRET, { expiresIn: TOKEN_EXPIRE });
        
        return res.status(200).json({ ok: true, message: 'Acesso autorizado', token, user });
      } catch (error) { 
        console.error("Erro no login:", error);
        return res.status(500).json({ ok: false, message: 'Erro interno no servidor' });
      }
    },
    
    createUser: async (req, res, next) => {
      try {
        const { nome, email, senha, confirma } = req.body;
        const msgErrors = [];

        const usuarioExistente = await UserRepository.getByEmail(email);

        if (!nome || !isCompleteName(nome)) msgErrors.push("Informe seu nome completo");
        if (usuarioExistente) return res.status(400).json({ ok: false, message: "E-mail já cadastrado" });
        if (!senha || !isPassword(senha) || senha !== confirma) msgErrors.push("As senhas não coincidem ou são inválidas");

        if (msgErrors.length > 0) {
          return res.status(400).json({ ok: false, message: msgErrors.join(', ') });
        }
        
        const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
        await UserRepository.create({ nome, email, senha: senhaHash });
        
        // Chama o método de login do próprio objeto para autenticar
        return controller.login(req, res);
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ ok: false, message: "Erro ao criar usuário." });
      }
    },

    deleteUser: async (req, res) => {
      try {
        const { id, email } = req.body;
        if (!id && !email) {
          return res.status(400).json({ ok: false, message: "É necessário enviar 'id' ou 'email' para desativar o usuário." });
        }
        const identifier = id ? parseInt(id, 10) : email;
        const result = await UserRepository.desativarAtivar(identifier);

        if (result.count === 0) {
          return res.status(404).json({ ok: false, message: "Usuário não encontrado" });
        }
        res.json({ ok: true, message: "Usuário desativado com sucesso" });
      } catch (error) {
        console.error("Erro no controller ao desativar usuário:", error);
        res.status(500).json({ ok: false, message: "Ocorreu um erro no servidor." });
      }
    },

    getUserById: async (req, res) => {
      try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ ok: false, message: "ID não fornecido" });

        const usuario = await UserRepository.getById(id);
        if (!usuario) {
          return res.status(404).json({ ok: false, message: "Usuário não encontrado" });
        }
        // Retorna os dados do usuário sem a senha
        const { senha, ...userSemSenha } = usuario;
        res.json({ ok: true, user: userSemSenha });
      } catch (error) {
        res.status(500).json({ ok: false, message: "Erro interno" });
      }
    },

    updateProfile: async (req, res) => {
      try {
        const { id, nome, currentPassword, newPassword, confirmPassword } = req.body;
        const fotoFile = req.file;
        const numericId = id.parseInt(id, 10);

        if (!numericId || !currentPassword) {
          return res.status(400).json({ ok: false, message: "ID e senha atual são obrigatórios" });
        }
        
        const currentUser = await UserRepository.getById(numericId); // Precisa pegar com a senha
        if (!currentUser) return res.status(404).json({ ok: false, message: "Usuário não encontrado" });

        const senhaValida = await bcrypt.compare(currentPassword, currentUser.senha);
        if (!senhaValida) return res.status(401).json({ ok: false, message: "Senha atual incorreta" });

        if (newPassword && newPassword !== confirmPassword) {
          return res.status(400).json({ ok: false, message: "As novas senhas não coincidem" });
        }

        const dataToUpdate = {};
        if (nome) dataToUpdate.nome = nome;
        if (fotoFile) dataToUpdate.foto = `/uploads/${fotoFile.filename}`;
        if (newPassword) {
          dataToUpdate.senha = await bcrypt.hash(newPassword, SALT_ROUNDS);
        }
        
        const updatedUser = await UserRepository.updateProfile(numericId, dataToUpdate);
        
        // Retorna o usuário atualizado sem a senha
        const { senha, ...userSemSenha } = updatedUser;
        return res.json({ ok: true, user: userSemSenha });

      } catch (error) {
        // Se deu erro, mas o upload foi feito, apaga o arquivo órfão
        if (req.file?.path) {
          fs.unlinkSync(req.file.path);
        }
        console.error("Erro ao atualizar perfil:", error);
        return res.status(500).json({ ok: false, message: error.message });
      }
    },
    
    // Adicionei esta função que estava faltando, baseada no seu routes.js
    removeProfilePhoto: async (req, res) => {
        try {
            const { id } = req.query;
            const numericId = id.parseInt(id, 10);
            if (!id) return res.status(400).json({ ok: false, message: "ID não fornecido" });
    
            const updatedUser = await UserRepository.removeProfilePhoto(numericId);
            const { senha, ...userSemSenha } = updatedUser;
            res.json({ ok: true, message: "Foto removida", user: userSemSenha });
          } catch (error) {
            res.status(500).json({ ok: false, message: "Erro ao remover foto" });
              }
            },

    editUser: async (req, res, next) => {
        // Esta função tem uma lógica muito similar a updateProfile.
        // O ideal seria usar apenas uma das duas para evitar duplicação.
        // Por enquanto, ela pode ser implementada ou removida.
        return res.status(501).json({ ok: false, message: "Rota não implementada" });
    },
  };

  // 3. A fábrica retorna o objeto controller pronto
  return controller;
}