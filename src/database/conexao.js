import { createPool } from 'mysql2/promise';

const connectionString = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/GreenWaysOFC';

const conexao = createPool({
  uri: connectionString,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default conexao;
