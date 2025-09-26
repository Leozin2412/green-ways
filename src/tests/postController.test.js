import { test } from 'poku';
import { deepStrictEqual as equal, ok as truthy } from 'assert';
import createPostController from '../controllers/PostController.js';

// --- Função de Setup ---
// Cria um ambiente de teste isolado para cada teste do PostController.
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

  // Mock do PostRepository, imitando os métodos que usam Prisma.
  const mockPostRepository = {
    loadPosts: async (...args) => {
      spies.PostRepository.loadPosts = args;
      return { total: 1, totalPage: 1, posts: [{ idPost: 1, content: 'Post de Teste' }] };
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
      return { idComents: 1, content: 'Nova Resposta' };
    },
    deleteResponse: async (...args) => {
      spies.PostRepository.deleteResponse = args;
      return { affectedRows: 1 };
    },
  };

  // Mocks do Request e Response do Express
  const mockReq = {
    body: {},
    params: {},
    query: {}, // Adicionado para o teste de paginação
  };

  const mockRes = {
    status: function(statusCode) {
      spies.res.status = statusCode;
      return this; // Permite o encadeamento res.status().json()
    },
    json: function(data) {
      spies.res.json = data;
    },
  };

  // Cria o controller injetando o nosso mock do repositório
  const postController = createPostController(mockPostRepository);

  return { postController, spies, mockReq, mockRes, mockPostRepository };
}

// --- Testes ---

test('getAllPosts deve retornar status 200 e a lista de posts com paginação', async () => {
  const { postController, spies, mockReq, mockRes } = setup();
  // Simula a query string da URL, ex: /posts?page=1&limit=10
  mockReq.query = { page: '1', limit: '10' };

  await postController.getAllPosts(mockReq, mockRes);

  const [skip, limit] = spies.PostRepository.loadPosts;
  equal(skip, 0); // (page 1 - 1) * 10 = 0
  equal(limit, 10);
  equal(spies.res.json.ok, true);
  equal(spies.res.json.posts.length, 1);
});

test('getAllPosts deve retornar 500 em caso de erro no repositório', async () => {
  const { postController, spies, mockReq, mockRes, mockPostRepository } = setup();
  mockPostRepository.loadPosts = () => Promise.reject(new Error('Erro de banco'));

  await postController.getAllPosts(mockReq, mockRes);

  equal(spies.res.status, 500);
  equal(spies.res.json.message, 'Erro de banco');
});

test('createPost deve retornar 201 e o novo post', async () => {
  const { postController, spies, mockReq, mockRes } = setup();
  mockReq.body = {
    userId: '1',
    region: 'SP',
    content: 'Novo post de teste',
  };

  await postController.createPost(mockReq, mockRes);

  const [userId, region, content] = spies.PostRepository.addPost;
  equal(userId, 1); // Verifica se o ID foi convertido para número
  equal(region, 'SP');
  equal(spies.res.status, 201);
  equal(spies.res.json.post.content, 'Novo Post');
});

test('createPost deve retornar 400 se faltarem campos', async () => {
  const { postController, spies, mockReq, mockRes } = setup();
  mockReq.body = { userId: '1' }; // Faltam region e content

  await postController.createPost(mockReq, mockRes);

  equal(spies.res.status, 400);
  equal(spies.res.json.message, 'Campos obrigatórios');
});


test('deletePost deve retornar 200 com mensagem de sucesso', async () => {
  const { postController, spies, mockReq, mockRes } = setup();
  mockReq.params = { postId: '123' };

  await postController.deletePost(mockReq, mockRes);

  equal(spies.PostRepository.deletePost[0], 123); // Verifica se converteu para número
  equal(spies.res.json.ok, true);
  equal(spies.res.json.message, 'Post deletado');
});

test('addResponse deve retornar 201 com mensagem de sucesso', async () => {
  const { postController, spies, mockReq, mockRes } = setup();
  mockReq.body = {
    postId: '1',
    Users_id: '2',
    content: 'Esta é uma resposta',
  };

  await postController.addResponse(mockReq, mockRes);

  const [postId, userId, content] = spies.PostRepository.addResponse;
  equal(postId, 1);
  equal(userId, 2);
  equal(content, 'Esta é uma resposta');
  equal(spies.res.status, 201);
});

test('deleteResponse deve retornar 200 com mensagem de sucesso', async () => {
  const { postController, spies, mockReq, mockRes } = setup();
  mockReq.body = { responseId: '5' };

  await postController.deleteResponse(mockReq, mockRes);

  equal(spies.PostRepository.deleteResponse[0], 5);
  equal(spies.res.json.message, 'Resposta deletada');
});