import fs from "fs";
import path from "path";
import conexao from "../database/conexao.js";
const filePath = path.resolve("./src/database/posts.json");
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from '../../generated/prism/index.js';

const prisma= new PrismaClient()

const PostRepository={
async loadPosts() {
  try {
    const posts = await prisma.post.findMany({
  orderBy: { createdAt: 'desc' },
  include: {
    // Include the comments for each post
    coments: {
      select: {
        // For each comment, select these fields...
        idComents: true,
        Post_idPost: true,
        Users_id: true,
        content: true,
        // ...and also include the user who made the comment
        users: {
          select: {
            nome: true,
            foto: true
          }
        }
      }
    },
    // Include the user who made the post
    users: {
      select: {
        foto: true,
        nome: true
      }
    }
  }
});
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


async  deletePost(idPost) {
 const deletePost= await prisma.post.delete({
    where:{idPost:idPost}
  })
  return deletePost
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