// Removemos todas as importações que não são mais necessárias (bcrypt, usuario.js)
// A importação do 'conexao' também foi removida, pois será injetada.

// A fábrica recebe o módulo do banco 'db' como dependência.
export default function createUserRepository(db) {
  return {
    // FUNÇÃO REESCRITA PARA USAR SQL
    async getAll() {
      const conexao = db.getConexao();
      // Boa prática: nunca retorne a senha dos usuários em uma listagem.
      const sql = 'SELECT idUsers, nome, email, foto, permissao, ativo FROM users;';
      try {
        const [rows] = await conexao.promise().query(sql);
        return rows;
      } catch (error) {
        console.error("Erro no repositório ao buscar todos os usuários:", error);
        throw error;
      }
    },

    async getById(id) {
      const conexao = db.getConexao();
      // Seleciona todos os campos, exceto a senha
      const sql = 'SELECT idUsers, nome, email, foto, permissao, ativo FROM users WHERE idUsers = ? LIMIT 1;';
      try {
        const [rows] = await conexao.promise().query(sql, [id]);
        return rows.length > 0 ? rows[0] : null;
      } catch (error) {
        console.error("Erro no repositório ao consultar por ID:", error);
        throw error;
      }
    },

    async getByEmail(email) {
      const conexao = db.getConexao();
      // Seleciona todos os campos, incluindo a senha, pois pode ser usado para verificação interna.
      const sql = 'SELECT * FROM users WHERE email = ?;';
      try {
        const [rows] = await conexao.promise().execute(sql, [email]);
        return rows[0] || null;
      } catch (error) {
        console.error('Erro ao buscar usuário por email:', error);
        throw error;
      }
    },

    async login(email) {
      const conexao = db.getConexao();
      // A função de login precisa da senha para comparar, então selecionamos tudo.
      const sql = 'SELECT * FROM users WHERE email = ?;';
      try {
        const [rows] = await conexao.promise().query(sql, [email]);
        return rows.length > 0 ? rows[0] : null;
      } catch (error) {
        console.error('Erro no login (repositório):', error);
        throw error;
      }
    },

    async create(user) {
      const conexao = db.getConexao();
      const sql = 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?);';
      try {
        const [result] = await conexao.promise().execute(sql, [
          user.nome, user.email, user.senha
        ]);
        return result;
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
      }
    },

    // FUNÇÃO REESCRITA PARA USAR SQL
    async updateProfile(id, updatedData) {
      const conexao = db.getConexao();
      const sql = 'UPDATE users SET nome = ?, email = ?, senha = ?, foto = ? WHERE idUsers = ?;';
      try {
        const [result] = await conexao.promise().execute(sql, [
          updatedData.nome,
          updatedData.email,
          updatedData.senha,
          updatedData.foto,
          id
        ]);
        if (result.affectedRows > 0) {
          return this.getById(id); // Retorna o usuário atualizado (sem a senha)
        }
        return null;
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        throw error;
      }
    },

    // FUNÇÃO NOVA, ADICIONADA PARA CONSISTÊNCIA
    async deleteById(id) {
        const conexao = db.getConexao();
        const sql = 'DELETE FROM users WHERE idUsers = ?;';
        try {
            const [result] = await conexao.promise().execute(sql, [id]);
            return result;
        } catch (error) {
            console.error('Erro ao deletar usuário por ID:', error);
            throw error;
        }
    },

    // FUNÇÃO REESCRITA PARA USAR SQL
    async removeProfilePhoto(userId) {
      const conexao = db.getConexao();
      const sql = 'UPDATE users SET foto = NULL WHERE idUsers = ?;';
      try {
        const [result] = await conexao.promise().execute(sql, [userId]);
        if (result.affectedRows > 0) {
            return this.getById(userId);
        }
        return null;
      } catch (error) {
        console.error('Erro ao remover foto de perfil:', error);
        throw error;
      }
    },
  };
}