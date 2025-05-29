import { createConnection } from 'mysql2';

const conexao = createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  multipleStatements: true  // Permite executar várias queries em uma string só
});

export default conexao;
