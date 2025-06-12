import conexao from "../database/conexao.js";

const PostRepository = {
  async getAllPosts() {
    try {
      const sql = `
        SELECT 
            p.idPost,
            p.region,
            p.content,
            DATE_FORMAT(p.createdAt, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt,
            p.Users_id AS userId,
            u.nome AS userName,
            u.foto AS userFoto
        FROM post AS p
        JOIN users AS u ON p.Users_id = u.id
        ORDER BY p.createdAt DESC;
      `;
      const [postsRows] = await conexao.query(sql);

      const postsWithResponses = await Promise.all(postsRows.map(async (post) => {
        const responsesSql = `
          SELECT
              r.idResponse,
              r.content,
              DATE_FORMAT(r.createdAt, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt,
              r.Users_id AS userId,
              u.nome AS userName,
              u.foto AS userFoto
          FROM responses AS r
          JOIN users AS u ON r.Users_id = u.id
          WHERE r.Post_idPost = ?
          ORDER BY r.createdAt ASC;
        `;
        const [responsesRows] = await conexao.query(responsesSql, [post.idPost]);
        return {
          ...post,
          responses: responsesRows
        };
      }));

      return postsWithResponses;
    } catch (error) {
      console.error("Erro ao carregar posts no repositório:", error);
      throw new Error("Não foi possível carregar os posts.");
    }
  },

  async getPostById(postId) {
    try {
      const sql = `
        SELECT 
            p.idPost,
            p.region,
            p.content,
            DATE_FORMAT(p.createdAt, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt,
            p.Users_id AS userId,
            u.nome AS userName,
            u.foto AS userFoto
        FROM post AS p
        JOIN users AS u ON p.Users_id = u.id
        WHERE p.idPost = ?;
      `;
      const [rows] = await conexao.query(sql, [postId]);
      if (rows.length === 0) return null;

      const post = rows[0];

      const responsesSql = `
          SELECT
              r.idResponse,
              r.content,
              DATE_FORMAT(r.createdAt, '%Y-%m-%dT%H:%i:%s.000Z') AS createdAt,
              r.Users_id AS userId,
              u.nome AS userName,
              u.foto AS userFoto
          FROM responses AS r
          JOIN users AS u ON r.Users_id = u.id
          WHERE r.Post_idPost = ?
          ORDER BY r.createdAt ASC;
        `;
      const [responsesRows] = await conexao.query(responsesSql, [post.idPost]);

      return {
        ...post,
        responses: responsesRows
      };

    } catch (error) {
      console.error("Erro ao buscar post por ID no repositório:", error);
      throw new Error("Não foi possível buscar o post.");
    }
  },

  async addPost(newPost) {
    try {
      const sql = `
        INSERT INTO post (region, content, createdAt, Users_id)
        VALUES (?, ?, ?, ?);
      `;
      const [result] = await conexao.query(sql, [
        newPost.region,
        newPost.content,
        new Date(),
        newPost.userId,
      ]);
      
      if (result.affectedRows > 0) {
        return { idPost: result.insertId, ...newPost, createdAt: new Date().toISOString() };
      }
      console.warn("Nenhuma linha afetada ao adicionar post, pode ter havido um problema.");
      return null;
    } catch (error) {
      console.error("Erro ao adicionar post no repositório:", error);
      throw new Error("Não foi possível adicionar o post.");
    }
  },

  async deletePost(postId) {
    try {
      const sql = `DELETE FROM post WHERE idPost = ?;`;
      const [result] = await conexao.query(sql, [postId]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Erro ao deletar post no repositório:", error);
      throw new Error("Não foi possível deletar o post.");
    }
  },

  async addResponse(postId, response) {
    try {
      const sql = `
        INSERT INTO responses (content, createdAt, Users_id, Post_idPost)
        VALUES (?, ?, ?, ?);
      `;
      const [result] = await conexao.query(sql, [
        response.content,
        new Date(),
        response.userId,
        postId,
      ]);
      
      if (result.affectedRows > 0) {
        return { idResponse: result.insertId, ...response, createdAt: new Date().toISOString() };
      }
      return null;
    } catch (error) {
      console.error("Erro ao adicionar resposta no repositório:", error);
      throw new Error("Não foi possível adicionar a resposta.");
    }
  },

  async deleteResponse(responseId) {
    try {
      const sql = `DELETE FROM responses WHERE idResponse = ?;`;
      const [result] = await conexao.query(sql, [responseId]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Erro ao deletar resposta no repositório:", error);
      throw new Error("Não foi possível deletar a resposta.");
    }
  },
};

export default PostRepository;