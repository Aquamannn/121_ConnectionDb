const express = require('express');
let mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware untuk memproses body permintaan dalam format JSON
app.use(express.json());

// --- Database Connection ---
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3309',
    password: 'CodingItuMenyenangkan29_',
    database: 'mahasiswa', 
});

db.connect((err) => {
    if (err) {
        // Jika koneksi gagal, hentikan aplikasi dan tampilkan error
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL successfully');
});

// --- Root Endpoint ---
app.get('/', (req, res) => {
    res.send('Hello World! Server is running.');
});

// --- API Endpoints ---
// Rute diubah menjadi /api/mahasiswa sesuai dengan pengujian Postman Anda.
// Saya asumsikan nama tabel Anda adalah 'users' dan memiliki kolom 'nama', 'alamat', dan 'agama'.

// 1. GET Method: Mengambil semua data (nama, alamat, agama)
app.get('/api/mahasiswa', (req, res) => {
    // Hanya memilih kolom yang diminta: nama, alamat, agama
    const sql = 'SELECT nama, alamat, agama FROM biodata'; 
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing GET query: ' + err.stack);
            return res.status(500).json({ error: 'Failed to fetch data from database' });
        }
        res.json(results);
    });
});

// 2. POST Method: Menambah data baru (nama, alamat, agama)
app.post('/api/mahasiswa', (req, res) => {
    // Mendapatkan data dari body request
    const { nama, alamat, agama } = req.body; 

    // Validasi dasar
    if (!nama || !alamat || !agama) {
        return res.status(400).json({ error: 'Missing required fields: nama, alamat, or agama' });
    }

    // SQL query untuk memasukkan data
    // PENTING: Menggunakan tanda tanya (?) untuk mencegah SQL Injection
    const sql = 'INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)';
    const values = [nama, alamat, agama];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.stack);
            return res.status(500).json({ error: 'Failed to insert data into database' });
        }
        
        // Respon sukses dengan status 201 (Created)
        res.status(201).json({ 
            message: 'Data added successfully', 
            id: result.insertId, // ID data yang baru dibuat
            data: { nama, alamat, agama }
        });
    });
});

// --- Server Listener ---
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    console.log(`Test GET endpoint: http://localhost:${PORT}/api/mahasiswa`);
});