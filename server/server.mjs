import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import mariadb from 'mariadb';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

app.use(express.static('client'));

app.get('/ideas', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const rows = await connection.query("SELECT * FROM ideas");
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error occurred while fetching ideas" });
    } finally {
        if (connection) connection.end();
    }
});

app.post('/ideas', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const result = await connection.query("INSERT INTO ideas (title, body) VALUES (?, ?)", [req.body.title, req.body.body]);
        res.json({ message: "Idea added successfully", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred while adding idea" });
    } finally {
        if (connection) connection.end();
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});