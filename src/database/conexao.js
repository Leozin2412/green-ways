import { createPool } from 'mysql2/promise';

// O código procura pela variável DATABASE_URL.
// Se não a encontrar (no seu ambiente local), ele cria uma URL padrão para o seu PC.
const connectionString = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/GreenWaysOFC';

console.log("[INFO] Usando a abordagem DATABASE_URL para conexão.");

const conexao = createPool({
  uri: connectionString,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default conexao;
