import fs from "fs";
import path from "path";

const filePath = path.resolve("./src/database/posts.json");

function loadPosts() {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao carregar posts:", error);
    return [];
  }
}

function savePosts(posts) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error("Erro ao salvar posts:", error);
  }
}

function addPost(newPost) {
  const posts = loadPosts();
  newPost.id = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
  newPost.createdAt = new Date().toISOString();
  posts.push(newPost);
  savePosts(posts);
  return newPost;
}

function deletePost(postId) {
  const posts = loadPosts();
  const index = posts.findIndex((p) => p.id == postId);
  if (index !== -1) {
    posts.splice(index, 1);
    savePosts(posts);
    return true;
  }
  return false;
}

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
