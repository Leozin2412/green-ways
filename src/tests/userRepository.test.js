import { test } from 'poku';
import { deepStrictEqual as equal, ok as truthy } from 'assert';
import createUserRepository from '../repositories/UserRepository.js';

function setup() {
  const spies = {
    findUnique: null, create: null, update: null, delete: null, updateMany: null
  };

  const mockPrisma = {
    users: {
      findUnique: async (args) => { spies.findUnique = args; return { id: 1 }; },
      create: async (args) => { spies.create = args; return { id: 2, ...args.data }; },
      update: async (args) => { spies.update = args; return { id: args.where.id }; },
      delete: async (args) => { spies.delete = args; return { id: args.where.id }; },
      updateMany: async (args) => { spies.updateMany = args; return { count: 1 }; }
    },
  };

  const userRepository = createUserRepository(mockPrisma);
  return { userRepository, spies };
}

// --- Testes Corrigidos ---

test('getById deve chamar prisma.users.findUnique com o ID correto', async () => {
  const { userRepository, spies } = setup();
  await userRepository.getById(1);
  equal(spies.findUnique.where.id, 1);
});

test('getByEmail deve chamar prisma.users.findUnique com o email correto', async () => {
  const { userRepository, spies } = setup();
  await userRepository.getByEmail('test@test.com');
  equal(spies.findUnique.where.email, 'test@test.com');
});

test('create deve chamar prisma.users.create com os dados corretos', async () => {
    const { userRepository, spies } = setup();
    const newUser = { nome: 'Novo', email: 'novo@email.com', senha: 'hashedPassword' };
    await userRepository.create(newUser);
    equal(spies.create.data, newUser);
});

// CORREÇÃO: Teste alterado para validar a função que realmente existe.
test('desativarAtivar deve chamar prisma.users.updateMany para setar ativo como 0', async () => {
    const { userRepository, spies } = setup();
    const userId = 1;
    await userRepository.desativarAtivar(userId);

    equal(spies.updateMany.where.id, userId);
    equal(spies.updateMany.data.ativo, 0);
});