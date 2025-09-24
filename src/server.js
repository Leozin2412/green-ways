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

// 1. IMPORTAÇÕES DAS FÁBRICAS E DO DB
import createRoutes from "./routes.js"; 
import createPostRepository from "./repositories/postRepository.js";
import createUserRepository from "./repositories/UserRepository.js";
import createPostController from "./controllers/PostController.js";
import createAuthController from "./controllers/AuthControllers.js";
import db from "./database/conexao.js"; 

// 2. MONTAGEM COMPLETA DAS DEPENDÊNCIAS
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
console.log('OBJETO PostController QUE SERÁ ENVIADO PARA AS ROTAS:', postController); 

// 3. CONFIGURAÇÃO E INICIALIZAÇÃO DO APP
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(config.port, config.host, async () => {
    try {
        const conexao = db.getConexao();
        const sql = `
        CREATE DATABASE IF NOT EXISTS \`GreenWaysOFC\` DEFAULT CHARACTER SET utf8;
        USE \`GreenWaysOFC\`;

        -- Tabela users
        CREATE TABLE IF NOT EXISTS \`users\` (
            \`idUsers\` INT(11) NOT NULL AUTO_INCREMENT,
            \`nome\` VARCHAR(50) NOT NULL,
            \`email\` VARCHAR(100) NOT NULL,
            \`senha\` VARCHAR(100) NOT NULL,
            \`foto\` VARCHAR(255) NULL DEFAULT NULL,
            \`permissao\` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
            \`ativo\` TINYINT(4) NOT NULL DEFAULT 1,
            PRIMARY KEY (\`idUsers\`),
            UNIQUE INDEX \`email_UNIQUE\` (\`email\` ASC)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

        -- Tabela post
        CREATE TABLE IF NOT EXISTS \`post\` (
            \`idPost\` VARCHAR(255) NOT NULL,
            \`region\` VARCHAR(100) NOT NULL,
            \`content\` VARCHAR(300) NOT NULL,
            \`createdAt\` DATETIME NOT NULL,
            \`User_idUsers\` INT(11) NOT NULL,
            \`responses\` INT(11) NULL DEFAULT NULL,
            PRIMARY KEY (\`idPost\`),
            CONSTRAINT \`fk_post_user\`
                FOREIGN KEY (\`User_idUsers\`)
                REFERENCES \`users\` (\`idUsers\`)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

        -- Tabela coments
        CREATE TABLE IF NOT EXISTS \`coments\` (
            \`idComents\` INT(11) NOT NULL AUTO_INCREMENT,
            \`content\` VARCHAR(300) NOT NULL,
            \`createdAt\` DATE NOT NULL,
            \`Users_idUsers\` INT(11) NOT NULL,
            \`Post_idPost\` VARCHAR(255) NOT NULL,
            PRIMARY KEY (\`idComents\`),
            CONSTRAINT \`fk_coments_user1\`
                FOREIGN KEY (\`Users_idUsers\`)
                REFERENCES \`users\` (\`idUsers\`)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
            CONSTRAINT \`fk_coments_post1\`
                FOREIGN KEY (\`Post_idPost\`)
                REFERENCES \`post\` (\`idPost\`)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        `;

        await conexao.promise().query(sql);
        console.log('Banco de dados e tabelas verificados/criados com sucesso.');
        console.log(`Servidor rodando em http://${config.host}:${config.port}`);
    } catch (erro) {
        console.error('Erro ao criar banco ou tabelas:', erro);
    }
});