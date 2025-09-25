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
   async update(currentEmail,data){
    const user= prisma.users.update({
      where:{email:currentEmail},
      data:{
        nome:data.nome,
        email:data.email,
        senha:data.senha,
        foto:data.foto
      }
    })
    return user
   },
   async desatiarAtivar(identifier){
    try{
      let whereClause={}; 
      if (typeof identifier === 'number') {
        whereClause.id = identifier;
      } else {
        whereClause.email = identifier;
      }
      const updatedUser= await prisma.users.updateMany({
        where:whereClause,
        data:{
          ativo:0
        }      
      })
      return updatedUser
    }catch (error) {
      console.error("Erro ao desativar usuário:", error);
      throw error;
    }
},
  async updateProfile(id, dataToUpdate) {
    try {
    
  
      const updatedUser= await prisma.users.update({
        where:{id:id},
        data:dataToUpdate
      })
      return updatedUser
  

    } catch (error) {
      console.error("Erro no repositório ao atualizar perfil:", error);
      throw error;
    }
  },  
 async removeProfilePhoto(userId) {
      try {
      
      const removePhoto= await prisma.users.update({
        where:{id:userId},
        data:{foto:null}
      })
      return removePhoto
  
    } catch (error) {
      
      console.error("Erro no repositório ao remover foto de perfil:", error);
      throw error;
    }
  },
  };





/*
  }





  
  const UserRepository = {
   
   

  

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
