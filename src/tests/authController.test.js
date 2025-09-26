import { test } from 'poku';
import { deepStrictEqual as equal, ok as truthy } from 'assert';
import createAuthController from '../controllers/AuthControllers.js';

function setup() {
  const spies = {
    res: { status: null, json: null },
    UserRepository: { getByEmail: null, create: null, login: null, desativarAtivar: null }, // Adicionado spy
    bcrypt: { compare: null, hash: null },
    jwt: { sign: null },
  };

  const mockUserRepository = {
    getByEmail: async (...args) => { spies.UserRepository.getByEmail = args; return null; },
    create: async (...args) => { spies.UserRepository.create = args; return { id: 1 }; },
    login: async (...args) => { spies.UserRepository.login = args; return { id: 1, nome: 'Test', senha: 'hashed' }; },
    // CORREÇÃO: Adicionado o mock para a função desativarAtivar que estava faltando.
    desativarAtivar: async (...args) => { spies.UserRepository.desativarAtivar = args; return { count: 1 }; },
    // Adicionamos os outros mocks para evitar erros em outros testes
    getById: async () => ({ id: 1 }),
    updateProfile: async () => ({ id: 1 }),
    removeProfilePhoto: async () => ({ id: 1 }),
    update: async () => ({ id: 1 }),
  };
  
  const mockBcrypt = {
    compare: async () => true,
    hash: async () => 'hashedPassword',
  };

  const mockJwt = {
    sign: () => 'mock-token-123',
  };

  const mockReq = { body: {}, query: {}, params: {} };
  const mockRes = {
    status: function(statusCode) { spies.res.status = statusCode; return this; },
    json: function(data) { spies.res.json = data; },
  };

  const authController = createAuthController(mockUserRepository, mockBcrypt, mockJwt, 'SECRET', '1h');
  return { authController, spies, mockReq, mockRes, mockUserRepository };
}

// --- Testes (Apenas o teste de deleção precisa de atenção) ---

test('deleteUser deve chamar UserRepository.desativarAtivar', async () => {
  const { authController, spies, mockReq, mockRes } = setup();
  mockReq.body = { id: 123 };

  await authController.deleteUser(mockReq, mockRes);

  equal(spies.UserRepository.desativarAtivar[0], 123);
  equal(spies.res.json.ok, true);
});

test('deleteUser deve retornar 404 se o usuário não for encontrado', async () => {
    const { authController, spies, mockReq, mockRes, mockUserRepository } = setup();
    // Simula que o repositório não encontrou nenhum usuário para desativar
    mockUserRepository.desativarAtivar = async () => ({ count: 0 });
    mockReq.body = { id: 999 };
  
    await authController.deleteUser(mockReq, mockRes);
  
    equal(spies.res.status, 404);
    equal(spies.res.json.message, 'Usuário não encontrado');
});