import fs from "fs";
import path from "path";
import conexao from "../database/conexao.js";
const filePath = path.resolve("./src/database/posts.json");
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from '../../generated/prism/index.js';

const prisma= new PrismaClient()

const PostRepository={
async loadPosts(skip, take) {
  try {
    const queryOptions = {
      orderBy: { createdAt: 'desc' },
      include: {
        coments: {
          select: {
            idComents: true,
            Post_idPost: true,
            Users_id: true,
            content: true,
            users: {
              select: {
                nome: true,
                foto: true
              }
            }
          },
        },
        users: {
          select: {
            foto: true,
            nome: true
          }
        }
      },
    };

    // Só adiciona a paginação à query se 'take' for um número válido > 0
    if (take > 0) {
      queryOptions.skip = skip;
      queryOptions.take = take;
    }

    const [posts, total] = await prisma.$transaction([
      prisma.post.findMany(queryOptions),
      // CORREÇÃO 2: Chamando a função count()
      prisma.post.count()
    ]);

    const totalPage = take > 0 ? Math.ceil(total / take) : 1;

    return { total, totalPage, posts };
  } catch (error) {
    console.error("Erro ao carregar posts:", error);
    return { total: 0, totalPage: 0, posts: [] };
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


async  deletePost(numericPostId) {
 const deletePost= await prisma.post.delete({
    where:{idPost:numericPostId}
  })
  return deletePost
},



async addResponse(numericPostId,numericUserId, content) {
  const coments=await prisma.coments.create({
    data:{
      Post_idPost:numericPostId,
      Users_id:numericUserId,
      content:content
    }
  })
  return coments
},

 async deleteResponse( responseId) {
const deleteComents= await prisma.coments.delete({
  where:{
    idComents:responseId
  }
})
  return deleteComents;
}
}
export default PostRepository