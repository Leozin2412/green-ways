// Importamos 'createPool' da versão da biblioteca que suporta Promises
import { createPool } from 'mysql2/promise';

// Usamos 'createPool', mas atribuímos a uma constante chamada 'conexao'
const conexao = createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'GreenWaysOFC', // Lembre-se de colocar o nome do seu banco aqui
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportamos a constante 'conexao'
export default conexao;
