import { test } from 'poku';
import { deepStrictEqual as equal, ok as truthy } from 'node:assert';
// O teste importa a fábrica, o que está correto com a nossa arquitetura
import createPostRepository from '../repositories/postRepository.js';

// --- Função de Setup ---
function setup() {
  const spies = {
    findMany: null,
    create: null,
    delete: null,
    count: null,
    transaction: null
  };

  // O mock do Prisma continua o mesmo, pois ele simula a camada abaixo do repositório
  const mockPrisma = {
    post: {
      findMany: async (args) => { spies.findMany = args; return[{ idPost: 1, content: 'Post de Teste' }]; },
      create: async (args) => { spies.create = args; return { idPost: 2, ...args.data }; },
      delete: async (args) => { spies.delete = args; return { idPost: args.where.idPost }; },
      count: async () => { spies.count = true; return 1; }
    },
    $transaction: async (args) => {
      spies.transaction = args;
      const posts = await args[0];
      const total = await args[1];
      return [posts, total];
    }
  };

  // O repositório é criado com o mock do Prisma
  const postRepository = createPostRepository(mockPrisma);

  return { postRepository, spies };
}

// --- Testes Corrigidos ---

// CORREÇÃO: O nome do teste e a chamada da função foram atualizados
test('loadPosts deve chamar prisma.post.findMany com a ordenação correta', async () => {
  const { postRepository, spies } = setup();

  // CORREÇÃO: Chamando o método que realmente existe: loadPosts()
  const result = await postRepository.loadPosts(0, 10);

  // As verificações continuam válidas
  equal(result.posts[0].content, 'Post de Teste');
  truthy(spies.transaction, 'A transação do Prisma deve ser chamada');
  equal(spies.findMany.orderBy.createdAt, 'desc');
});

// CORREÇÃO: O nome do teste e a chamada da função foram atualizados
test('addPost deve chamar prisma.post.create com os dados corretos', async () => {
  const { postRepository, spies } = setup();

  const userID = 1;
  const region = 'Sudeste';
  const content = 'Conteúdo do novo post';

  // CORREÇÃO: Chamando o método que realmente existe: addPost()
  await postRepository.addPost(userID, region, content);

  // Verificamos se o mock do Prisma foi chamado com os dados corretos
  const expectedData = {
    region: region,
    content: content,
    Users_id: userID,
  };
  equal(spies.create.data, expectedData);
});

// CORREÇÃO: O nome do teste e a chamada da função foram atualizados
test('deletePost deve chamar prisma.post.delete com o ID correto', async () => {
  const { postRepository, spies } = setup();
  const postIdToDelete = 123;

  // CORREÇÃO: Chamando o método que realmente existe: deletePost()
  await postRepository.deletePost(postIdToDelete);

  // Verificamos se o mock do Prisma foi chamado com o 'where' correto
  equal(spies.delete.where.idPost, postIdToDelete);
});