// --- IMPORTAÇÕES ---
import config from "./config.js";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import path from "node:path";
import bodyParser from 'body-parser';
// Importação do PrismaClient (para Repositórios CRUD)
import { PrismaClient } from '@prisma/client'; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Importação do módulo de conexão SQL Puro (para TransactionRepository)
import conexao from './database/conexao.js'; 

// --- IMPORTAÇÃO DAS NOSSAS "FÁBRICAS" ---
import createRoutes from "./routes.js"; 
// Os Repositórios de CRUD recebem apenas o Prisma
import createPostRepository from "./repositories/postRepository.js";
import createUserRepository from "./repositories/UserRepository.js";
// O repositório de Transações receberá a conexão SQL Pura
//;import createTransactionRepository from "./repositories/TransactionRepository.js"; // Novo import

import createPostController from "./controllers/PostController.js";
import createAuthController from "./controllers/AuthControllers.js";
import createAuthMiddleware from "./middlewares/authMiddleware.js";

// --- MONTAGEM DA APLICAÇÃO (INJEÇÃO DE DEPENDÊNCIA) ---
const prisma = new PrismaClient(); // Instância do ORM (CRUD)

// Repositórios que USAM PRISMA:
const postRepository = createPostRepository(prisma);
const userRepository = createUserRepository(prisma);

// Repositório que USA SQL PURO:
//const transactionRepository = createTransactionRepository(conexao); // Injeta a conexão SQL Pura

// Middleware e Controllers - A injeção de dependência garante que eles
// usem o repositório correto (Prisma ou SQL Puro)
const authMiddleware = createAuthMiddleware(userRepository, postRepository);

const postController = createPostController(postRepository);
// NOTA: Se AuthController precisar de TransactionRepository, injete-o aqui.
const authController = createAuthController(
    userRepository, 
    bcrypt, 
    jwt, 
    process.env.SECRET, 
    eval(process.env.TOKEN_EXPIRE)
);

// A variável 'routes' agora é o resultado da nossa fábrica.
// Se as rotas de Transação existirem, adicione transactionRepository aqui:
const routes = createRoutes(authController, postController, userRepository, authMiddleware/* , transactionRepository */);

// --- CONFIGURAÇÃO DO EXPRESS ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(routes); // O app usa as rotas que acabamos de montar
app.use('/uploads', express.static(path.join(__dirname, '../public', 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// --- FUNÇÃO DE INICIALIZAÇÃO ---
async function startServer() {
    try {
        // --- ETAPA CRÍTICA REMOVIDA ---
        // A criação manual de tabelas foi REMOVIDA. O Prisma fará isso.
        
        console.log("Servidor inicializando. Migração de Schema sob responsabilidade do Prisma.");
        
        // 1. Testar a conexão com o Prisma (SQL Server)
        await prisma.$connect();
        console.log("Prisma (SQL Server) conectado com sucesso.");

        // 2. Testar a conexão SQL Pura (mssql/tedious)
        // Isso garante que o pool de conexão do 'conexao.js' esteja pronto
        await conexao.query("SELECT 1 as result"); 
        console.log("Conexão SQL Pura (T-SQL) funcional para Transações.");

        app.listen(config.port, config.host, () => {
          console.log(`🚀 Servidor rodando em http://${config.host}:${config.port}`);
        });

    } catch (error) {
        console.error('ERRO FATAL AO INICIALIZAR A APLICAÇÃO (Verifique o SQL Server, Prisma e a conexão):', error);
        
        // Garante que o PrismaClient seja desconectado em caso de erro
        await prisma.$disconnect();
        
        // Em um projeto real, você precisaria de um método para fechar o pool de conexões do mssql em caso de erro.
        // Se a sua função 'conectar' no conexao.js der erro, ela não cria o pool.
        
        process.exit(1);
    }
}

await startServer();