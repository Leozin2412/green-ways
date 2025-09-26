// Removidas todas as importações desnecessárias, incluindo o PrismaClient.

// 1. O arquivo agora exporta uma função "fábrica" que recebe o prisma.
export default function createUserRepository(prisma) {
  // 2. Retornamos um objeto com todos os métodos do repositório.
  return {
    async create(user) {
      const newUser = await prisma.users.create({
        data: {
          nome: user.nome,
          email: user.email,
          senha: user.senha,
          // O campo 'acesso' parece ter sido renomeado para 'permissao' no schema do Prisma
          // e geralmente tem um valor padrão, então não é necessário enviá-lo aqui.
        }
      });
      return newUser;
    },

    async getByEmail(email) {
      const user = await prisma.users.findUnique({
        where: { email: email }
      });
      return user;
    },

    async getById(id) {
      const user = await prisma.users.findUnique({
        // O ID no schema do Prisma é um Int, então garantimos que seja um número.
        where: { id: parseInt(id, 10) }
      });
      return user;
    },

    async login(email) {
      const user = await prisma.users.findUnique({
        where: { email: email }
      });
      return user;
    },

    async update(currentEmail, data) {
      const user = prisma.users.update({
        where: { email: currentEmail },
        data: {
          nome: data.nome,
          email: data.email,
          senha: data.senha,
          foto: data.foto
        }
      });
      return user;
    },

    async desativarAtivar(identifier) {
      try {
        let whereClause = {};
        if (typeof identifier === 'number') {
          whereClause.id = identifier;
        } else {
          whereClause.email = identifier;
        }
        const updatedUser = await prisma.users.updateMany({
          where: whereClause,
          data: {
            ativo: 0
          }
        });
        return updatedUser;
      } catch (error) {
        console.error("Erro ao desativar usuário:", error);
        throw error;
      }
    },

    async updateProfile(id, dataToUpdate) {
      try {
        const updatedUser = await prisma.users.update({
          where: { id: parseInt(id, 10) },
          data: dataToUpdate
        });
        return updatedUser;
      } catch (error) {
        console.error("Erro no repositório ao atualizar perfil:", error);
        throw error;
      }
    },

    async removeProfilePhoto(userId) {
      try {
        const removePhoto = await prisma.users.update({
          where: { id: parseInt(userId, 10) },
          data: { foto: null }
        });
        return removePhoto;
      } catch (error) {
        console.error("Erro no repositório ao remover foto de perfil:", error);
        throw error;
      }
    },
  };
}