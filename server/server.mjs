import dotenv from 'dotenv';
import express from 'express';
import mariadb from 'mariadb';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

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

app.get('/testdb', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const rows = await connection.query("SELECT 1 as val");
        connection.end();
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error connecting to the database");
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the idea space app!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});