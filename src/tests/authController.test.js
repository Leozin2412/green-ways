import { test } from 'poku';
import { deepStrictEqual as equal, ok as truthy } from 'assert';
import createAuthController from '../controllers/AuthControllers.js';

// --- Função de Setup ---
function setup() {
  const spies = {
    res: {
      status: null,
      json: null,
    },
    UserRepository: {
      getById: null,
      login: null,
      create: null,
      getByEmail: null,
      deleteById: null,
    },
    bcrypt: {
      compare: null,
      hash: null,
    },
    jwt: {
      sign: null,
    },
  };

  const mockUserRepository = {
    getById: async (...args) => {
      spies.UserRepository.getById = args;
      return { idUsers: 1, nome: 'Test User', email: 'test@user.com', foto: 'profile.png' };
    },
    login: async (...args) => {
      spies.UserRepository.login = args;
      // Retorna um usuário mockado para o teste de sucesso.
      return { idUsers: 1, nome: 'Test User', senha: 'hashedPassword', permissao: 'admin', ativo: true };
    },
    getByEmail: async (...args) => {
      spies.UserRepository.getByEmail = args;
      return null; // Por padrão, o usuário não existe. Mockaremos para casos específicos.
    },
    create: async (...args) => {
      spies.UserRepository.create = args;
      return { insertId: 2 };
    },
    deleteById: async (...args) => {
      spies.UserRepository.deleteById = args;
      return { affectedRows: 1 };
    },
  };

  const mockBcrypt = {
    compare: async (...args) => {
      spies.bcrypt.compare = args;
      return true; // Por padrão, a senha é válida.
    },
    hash: async (...args) => {
      spies.bcrypt.hash = args;
      return 'hashedPassword'; // Retorna um hash previsível.
    },
  };

  const mockJwt = {
    sign: (...args) => {
      spies.jwt.sign = args;
      return 'mock-token-123';
    },
  };

  const mockReq = {
    body: {},
    query: {},
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

  const SECRET = 'mock-secret';
  const TOKEN_EXPIRE = '1h';

  const authController = createAuthController(mockUserRepository, mockBcrypt, mockJwt, SECRET, TOKEN_EXPIRE);

  return { authController, spies, mockReq, mockRes, mockUserRepository, mockBcrypt, mockJwt };
}

// --- Testes para a função login ---

test('login deve retornar status 200 com token e dados do usuário em caso de sucesso', async () => {
  const { authController, spies, mockReq, mockRes, mockUserRepository } = setup();

  mockUserRepository.login = async () => ({
    idUsers: 'user-123',
    nome: 'Maria Teste',
    senha: 'hashedPassword',
    permissao: 'usuario',
    ativo: 1
  });

  mockReq.body = { email: 'maria@test.com', senha: 'senha123' };

  await authController.login(mockReq, mockRes);

  equal(spies.res.status, 200);
  equal(spies.res.json.ok, true);
  equal(spies.res.json.message, 'Acesso autorizado');
  equal(spies.res.json.token, 'mock-token-123');
  equal(spies.res.json.user.id, 'user-123');
});

test('login deve retornar 401 se o usuário não for encontrado', async () => {
  const { authController, spies, mockReq, mockRes, mockUserRepository } = setup();
  mockUserRepository.login = async () => null;
  mockReq.body = { email: 'inexistente@test.com', senha: 'senha123' };

  await authController.login(mockReq, mockRes);

  equal(spies.res.status, 401);
  equal(spies.res.json.message, 'Usuário não encontrado');
});

test('login deve retornar 401 se a senha estiver incorreta', async () => {
  const { authController, spies, mockReq, mockRes, mockBcrypt } = setup();
  mockBcrypt.compare = async () => false;
  mockReq.body = { email: 'maria@test.com', senha: 'senhaIncorreta' };

  await authController.login(mockReq, mockRes);

  equal(spies.res.status, 401);
  equal(spies.res.json.message, 'Senha inválida');
});

// --- Testes para a função createUser ---

test('createUser deve retornar status 200 e chamar login após criar o usuário', async () => {
  const { authController, spies, mockReq, mockRes, mockUserRepository } = setup();

  mockUserRepository.getByEmail = async () => null;
  mockUserRepository.create = async () => ({ affectedRows: 1 });
  mockUserRepository.login = async () => ({
    idUsers: 'new-user-123',
    nome: 'Novo Usuário',
    senha: 'hashedPassword',
    permissao: 'usuario',
    ativo: 1
  });

  mockReq.body = {
    nome: 'Novo Usuário',
    email: 'novo@test.com',
    senha: 'senha123',
    confirma: 'senha123'
  };

  await authController.createUser(mockReq, mockRes);

  equal(spies.res.status, 200);
  equal(spies.res.json.user.nome, 'Novo Usuário');
});

test('createUser deve retornar 400 se o email já estiver cadastrado', async () => {
  const { authController, spies, mockReq, mockRes, mockUserRepository } = setup();
  mockUserRepository.getByEmail = async () => ({ email: 'existente@test.com' });
  mockReq.body = {
    nome: 'Usuário Existente',
    email: 'existente@test.com',
    senha: 'senha123',
    confirma: 'senha123'
  };

  await authController.createUser(mockReq, mockRes);

  equal(spies.res.status, 400);
  equal(spies.res.json.message, 'E-mail já cadastrado');
});

test('createUser deve retornar 400 se as senhas não coincidirem', async () => {
  const { authController, spies, mockReq, mockRes } = setup();
  mockReq.body = {
    nome: 'Usuário Teste',
    email: 'teste@test.com',
    senha: 'senha123',
    confirma: 'senhaDiferente'
  };

  await authController.createUser(mockReq, mockRes);

  equal(spies.res.status, 400);
  truthy(spies.res.json.message.includes('A senha deve ter no mínimo 8 caracteres e as senhas devem coincidir'));
});

// --- Testes para a função deleteUser ---

test('deleteUser deve retornar 200 em caso de sucesso', async () => {
  const { authController, spies, mockReq, mockRes } = setup();
  mockReq.body = { id: 'user-to-delete-123' };

  await authController.deleteUser(mockReq, mockRes);

  equal(spies.UserRepository.deleteById[0], 'user-to-delete-123');
  equal(spies.res.json.ok, true);
  equal(spies.res.json.message, 'Usuário deletado');
});

test('deleteUser deve retornar 404 se o usuário não for encontrado', async () => {
  const { authController, spies, mockReq, mockRes, mockUserRepository } = setup();
  mockUserRepository.deleteById = async () => ({ affectedRows: 0 }); // Simula que nenhum registro foi afetado
  mockReq.body = { id: 'inexistente' };

  await authController.deleteUser(mockReq, mockRes);

  equal(spies.res.status, 404);
  equal(spies.res.json.message, 'Usuário não encontrado');
});