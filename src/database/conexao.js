import { createPool } from 'mysql2/promise';

// O código agora lê as variáveis que a Railway fornece.
// Se essas variáveis não existirem, ele usa valores padrão para o ambiente local.
const conexao = createPool({
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'greenwaysofc',
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default conexao;