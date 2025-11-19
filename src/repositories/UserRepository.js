// 1. O arquivo agora exporta uma função "fábrica" que recebe o prisma.
export default function createUserRepository(prisma) {
  // 2. Retornamos um objeto com todos os métodos do repositório.
  return {
    async create(user) {
      const newUser = await prisma.User.create({
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
      const user=await prisma.User.findUnique({
        where: { email: email }
      });
      return user;
    },

    async getById(id) {
      const numericId = Number.parseInt(id, 10);
      const user = await prisma.User.findUnique({
        // O ID no schema do Prisma é um Int, então garantimos que seja um número.
        where: { id: numericId }
      });
      return user;
    },

    async login(email) {
      const user = await prisma.User.findUnique({
        where: { email: email }
      });
      console.log("Usuário encontrado:", user);
      return user;
    },

    async update(currentEmail, data) {
      const user =prisma.User.update({
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
        const updatedUser = await prisma.User.update({
          where: whereClause,
          data: {
            ativo: false
          }
        });
        return updatedUser;
      } catch (error) {
        console.error("Erro ao desativar usuário:", error);
        throw error;
      }
    },

    async updateProfile(numericId, dataToUpdate) {
      try {
        const updatedUser = await prisma.User.update({
          where: { id: numericId },
          data: dataToUpdate
        });
        return updatedUser;
      } catch (error) {
        console.error("Erro no repositório ao atualizar perfil:", error);
        throw error;
      }
    },

    async removeProfilePhoto(numericId) {
      try {
        const removePhoto = await prisma.User.update({
          where: { id: numericId },
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