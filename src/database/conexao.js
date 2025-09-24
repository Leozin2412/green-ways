
import { createConnection } from 'mysql2';

function getConexao() {
  const conexao = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'GreenWaysOFC', 
    multipleStatements: true
  });
  return conexao;
}

export default { getConexao };