import fs from "fs";
import path from "path";
import conexao from "../database/conexao.js";
const filePath = path.resolve("./src/database/posts.json");
import { v4 as uuidv4 } from "uuid";

// Carregar os posts vindo do banco de dados 
async function loadPosts() {
  try {
    const [rows] = await conexao.promise().query("SELECT * FROM post ORDER BY createdAt DESC");
    return rows;
  } catch (error) {
    console.error("Erro ao carregar posts:", error);
    return [];
  }
}

// function savePosts(posts) {
//   try {
//     fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
//   } catch (error) {
//     console.error("Erro ao salvar posts:", error);
//   }
// }

async function addPost({ userId, region, content }) {
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
    console.error("Erro ao adicionar post:", error);
    return null;
  }
}

async function deletePost(idPost) {
  const sql = `DELETE FROM post WHERE idPost = ?`;
  try {
    const [result] = await conexao.promise().execute(sql, [idPost]);
    return result;
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    throw error;
  }
}
  const index = posts.findIndex((p) => p.id == idPost);
  if (index !== -1) {
    posts.splice(index, 1);
    savePosts(posts);
    return true;
  }
  return false;


function addResponse(postId, response) {
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
}

function deleteResponse(postId, responseId) {
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

export default {
  loadPosts,
  savePosts,
  addPost,
  deletePost,
  addResponse,
  deleteResponse,
};
