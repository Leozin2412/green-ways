import PostRepository from "../repositories/postRepository.js";

const PostController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await PostRepository.getAllPosts();
      res.json({ ok: true, posts });
    } catch (error) {
      console.error("Erro no controller ao buscar posts:", error);
      res.status(500).json({ ok: false, message: "Erro ao buscar posts." });
    }
  },

  createPost: async (req, res) => {
    try {
      const { userId, userName, region, content } = req.body;
      if (!userId || !region || !content) {
        return res
          .status(400)
          .json({ ok: false, message: "Campos obrigatórios (userId, region, content) não preenchidos." });
      }

      const newPostData = {
        userId: userId,
        region: region,
        content: content,
      };

      const createdPost = await PostRepository.addPost(newPostData);
      
      if (createdPost) {
        res.status(201).json({
          ok: true,
          post: {
            ...createdPost,
            userName: userName
          }
        });
      } else {
        return res.status(500).json({ ok: false, message: "Falha ao criar post no banco de dados." });
      }
    } catch (error) {
      console.error("Erro no controller ao criar post:", error);
      res.status(500).json({ ok: false, message: "Erro ao criar post." });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { postId } = req.params;
      const deleted = await PostRepository.deletePost(postId);
      if (deleted) {
        res.json({ ok: true, message: "Post deletado com sucesso." });
      } else {
        res.status(404).json({ ok: false, message: "Post não encontrado ou já deletado." });
      }
    } catch (error) {
      console.error("Erro no controller ao deletar post:", error);
      res.status(500).json({ ok: false, message: "Erro ao deletar post." });
    }
  },

  addResponse: async (req, res) => {
    try {
      const { postId, userId, userName, content } = req.body;
      if (!postId || !userId || !content) {
        return res
          .status(400)
          .json({ ok: false, message: "Campos obrigatórios (postId, userId, content)" });
      }

      const newResponseData = {
        userId: userId,
        content: content,
      };

      const addedResponse = await PostRepository.addResponse(postId, newResponseData);

      if (addedResponse) {
        res.status(201).json({
          ok: true,
          response: {
            ...addedResponse,
            userName: userName
          }
        });
      } else {
        res.status(500).json({ ok: false, message: "Falha ao adicionar resposta." });
      }
    } catch (error) {
      console.error("Erro no controller ao adicionar resposta:", error);
      res.status(500).json({ ok: false, message: "Erro ao adicionar resposta." });
    }
  },

  deleteResponse: async (req, res) => {
    try {
      const { postId, responseId } = req.body;
      
      const deleted = await PostRepository.deleteResponse(responseId);
      if (deleted) {
        res.json({ ok: true, message: "Resposta deletada com sucesso." });
      } else {
        res.status(404).json({ ok: false, message: "Resposta não encontrada ou já deletada." });
      }
    } catch (error) {
      console.error("Erro no controller ao deletar resposta:", error);
      res.status(500).json({ ok: false, message: "Erro ao deletar resposta." });
    }
  }
};

export default PostController;