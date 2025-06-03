import { usuarios, saveUser, loadUser } from "../database/usuario.js";
import bcrypt, { compare } from "bcryptjs";
import conexao from "../database/conexao.js"

const UserRepository = {
  async getAll() {
    return loadUser();
  },

  async getById(id) {
    const sql = `select * from users where id=? limit`;
    try{
      const[rows]=await conexao.promise().query(sql,[id]);
      return rows.length>0? rows[0]:null;
    }catch(erro){
      console.error("Erron no repisitório ao consultar ID")
    }
  },

 async getByEmail(email) {
    try {
        const sql = `SELECT * FROM users WHERE email = ?`;
        const [rows] = await conexao.promise().execute(sql, [email]);
        return rows[0] || null; 
          } catch (erro) {
        console.error('Erro ao buscar usuário por email:', erro);
        throw erro; 
    }
},

async login(email) {
  try {
    const sql = 'SELECT * FROM users WHERE email = ?;';
    const [rows] = await conexao.promise().query(sql, [email]);
    return rows.length > 0 ? rows[0] : null; 
  } catch (erro) {
    console.error('Erro no login:', erro);
    return null;  
  }
}
,

async create(user){
 const sql='insert into users (nome,email,senha) values (?,?,?);'
 const list= await conexao.promise().execute(sql,
    [
        user.nome,user.email,user.senha
    ]).catch(erro=>{
        return[erro]
    })   
    return list[0]
},

  async update(email, user) {
    const users = loadUser();
    const usuario = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (usuario) {
      usuario.nome = user.nome;
      usuario.email = user.email;
      usuario.senha = user.senha;
      usuario.foto = user.foto || usuario.foto;
      saveUser(users);
    }
  },

  async deleteByEmail(email) {
    const users = loadUser();
    const index = users.findIndex(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
    if (index !== -1) {
      users.splice(index, 1);
      saveUser(users);
    }
  },

  async updateProfile(id, nome, email, senha, foto) {
    const users = loadUser();
    const usuarioIndex = users.findIndex((u) => u.id == id);
    if (usuarioIndex === -1) throw new Error("Usuário não encontrado");

    const user = users[usuarioIndex];
    if (nome) user.nome = nome;
    if (email) user.email = email;
    if (senha) user.senha = senha;
    if (foto) user.foto = foto;

    saveUser(users);
    return JSON.parse(JSON.stringify(user));
  },

  async removeProfilePhoto(userId) {
    const users = loadUser();
    const userIndex = users.findIndex((u) => u.id == userId);
    if (userIndex === -1) throw new Error("Usuário não encontrado");

    users[userIndex].foto = null;
    saveUser(users);
    return users[userIndex];
  },
};

export default UserRepository;
