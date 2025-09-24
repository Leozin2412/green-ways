import config from "./config.js";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from 'body-parser';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// IMPORTAÇÕES DAS FÁBRICAS E DO DB
import createRoutes from "./routes.js"; 
import createPostRepository from "./repositories/postRepository.js";
import createUserRepository from "./repositories/UserRepository.js";
import createPostController from "./controllers/PostController.js";
import createAuthController from "./controllers/AuthControllers.js";
import db from "./database/conexao.js"; 

// MONTAGEM DAS DEPENDÊNCIAS
const uuid = { v4: uuidv4 };

const postRepository = createPostRepository(db, uuid, fs);
const userRepository = createUserRepository(db);

const postController = createPostController(postRepository);
const authController = createAuthController(
    userRepository, 
    bcrypt, 
    jwt, 
    process.env.SECRET, 
    eval(process.env.TOKEN_EXPIRE)
);

const routes = createRoutes(authController, postController, userRepository);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Função para inicializar o banco do zero
async function initDatabase() {
    try {
        const conexao = db.getConexao();

        // 1️⃣ Deleta o banco se existir
        await conexao.promise().query(`DROP DATABASE IF EXISTS GreenWaysOFC`);

        // 2️⃣ Cria o banco
        await conexao.promise().query(`CREATE DATABASE GreenWaysOFC CHARACTER SET utf8 COLLATE utf8_general_ci`);
        await conexao.promise().query(`USE GreenWaysOFC`);

        // 3️⃣ Cria tabelas na ordem correta
        // Tabela users
        await conexao.promise().query(`
            CREATE TABLE users (
                idUsers INT(11) NOT NULL AUTO_INCREMENT,
                nome VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL,
                senha VARCHAR(100) NOT NULL,
                foto VARCHAR(255) DEFAULT NULL,
                permissao ENUM('user','admin') NOT NULL DEFAULT 'user',
                ativo TINYINT(4) NOT NULL DEFAULT 1,
                PRIMARY KEY (idUsers),
                UNIQUE (email)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
        `);

        // Tabela post
        await conexao.promise().query(`
            CREATE TABLE post (
                idPost VARCHAR(255) NOT NULL,
                region VARCHAR(100) NOT NULL,
                content VARCHAR(300) NOT NULL,
                createdAt DATETIME NOT NULL,
                User_idUsers INT(11) NOT NULL,
                responses INT(11) DEFAULT NULL,
                PRIMARY KEY (idPost),
                FOREIGN KEY (User_idUsers) REFERENCES users(idUsers)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
        `);

        // Tabela coments
        await conexao.promise().query(`
            CREATE TABLE coments (
                idComents INT(11) NOT NULL AUTO_INCREMENT,
                content VARCHAR(300) NOT NULL,
                createdAt DATETIME NOT NULL,
                Users_idUsers INT(11) NOT NULL,
                Post_idPost VARCHAR(255) NOT NULL,
                PRIMARY KEY (idComents),
                FOREIGN KEY (Users_idUsers) REFERENCES users(idUsers)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE,
                FOREIGN KEY (Post_idPost) REFERENCES post(idPost)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
        `);

        console.log('Banco de dados e tabelas criados com sucesso.');
    } catch (erro) {
        console.error('Erro ao criar banco ou tabelas:', erro);
    }
}

// Inicializa o banco e depois sobe o servidor
initDatabase().then(() => {
    app.listen(config.port, config.host, () => {
        console.log(`Servidor rodando em http://${config.host}:${config.port}`);
    });
});
