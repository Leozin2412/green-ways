import config from "./config.js";
import routes from "./routes.js";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from 'body-parser';
import conexao from "./database/conexao.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(config.port, config.host, async () => {
    try {
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
            UNIQUE INDEX \`email_UNIQUE\` (\`email\` ASC),
            UNIQUE INDEX \`foto_UNIQUE\` (\`foto\` ASC)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

        -- Tabela post
        CREATE TABLE IF NOT EXISTS \`post\` (
            \`idPost\` INT(11) NOT NULL AUTO_INCREMENT,
            \`region\` VARCHAR(100) NOT NULL,
            \`content\` VARCHAR(300) NOT NULL,
            \`createdAt\` DATE NOT NULL,
            \`Users_idUsers\` INT(11) NOT NULL,
            \`responses\` INT(11) NULL DEFAULT NULL,
            PRIMARY KEY (\`idPost\`),
            CONSTRAINT \`fk_post_user\`
                FOREIGN KEY (\`Users_idUsers\`)
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
            \`Post_idPost\` INT(11) NOT NULL,
            PRIMARY KEY (\`idComents\`),
            CONSTRAINT \`fk_coments_user\`
                FOREIGN KEY (\`Users_idUsers\`)
                REFERENCES \`users\` (\`idUsers\`)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
            CONSTRAINT \`fk_coments_post\`
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
