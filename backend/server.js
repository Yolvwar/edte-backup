import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "edte",
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error inside server", Error: err});
        return res.json(result);
    });
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
    });

