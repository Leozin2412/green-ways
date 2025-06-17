import config from "./config.js";
import routes from "./routes.js";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import conexao from "./database/conexao.js";

// --- Bloco de Debug (opcional, mas útil) ---
console.log("--- [DEBUG] Verificando Variáveis de Ambiente ---");
console.log(`MYSQLHOST: ${process.env.MYSQLHOST}`);
console.log(`MYSQLUSER: ${process.env.MYSQLUSER}`);
console.log(`MYSQLDATABASE: ${process.env.MYSQLDATABASE}`);
console.log(`PORT (do Railway): ${process.env.PORT}`);
console.log("----------------------------------------------");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function startServer() {
  let bootstrapConnection;
  try {
    console.log("Conectando ao servidor MySQL para verificar o banco de dados...");
    bootstrapConnection = await mysql.createConnection({
      host: process.env.MYSQLHOST || 'localhost',
      user: process.env.MYSQLUSER || 'root',
      password: process.env.MYSQLPASSWORD || '',
      port: process.env.MYSQLPORT || 3306
    });

    await bootstrapConnection.query(`CREATE DATABASE IF NOT EXISTS \`GreenWaysOFC\` DEFAULT CHARACTER SET utf8;`);
    console.log("Banco de dados 'GreenWaysOFC' verificado/criado.");
    
    await bootstrapConnection.end();

    console.log("Conectando ao banco 'GreenWaysOFC' para criar as tabelas...");
    
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
        \`createdAt\` DATETIME NOT NULL,
        \`Users_id\` INT(11) NOT NULL,
        PRIMARY KEY (\`idPost\`),
        CONSTRAINT \`fk_post_user\`
          FOREIGN KEY (\`Users_id\`)
          REFERENCES \`users\` (\`id\`)
          ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    await conexao.query(`
      CREATE TABLE IF NOT EXISTS \`responses\` (
        \`idResponse\` INT(11) NOT NULL AUTO_INCREMENT,
        \`content\` VARCHAR(300) NOT NULL,
        \`createdAt\` DATETIME NOT NULL,
        \`Users_id\` INT(11) NOT NULL,
        \`Post_idPost\` INT(11) NOT NULL,
        PRIMARY KEY (\`idResponse\`),
        CONSTRAINT \`fk_responses_users1\`
          FOREIGN KEY (\`Users_id\`)
          REFERENCES \`users\` (\`id\`)
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT \`fk_responses_post1\`
          FOREIGN KEY (\`Post_idPost\`)
          REFERENCES \`post\` (\`idPost\`)
          ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    console.log("Tabelas verificadas/criadas com sucesso.");
    
    // Inicia o servidor somente após o banco estar 100% pronto
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });

  } catch (erro) { // <-- AQUI COMEÇA O BLOCO CATCH
    console.error('ERRO FATAL AO INICIALIZAR A APLICAÇÃO:', erro);
    
    if (bootstrapConnection) await bootstrapConnection.end();
    
    process.exit(1);
  } // <-- AQUI FECHA O BLOCO CATCH
} // <-- AQUI FECHA A FUNÇÃO startServer

// Inicia todo o processo
startServer();
