  import { usuarios, saveUser, loadUser } from "../database/usuario.js";
  import bcrypt, { compare } from "bcryptjs";
  import conexao from "../database/conexao.js";
  import { PrismaClient } from '../../generated/prism/index.js';
import { create } from "domain";

  const prisma=new PrismaClient()
  const UserRepository={

async create(user){
const newUser=await prisma.users.create({
  data:{
    nome:user.nome,
    email:user.email,
    senha:user.senha,
    acesso:user.acesso  

  }
})
  return newUser   
},

async getByEmail(email){
  const user=await prisma.users.findUnique({
    where:{email:email}
  })
  return user
},
async getById(id){
  const user=await prisma.users.findUnique({
    where:{id:id}
  })
return user
  },
 async login(email) {
    const user=await prisma.users.findUnique({
      where:{email:email}
    })
    return user
  },
   
}
/*
  }





  
  const UserRepository = {
   
   



  async login(email) {
    try {
      const sql = 'SELECT * FROM users WHERE email = ?;';
      const [rows] = await conexao.query(sql, [email]);
      return rows.length > 0 ? rows[0] : null; 
    } catch (erro) {
      console.error('Erro no login:', erro);
      return null;  
    }
  }
  ,

  

  async update(currentEmail,userData){
  try{const sql=`update users set nome=?, email=?, senha=?, foto=? where email=?`
  const values=[
    userData.nome,
    userData.email,
    userData.senha,
    userData.foto,
    currentEmail
  ];
  await conexao.query(sql,values);
  console.log("Usuarios atualizados")
  }catch(error){
    console.error("Erro ao atualizar usuário:", error);
    throw new Error("Falha ao atualizar dados no banco de dados")
  }
  },
  async desatiarAtivar(identifier) {
    try {
      //me da a opção de usar ou email ou id como identificador para desativar email
      const column = typeof identifier === 'number' ? 'id' : 'email';
      const sql = `UPDATE users SET ativo = 0 WHERE ${column} = ?`;
      const [result] = await conexao.query(sql, [identifier]);

      return result.affectedRows > 0;

    } catch (error) {
      console.error("Erro ao desativar usuário:", error);
      throw error;
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



  // O método agora recebe o ID e um único objeto com os dados
  async updateProfile(id, dataToUpdate) {
    try {
      const keys = Object.keys(dataToUpdate);

      // Se o objeto de dados estiver vazio, não faz nada no banco
      if (keys.length === 0) {
        return this.getById(id);
      }
      
      const setClause = keys.map(key => `\`${key}\` = ?`).join(', ');
      const sql = `UPDATE users SET ${setClause} WHERE id = ?`;

      const values = [...Object.values(dataToUpdate), id];

      const [result] = await conexao.query(sql, values);

      if (result.affectedRows === 0) {
        return null; 
      }

      // Retorna o usuário com os dados frescos do banco
      return this.getById(id);

    } catch (error) {
      console.error("Erro no repositório ao atualizar perfil:", error);
      throw error;
    }
  },

  async removeProfilePhoto(userId) {
  
    const sql = "UPDATE users SET foto = NULL WHERE id = ?";

    try {
      
      const [result] = await conexao.query(sql, [userId]);

    
      if (result.affectedRows === 0) {
        return null;
      }

      
      return this.getById(userId);

    } catch (error) {
      
      console.error("Erro no repositório ao remover foto de perfil:", error);
      throw error;
    }
  },
  };
*/
  export default UserRepository;
