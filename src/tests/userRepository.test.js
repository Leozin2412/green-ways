import { test } from 'poku';
import { deepStrictEqual as equal, ok as truthy } from 'assert';
import createUserRepository from '../repositories/UserRepository.js';

// --- Função de setup ---
function setup() {
  const spies = {
    query: null,
    execute: null
  };

  const mockQuery = async (...args) => {
    spies.query = args;
    return [[{ idUsers: 1, nome: 'Teste', email: 'teste@email.com', foto: null, permissao: 'user', ativo: 1 }], []];
  };

  const mockExecute = async (...args) => {
    spies.execute = args;
    return [{ insertId: 1 }, []];
  };

  const mockConexao = {
    promise() { return this; },
    query: mockQuery,
    execute: mockExecute
  };

  const mockDb = { getConexao: () => mockConexao };
  const userRepository = createUserRepository(mockDb);

  return { userRepository, spies, mockConexao };
}

// --- Testes ---

test('getById deve retornar o usuário correto pelo ID', async () => {
  const { userRepository, spies } = setup();
  const user = await userRepository.getById(1);

  equal(user.idUsers, 1);
  equal(user.nome, 'Teste');
  equal(spies.query[0], 'SELECT idUsers, nome, email, foto, permissao, ativo FROM users WHERE idUsers = ? LIMIT 1');
  equal(spies.query[1][0], 1);
});

test('getByEmail deve retornar o usuário correto pelo email', async () => {
  const { userRepository, spies } = setup();
  const user = await userRepository.getByEmail('teste@email.com');

  equal(user.email, 'teste@email.com');
  equal(spies.query[0], 'SELECT * FROM users WHERE email = ?');
  equal(spies.query[1][0], 'teste@email.com');
});

test('create deve inserir um novo usuário', async () => {
  const { userRepository, spies } = setup();
  const newUser = { nome: 'Novo', email: 'novo@email.com', senha: '123456' };

  const result = await userRepository.create(newUser);

  equal(spies.execute[0], 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)');
  equal(spies.execute[1][0], newUser.nome);
  equal(spies.execute[1][1], newUser.email);
  equal(spies.execute[1][2], newUser.senha);
  truthy(result.insertId, 'Deve retornar o insertId do usuário criado');
});

test('updateProfile deve atualizar os dados do usuário e retornar o usuário atualizado', async () => {
  const { userRepository, spies } = setup();
  const updatedData = { nome: 'Atualizado', email: 'atualizado@email.com', senha: '654321', foto: 'foto.png' };

  const updatedUser = await userRepository.updateProfile(1, updatedData);

  equal(spies.execute[0], 'UPDATE users SET nome=?, email=?, senha=?, foto=? WHERE idUsers=?');
  equal(spies.execute[1][0], updatedData.nome);
  equal(spies.execute[1][1], updatedData.email);
  equal(spies.execute[1][2], updatedData.senha);
  equal(spies.execute[1][3], updatedData.foto);
  equal(spies.execute[1][4], 1);
  equal(updatedUser.idUsers, 1);
});

test('deleteById deve deletar o usuário pelo ID', async () => {
  const { userRepository, spies } = setup();
  const result = await userRepository.deleteById(1);

  equal(spies.execute[0], 'DELETE FROM users WHERE idUsers=?');
  equal(spies.execute[1][0], 1);
  truthy(result, 'Deve retornar o resultado da execução');
});

test('removeProfilePhoto deve remover a foto do usuário e retornar o usuário atualizado', async () => {
  const { userRepository, spies } = setup();
  const updatedUser = await userRepository.removeProfilePhoto(1);

  equal(spies.execute[0], 'UPDATE users SET foto=NULL WHERE idUsers=?');
  equal(spies.execute[1][0], 1);
  equal(updatedUser.idUsers, 1);
});
