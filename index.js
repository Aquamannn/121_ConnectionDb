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

db.connect((err) => {
    if(err){
        console.log('error connecting to Mysql: ' +err.stack);
        return;
    }
    console.log('Connected t0 Mysql succesfully');
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})