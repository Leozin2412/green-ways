import { test } from 'poku';
import { deepStrictEqual as equal, ok as truthy } from 'assert';
import createPostRepository from '../repositories/postRepository.js';

// --- Função de Setup ---
// Esta função agora RETORNA um universo de teste completamente novo a cada chamada.
function setup() {
  // O objeto 'spies' guardará os argumentos capturados para cada teste individualmente.
  const spies = {
    query: null,
    execute: null,
    writeFileSync: null,
  };

  const mockQuery = async (...args) => {
    spies.query = args;
    return Promise.resolve([[{ idPost: 1, content: 'Post 1' }], []]);
  };
  const mockExecute = async (...args) => {
    spies.execute = args;
    return Promise.resolve([{ insertId: 1 }, []]);
  };

  const mockConexao = {
    promise: function() { return this; },
    query: mockQuery,
    execute: mockExecute,
  };

  const mockDbModule = { getConexao: () => mockConexao };
  const mockFs = { writeFileSync: (...args) => { spies.writeFileSync = args; } };
  const mockUuid = { v4: () => 'mock-uuid-1234' };

  const postRepository = createPostRepository(mockDbModule, mockUuid, mockFs);

  // Retornamos tudo que os testes precisam.
  return { postRepository, spies, mockConexao };
}


// --- Testes ---

test('loadPosts deve retornar posts do banco de dados com sucesso', async () => {
  // Cada teste obtém seu próprio conjunto de mocks e espiões.
  const { postRepository, spies } = setup(); 
  
  const posts = await postRepository.loadPosts();

  equal(posts, [{ idPost: 1, content: 'Post 1' }]);
  equal(spies.query[0], 'SELECT * FROM post ORDER BY createdAt DESC');
});

test('loadPosts deve retornar um array vazio em caso de erro', async () => {
  const { postRepository, mockConexao } = setup();

  // Modifica a cópia local do mock apenas para este teste.
  mockConexao.query = () => Promise.reject(new Error('DB Error'));
  
  const posts = await postRepository.loadPosts();
  
  equal(posts, []);
});

test('addPost deve inserir um novo post no banco de dados', async () => {
  const { postRepository, spies } = setup();

  const newPostData = { userId: 'user-1', region: 'Sudeste', content: 'Este é um novo post' };
  
  await postRepository.addPost(newPostData);
  
  const expectedSql = 'INSERT INTO post (idPost, region, content, User_idUsers, createdAt, responses) VALUES (?, ?, ?, ?, ?, ?)';
  
  equal(spies.execute[0], expectedSql);
  truthy(spies.execute[1][4] instanceof Date, 'O quinto parâmetro deve ser uma data');
});

test('deletePost deve executar o comando DELETE no banco de dados', async () => {
  const { postRepository, spies } = setup();

  const postId = 'post-to-delete-123';
  
  await postRepository.deletePost(postId);
  
  const expectedSql = 'DELETE FROM post WHERE idPost = ?';
  equal(spies.execute[0], expectedSql);
  equal(spies.execute[1], [postId]);
});

test('savePosts deve chamar fs.writeFileSync com os dados corretos', () => {
  const { postRepository, spies } = setup();

  const postsToSave = [{ id: 1, content: 'Um post' }];
  
  postRepository.savePosts(postsToSave);
  
  const expectedData = JSON.stringify(postsToSave, null, 2);
  truthy(spies.writeFileSync[0].includes('posts.json'));
  equal(spies.writeFileSync[1], expectedData);
});