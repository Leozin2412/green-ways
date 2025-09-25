import { parse } from "dotenv";
import PostRepository from "../repositories/postRepository.js";


const PostController = {
  getAllPosts: async (req,res) => {
    try {
      const posts = await PostRepository.loadPosts();
      res.json({ ok: true, posts });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  createPost: async (req, res) => {
    try {
      const { userId,region, content } = req.body;
      const numericUserId = parseInt(userId, 10);
      if (!numericUserId  ||!region || !content) {
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
      const numericPostId = parseInt(postId, 10);
      await PostRepository.deletePost(numericPostId);
      res.json({ ok: true, message: "Post deletado" });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  addResponse: async (req, res) => {
    try {
      const { postId, Users_id, content } = req.body;
      const numericPostId= parseInt(postId,10)
      const numericUserId=parseInt(Users_id,10)
      if (!postId || !Users_id || !content) {
        return res
          .status(400)
          .json({ ok: false, message: "Campos obrigatórios" });
      }
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
      const { postId, responseId } = req.body;
      await PostRepository.deleteResponse(postId, responseId);
      res.json({ ok: true, message: "Resposta deletada" });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  }
};

export default PostController;