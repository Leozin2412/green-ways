export default function createUserRepository(db) {
  return {
    async getById(id) {
      const conexao = db.getConexao();
      const sql = 'SELECT idUsers, nome, email, foto, permissao, ativo FROM users WHERE idUsers = ? LIMIT 1';
      const [rows] = await conexao.promise().query(sql, [id]);
      return rows[0] || null;
    },

    async getByEmail(email) {
      const conexao = db.getConexao();
      const sql = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await conexao.promise().query(sql, [email]);
      return rows[0] || null;
    },

    async create(user) {
      const conexao = db.getConexao();
      const sql = 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)';
      const [result] = await conexao.promise().execute(sql, [user.nome, user.email, user.senha]);
      return result;
    },

    async updateProfile(id, updatedData) {
      const conexao = db.getConexao();
      const sql = 'UPDATE users SET nome=?, email=?, senha=?, foto=? WHERE idUsers=?';
      await conexao.promise().execute(sql, [
        updatedData.nome,
        updatedData.email,
        updatedData.senha,
        updatedData.foto,
        id
      ]);
      return this.getById(id);
    },

    async deleteById(id) {
      const conexao = db.getConexao();
      const sql = 'DELETE FROM users WHERE idUsers=?';
      const [result] = await conexao.promise().execute(sql, [id]);
      return result;
    },

    async removeProfilePhoto(userId) {
      const conexao = db.getConexao();
      const sql = 'UPDATE users SET foto=NULL WHERE idUsers=?';
      await conexao.promise().execute(sql, [userId]);
      return this.getById(userId);
    }
  };
}
