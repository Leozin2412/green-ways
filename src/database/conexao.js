// Importamos 'createPool' da versão da biblioteca que suporta Promises
import sql from 'mssql'
const strConnSQLServer = process.env.CONNECTION_STRING

const config = {
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    server:process.env.DB_SERVER,
    database:process.env.DB_BASE,
    port:Number.parseInt(process.env.DB_PORT),
    options:{
        trustServerCertificate:true,
        trustedConnection: false,
        enableArithAbort:true,
        encrypt:false,
    }
}
let pool; // Variável para armazenar o Pool de Conexões

/**
 * Cria ou retorna o Pool de Conexões com o SQL Server.
 * @returns {sql.ConnectionPool} O pool de conexões ativo.
 */
async function conectar() {
    if (pool) {
        // Se o pool já existe, garante que ele não está desconectado
        if (pool.connected) {
             return pool; 
        }
        // Tenta reconectar se o pool existir mas não estiver conectado
        try {
            await pool.connect();
            console.log("Pool de Conexões SQL Server reconectado.");
            return pool;
        } catch (error) {
            if (error.code === 'ETIMEDOUT') {
          console.log("falha na reconexão")
            }
            // Se falhar na reconexão, tenta criar um novo pool abaixo
            pool = null; 
        }
    }
    
    try {
        // Cria um novo pool de conexões
        pool = new sql.ConnectionPool(config);
        
        // Conecta ao SQL Server
        await pool.connect();
        
        console.log("Pool de Conexões SQL Server criado e conectado.");
        return pool;

    } catch (err) {
        console.error('ERRO FATAL: Falha ao estabelecer Pool de Conexões SQL Server:', err.message);
        throw err;
    }
}

/**
 * Executa uma query SQL pura (T-SQL) no Pool de Conexões.
 * @param {string} sqlQuery - A query SQL (T-SQL) a ser executada.
 * @returns {Promise<Array>} Os registros retornados pela consulta.
 */
async function query(sqlQuery) {
    const connectionPool = await conectar();
    
    try {
        const request = connectionPool.request();
        // O método .query() do mssql executa a query T-SQL
        const result = await request.query(sqlQuery);
        
        // Retorna o recordset (dados) para ser consumido pelos Repositórios
        return result.recordset; 
    } catch (err) {
        // Se for um erro de sintaxe T-SQL ou execução, lança o erro
        console.error('Erro ao executar query T-SQL:', sqlQuery.trim().substring(0, 50) + '...', err.message);
        throw err;
    }
}

// --- EXPORTAÇÃO ---
// Exportamos a função 'query' como default para que a importação 'import conexao from "./conexao.js"' funcione,
// e ela poderá ser usada como 'conexao.query()'.
// Alternativamente, você poderia exportar um objeto { query }
export default {
    query,
    // Você pode adicionar outras funções aqui, como .end() para fechar o pool
};