import { test } from 'poku';
import { deepStrictEqual as equal, ok as truthy } from 'assert';
import createPostController from '../controllers/PostController.js';

// --- Função de Setup ---
// Cria um ambiente de teste isolado para cada teste.
function setup() {
  const spies = {
    res: {
      status: null,
      json: null,
    },
    PostRepository: {
      loadPosts: null,
      addPost: null,
      deletePost: null,
      addResponse: null,
      deleteResponse: null,
    },
  };

  const mockPostRepository = {
    loadPosts: async (...args) => {
      spies.PostRepository.loadPosts = args;
      return [{ idPost: 1, content: 'Post de Teste' }];
    },
    addPost: async (...args) => {
      spies.PostRepository.addPost = args;
      return { idPost: 2, content: 'Novo Post' };
    },
    deletePost: async (...args) => {
      spies.PostRepository.deletePost = args;
      return { affectedRows: 1 };
    },
    addResponse: async (...args) => {
      spies.PostRepository.addResponse = args;
      return { idResponse: 'resp-1', content: 'Resposta de Teste' };
    },
    deleteResponse: async (...args) => {
      spies.PostRepository.deleteResponse = args;
      return { affectedRows: 1 };
    },
  };

  const mockReq = {
    body: {},
    params: {},
  };

  const mockRes = {
    status: (statusCode) => {
      spies.res.status = statusCode;
      return mockRes;
    },
    json: (data) => {
      spies.res.json = data;
    },
  };

  const postController = createPostController(mockPostRepository);

  return { postController, spies, mockReq, mockRes, mockPostRepository };
}

// --- Testes para as funções do controlador ---

test('getAllPosts deve retornar status 200 e a lista de posts', async () => {
  const { postController, spies, mockReq, mockRes } = setup();

  await postController.getAllPosts(mockReq, mockRes);

  equal(spies.PostRepository.loadPosts.length, 0); // Verifica se a função foi chamada sem argumentos.
  equal(spies.res.status, null); // Em caso de sucesso, o status 200 é o padrão.
  equal(spies.res.json.ok, true);
  equal(spies.res.json.posts.length, 1);
});

test('getAllPosts deve retornar status 500 em caso de erro', async () => {
  const { postController, spies, mockReq, mockRes, mockPostRepository } = setup();
  mockPostRepository.loadPosts = () => {
    throw new Error('Erro de banco de dados');
  };

  await postController.getAllPosts(mockReq, mockRes);

  equal(spies.res.status, 500);
  equal(spies.res.json.ok, false);
  equal(spies.res.json.message, 'Erro de banco de dados');
});

// ---

test('createPost deve retornar status 201 e o novo post em caso de sucesso', async () => {
  const { postController, spies, mockReq, mockRes } = setup();
  mockReq.body = {
    userId: 'user-1',
    userName: 'User Teste',
    region: 'SP',
    content: 'Novo post de teste',
  };

  await postController.createPost(mockReq, mockRes);

  equal(spies.PostRepository.addPost[0].userId, 'user-1');
  equal(spies.res.status, 201);
  equal(spies.res.json.ok, true);
  equal(spies.res.json.post.content, 'Novo Post');
});

test('createPost deve retornar status 400 se faltarem campos obrigatórios', async () => {
  const { postController, spies, mockReq, mockRes } = setup();
  mockReq.body = { userId: 'user-1', content: 'Conteúdo do post' }; // userId e content estão ok, mas userName e region faltam.

  await postController.createPost(mockReq, mockRes);

  equal(spies.res.status, 400);
  equal(spies.res.json.ok, false);
  equal(spies.res.json.message, 'Campos obrigatórios');
});

// ---

test('deletePost deve retornar status 200 e mensagem de sucesso', async () => {
  const { postController, spies, mockReq, mockRes } = setup();
  mockReq.params = { postId: 'post-1' };

  await postController.deletePost(mockReq, mockRes);

  equal(spies.PostRepository.deletePost[0], 'post-1');
  equal(spies.res.status, null);
  equal(spies.res.json.ok, true);
  equal(spies.res.json.message, 'Post deletado');
});

// ---

test('addResponse deve retornar status 201 e a nova resposta em caso de sucesso', async () => {
  const { postController, spies, mockReq, mockRes } = setup();
  mockReq.body = {
    postId: 'post-1',
    userName: 'User Resposta',
    content: 'Esta é uma resposta',
  };

  await postController.addResponse(mockReq, mockRes);

  equal(spies.PostRepository.addResponse[0], 'post-1');
  equal(spies.PostRepository.addResponse[1].userName, 'User Resposta');
  equal(spies.res.status, 201);
  equal(spies.res.json.ok, true);
  equal(spies.res.json.response.content, 'Resposta de Teste');
});

test('addResponse deve retornar status 400 se faltarem campos obrigatórios', async () => {
  const { postController, spies, mockReq, mockRes } = setup();
  mockReq.body = { postId: 'post-1' }; // Faltam userName e content

  await postController.addResponse(mockReq, mockRes);

  equal(spies.res.status, 400);
  equal(spies.res.json.ok, false);
  equal(spies.res.json.message, 'Campos obrigatórios');
});

// ---

test('deleteResponse deve retornar status 200 e mensagem de sucesso', async () => {
  const { postController, spies, mockReq, mockRes } = setup();
  mockReq.body = { postId: 'post-1', responseId: 'resp-1' };

  await postController.deleteResponse(mockReq, mockRes);

  equal(spies.PostRepository.deleteResponse[0], 'post-1');
  equal(spies.PostRepository.deleteResponse[1], 'resp-1');
  equal(spies.res.status, null);
  equal(spies.res.json.ok, true);
  equal(spies.res.json.message, 'Resposta deletada');
});