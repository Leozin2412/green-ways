// --- IMPORTAÇÕES ---
import config from "./config.js";
import routes from "./routes.js";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from 'body-parser';


import mysql from 'mysql2/promise';


import conexao from "./database/conexao.js";

// --- CONFIGURAÇÃO INICIAL DO EXPRESS ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// --- FUNÇÃO PRINCIPAL DE INICIALIZAÇÃO ---
async function startServer() {
  let bootstrapConnection;
  try {
    // --- ETAPA 1: Conexão temporária para criar o banco de dados ---
    console.log("Conectando ao servidor MySQL para verificar o banco de dados...");
    bootstrapConnection = await mysql.createConnection({
      host: config.host,
      user: 'root', // Assumindo usuário root
      password: ''   // Assumindo senha vazia
    });

    // Executa o comando para criar o banco de dados SE ele não existir
    await bootstrapConnection.query(`CREATE DATABASE IF NOT EXISTS \`GreenWaysOFC\` DEFAULT CHARACTER SET utf8;`);
    console.log("Banco de dados 'GreenWaysOFC' verificado/criado.");
    
    // Fecha a conexão temporária, não precisamos mais dela.
    await bootstrapConnection.end();

    // --- ETAPA 2: Usar o pool principal para criar as tabelas ---
    console.log("Conectando ao banco 'GreenWaysOFC' para criar as tabelas...");
    
    // Agora que o banco existe, o pool 'conexao' funcionará.
    // Usamos o pool para criar as tabelas.
    await conexao.query(`
      CREATE TABLE IF NOT EXISTS \`users\` (
        \`id\` INT(11) NOT NULL AUTO_INCREMENT,
        \`nome\` VARCHAR(50) NOT NULL,
        \`email\` VARCHAR(100) NOT NULL,
        \`senha\` VARCHAR(100) NOT NULL,
        \`foto\` VARCHAR(255) NULL DEFAULT NULL,
        \`acesso\` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
        \`ativo\` TINYINT(4) NOT NULL DEFAULT 1,
        PRIMARY KEY (\`id\`),
        UNIQUE INDEX \`email_UNIQUE\` (\`email\` ASC)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    await conexao.query(`
      CREATE TABLE IF NOT EXISTS \`post\` (
        \`idPost\` INT(11) NOT NULL AUTO_INCREMENT,
        \`region\` VARCHAR(100) NOT NULL,   
        \`content\` VARCHAR(300) NOT NULL,
        \`createdAt\` DATE NOT NULL,
        \`Users_id\` INT(11) NOT NULL,
        \`responses\` INT(11) NULL DEFAULT NULL,
        PRIMARY KEY (\`idPost\`),
        CONSTRAINT \`fk_post_user\`
          FOREIGN KEY (\`Users_id\`)
          REFERENCES \`users\` (\`id\`)
          ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    await conexao.query(`
      CREATE TABLE IF NOT EXISTS \`coments\` (
        \`idComents\` INT(11) NOT NULL AUTO_INCREMENT,
        \`content\` VARCHAR(300) NOT NULL,
        \`createdAt\` DATE NOT NULL,
        \`Users_id\` INT(11) NOT NULL,
        \`Post_idPost\` INT(11) NOT NULL,
        PRIMARY KEY (\`idComents\`),
        CONSTRAINT \`fk_coments_user\`
          FOREIGN KEY (\`Users_id\`)
          REFERENCES \`users\` (\`id\`)
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT \`fk_coments_post\`
          FOREIGN KEY (\`Post_idPost\`)
          REFERENCES \`post\` (\`idPost\`)
          ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    console.log("Tabelas verificadas/criadas com sucesso.");

    
    app.listen(config.port, config.host, () => {
      console.log(`🚀 Servidor rodando em http://${config.host}:${config.port}`);
    });

  } catch (erro) {
    console.error('ERRO FATAL AO INICIALIZAR A APLICAÇÃO:', erro);
    
    if (bootstrapConnection) await bootstrapConnection.end();
    
    process.exit(1);
  }
}


startServer();