// A importação direta do PostRepository foi REMOVIDA.
// import PostRepository from "../repositories/postRepository.js";

// 1. O arquivo agora exporta uma "fábrica" que recebe o PostRepository.
export default function createPostController(PostRepository) {
  // 2. Retornamos o objeto do controller com todos os seus métodos.
  return {
    getAllPosts: async (req, res) => {
      try {
        const page = Number.parseInt(req.query.page) || 1;
        const limit = Number.parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Usa a instância do PostRepository que foi injetada.
        const data = await PostRepository.loadPosts(skip, limit);

        res.json({ ok: true, ...data });
      } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
      }
    },

    createPost: async (req, res) => {
      try {
        const { userId, region, content } = req.body;
        const numericUserId = Number.parseInt(userId, 10);
        if (!numericUserId || !region || !content) {
          return res
            .status(400)
            .json({ ok: false, message: "Campos obrigatórios" });
        }
        const newPost = await PostRepository.addPost(numericUserId, region, content);
        
        res.status(201).json({ ok: true, post: newPost });
      } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
      }
    },

    deletePost: async (req, res) => {
      try {
        const { postId } = req.params;
        const numericPostId = Number.parseInt(postId, 10);
        await PostRepository.deletePost(numericPostId);
        res.json({ ok: true, message: "Post deletado" });
      } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
      }
    },

    addResponse: async (req, res) => {
      try {
        const { postId, Users_id, content } = req.body;
        const numericPostId = Number.parseInt(postId, 10);
        const numericUserId = Number.parseInt(Users_id, 10);
        if (!postId || !Users_id || !content) {
          return res
            .status(400)
            .json({ ok: false, message: "Campos obrigatórios" });
        }
      console.log(numericPostId, numericUserId, content )
        await PostRepository.addResponse(
          numericPostId,
          numericUserId,
          content
        );
        res.status(201).json({ ok: true, message: "Resposta adicionada com sucesso" });
      } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
      }
    },

    deleteResponse: async (req, res) => {
      try {
        const { responseId } = req.body;
        const numericResponseId = Number.parseInt(responseId, 10);
        await PostRepository.deleteResponse(numericResponseId);
        res.json({ ok: true, message: "Resposta deletada" });
      } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
      }
    }
  };
}