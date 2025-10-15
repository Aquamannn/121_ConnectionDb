const express =  require ('express');
let mysql = require ('mysql2');
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3309',
    password: 'CodingItuMenyenangkan29_',
    database: 'mahasiswa',
})

