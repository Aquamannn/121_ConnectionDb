const express =  require ('express');
let mysql = require ('mysql2');
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

