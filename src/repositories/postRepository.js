import path from "path";

const filePath = path.resolve("./src/database/posts.json");

// A fábrica agora recebe TODAS as suas dependências.
export default function createPostRepository(db, uuid, fs) {
  const repository = {
    async loadPosts() {
      const conexao = db.getConexao();
      try {
        const [rows] = await conexao.promise().query("SELECT * FROM post ORDER BY createdAt DESC");
        return rows;
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
        return [];
      }
    },

    savePosts(posts) {
      try {
        // Usa o 'fs' injetado
        fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
      } catch (error)
      {
        console.error("Erro ao salvar posts:", error);
      }
    },

    async addPost({ userId, region, content }) {
      const conexao = db.getConexao();
      const sql = `INSERT INTO post (idPost, region, content, User_idUsers, createdAt, responses) VALUES (?, ?, ?, ?, ?, ?)`;
      // Usa o 'uuid' injetado
      const idPost = uuid.v4();
      const createdAt = new Date();
      const responses = 0;
      try {
        const [result] = await conexao.promise().execute(sql, [
          idPost, region, content, userId, createdAt, responses
        ]);
        return result;
      } catch (error) {
        console.error("Erro ao adicionar post:", error);
        return null;
      }
    },

    async deletePost(idPost) {
      const conexao = db.getConexao();
      const sql = `DELETE FROM post WHERE idPost = ?`;
      try {
        const [result] = await conexao.promise().execute(sql, [idPost]);
        return result;
      } catch (error) {
        console.error("Erro ao deletar post:", error);
        throw error;
      }
    },
    
    async addResponse(postId, response) {
      const posts = await this.loadPosts();
      const post = posts.find((p) => p.id == postId);
      if (post) {
        if (!post.responses) post.responses = [];
        response.id =
          post.responses.length > 0
            ? Math.max(...post.responses.map((r) => r.id)) + 1
            : 1;
        response.createdAt = new Date().toISOString();
        post.responses.push(response);
        this.savePosts(posts);
        return response;
      }
      return null;
    },

    async deleteResponse(postId, responseId) {
      const posts = await this.loadPosts();
      const post = posts.find((p) => p.id == postId);
      if (post && post.responses) {
        const index = post.responses.findIndex((r) => r.id == responseId);
        if (index !== -1) {
          post.responses.splice(index, 1);
          this.savePosts(posts);
          return true;
        }
      }
      return false;
    }
  };

  return repository;
}