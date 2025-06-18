import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.js";
import { loadUser, saveUser } from "../database/usuario.js";
import fs from "fs";
import { isCompleteName, isEmail, isPassword } from "../shared/util.js";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRE = process.env.TOKEN_EXPIRE || '1h'; 
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

      login:async(req,res)=>{
      try{
        const{email,senha}=req.body;
        ;
        const usuario=await UserRepository.login(email);

        if(!usuario){
          return res.status(401).json({
            status:401,
            ok:false,
            message:'Usuário não encontrado'
          })
        }
console.log(usuario.senha)
console.log(senha)
        const validaSenha=await bcrypt.compare(senha,usuario.senha);
console.log(validaSenha)
        if(!validaSenha){
          return res.status(401).json({
            status:401,
            ok:false,
            message:'Senha inválida'
          })
        }
        const user={
          id:usuario.id,
          nome:usuario.nome,
          acesso:usuario.acesso,
          ativo:usuario.ativo
        };
           console.log('login: ', user);

    
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: TOKEN_EXPIRE });

      return res.status(200).json({
        status: 200,
        ok: true,
        message: 'Acesso autorizado',
        token: token,
        user: user,
      });

      }catch(error){  
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
next()
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
    const { id, email } = req.body;

    
    if (!id && !email) {
      return res.status(400).json({ 
        ok: false, 
        message: "Para desativar o usuário, é necessário enviar 'id' ou 'email'." 
      });
    }

    const identifier = id ? id : email;


    const foiDesativado = await UserRepository.desatiarAtivar(identifier);

   
    if (!foiDesativado) {
      return res
        .status(404)
        .json({ ok: false, message: "Usuário não encontrado" });
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
    // A primeira parte, de validação, permanece a mesma...
    const { id, nome, email, currentPassword, newPassword, confirmPassword } = req.body;
    const fotoFile = req.file;

    if (!id) {
      return res.status(400).json({ ok: false, message: "ID não fornecido" });
    }

    const currentUser = await UserRepository.getById(id);
    if (!currentUser) {
      return res.status(404).json({ ok: false, message: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(currentPassword, currentUser.senha);
    if (!senhaValida) {
      return res.status(401).json({ ok: false, message: "Senha atual incorreta" });
    }

    if (newPassword && newPassword !== confirmPassword) {
      return res.status(400).json({ ok: false, message: "Senhas não coincidem" });
    }

    // --- A LÓGICA DE CORREÇÃO COMEÇA AQUI ---
    
    // 1. Criamos um objeto para conter apenas os dados que realmente serão atualizados.
    const dataToUpdate = {};
    
    // 2. Adicionamos cada campo ao objeto APENAS se ele for válido.
    // Isso "blinda" o back-end contra valores nulos ou a string "undefined" do front-end.
    if (nome && nome !== 'undefined') dataToUpdate.nome = nome;
    if (email && email !== 'undefined') dataToUpdate.email = email;
    
    if (newPassword) {
      const senhaHash = await bcrypt.hash(newPassword, 10); // SALT_ROUNDS = 10 (exemplo)
      dataToUpdate.senha = senhaHash;
    }

    if (fotoFile) {
      dataToUpdate.foto = `/uploads/${fotoFile.filename}`;
    }

    // 3. Chamamos o repositório com o ID e o objeto de dados limpo.
    const updatedUser = await UserRepository.updateProfile(id, dataToUpdate);
    
    if (!updatedUser) {
      return res.status(500).json({ ok: false, message: "Falha ao atualizar usuário" });
    }
    
    return res.json({ ok: true, user: updatedUser });

  } catch (error) {
    // ... seu 'catch' para apagar a foto órfã e retornar o erro 500
    if (req.file?.path) {
      // fs.unlinkSync(req.file.path); // Precisa importar o 'fs'
    }
    return res.status(500).json({ ok: false, message: error.message });
  }
},
};

export default AuthController;
