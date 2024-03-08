const express = require('express')
const mariadb = require('mariadb')
const app = express()
const port = 3000
const confg = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const pool = mariadb.createPool(confg);

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
`;

async function initDatabase() {
  const connection = await pool.getConnection();
  await connection.query(createTableQuery);
  connection.release();
}

initDatabase();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

async function load(res) {
    try {        
        const row = await pool.query("SELECT COUNT(*) as count FROM people");        
        var id = Number(row[0].count) + 1;
        pool.query("INSERT INTO people (id, name) values (?,?)", [id, "Nome " + id]);

        const pessoas = await pool.query("SELECT id as id, name as name FROM people");

        res.render('index', { pessoas });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao recuperar dados do banco de dados');
    } 
}

app.get('/', async (req, res) => {
    load(res);
})

app.listen(port, () => {
    console.log('Rodando porta ' + port)
})