import fs from "fs";
import path from "path";
import conexao from "../database/conexao.js";
const filePath = path.resolve("./src/database/posts.json");
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from '../../generated/prism/index.js';

const prisma= new PrismaClient()
// Carregar os posts vindo do banco de dados 
const PostRepository={
async loadPosts() {
  try {
    const posts=await prisma.post.findMany(
      {orderBy:{createdAt:'desc'}}
    )
    return posts
  } catch (error) {
    console.error("Erro ao carregar posts:", error);
    return [];
  }
},
async addPost(userID,region,content){
  const createPost=await prisma.post.create({
    data:{
      region:region,
      content:content,
      Users_id: userID,
    }
  })
  return createPost
},
/*
async  addPost({ userId, region, content }) {
  const sql = `INSERT INTO post (idPost, region, content, User_idUsers, createdAt, responses) VALUES (?, ?, ?, ?, ?, ?)`;
  const idPost = uuidv4();
  const createdAt = new Date();
  const responses = 0;
  try {
    const [result] = await conexao.promise().execute(sql, [
      idPost,
      region,
      content,
      userId,
      createdAt,
      responses
    ]);
    return result;
  } catch (error) {
    console.error("Erro ao salvar post:", error);
    return null;
  }
},*/

async  deletePost(idPost) {
  const sql = `DELETE FROM post WHERE idPost = ?`;
  try {
    const [result] = await conexao.promise().execute(sql, [idPost]);

    // Depois de deletar do banco, deleta do array local (se necessário)
    const index = conexao.findIndex((p) => p.id == idPost);
    if (index !== -1) {
      conexao.splice(index, 1);
      savePosts(conexao);
    }

    return result;
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    throw error;
  }
},



async addResponse(postId, response) {
  const posts = loadPosts();
  const post = posts.find((p) => p.id == postId);
  if (post) {
    if (!post.responses) post.responses = [];
    response.id =
      post.responses.length > 0
        ? Math.max(...post.responses.map((r) => r.id)) + 1
        : 1;
    response.createdAt = new Date().toISOString();
    post.responses.push(response);
    savePosts(posts);
    return response;
  }
  return null;
},

 deleteResponse(postId, responseId) {
  const posts = loadPosts();
  const post = posts.find((p) => p.id == postId);
  if (post && post.responses) {
    const index = post.responses.findIndex((r) => r.id == responseId);
    if (index !== -1) {
      post.responses.splice(index, 1);
      savePosts(posts);
      return true;
    }
  }
  return false;
}
}
export default PostRepository