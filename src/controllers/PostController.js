import PostRepository from "../repositories/postRepository.js";

const PostController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await PostRepository.loadPosts();
      res.json({ ok: true, posts });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  createPost: async (req, res) => {
    try {
      const { userId, userName, region, content } = req.body;
      if (!userId || !userName || !region || !content) {
        return res
          .status(400)
          .json({ ok: false, message: "Campos obrigatórios" });
      }
      const newPost = await PostRepository.addPost({
        userId,
        userName,
        region,
        content,
      });
      res.status(201).json({ ok: true, post: newPost });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { postId } = req.params;
      await PostRepository.deletePost(postId);
      res.json({ ok: true, message: "Post deletado" });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  addResponse: async (req, res) => {
    try {
      const { postId, userName, content } = req.body;
      if (!postId || !userName || !content) {
        return res
          .status(400)
          .json({ ok: false, message: "Campos obrigatórios" });
      }
      const response = await PostRepository.addResponse(postId, {
        userName,
        content,
      });
      res.status(201).json({ ok: true, response });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  deleteResponse: async (req, res) => {
    try {
      const { postId, responseId } = req.body;
      await PostRepository.deleteResponse(postId, responseId);
      res.json({ ok: true, message: "Resposta deletada" });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  }
};

export default PostController;
