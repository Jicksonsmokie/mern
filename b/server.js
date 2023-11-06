const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const config = {
    user: 'jickson',
    password: '123456',
    server: 'JICKSONS-PC',
    database: 'priya',
    options: {
        encrypt: false,
    },
};

async function connectToDatabase() {
    try {
        await sql.connect(config);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

connectToDatabase();

// Create
app.post('/api/create', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;
    const degree = req.body.degree;
    const college = req.body.college;
    try {
        const result = await sql.query(`insert into demo1 values(${id},'${name}',${age},'${degree}','${college}')`);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error reading data from the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Read
app.get('/api/read', async (req, res) => {
    try {
        const result = await sql.query('select * from demo1');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error reading data from the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Read by id
app.get('/api/readid', async (req, res) => {
    const id = req.body.id;
    try {
        const result = await sql.query(`select * from demo1 where id=${id}`);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error reading data from the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update
app.put('/api/update/', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    try {
        const result = await sql.query(`update demo1 set name='${name}' where id=${id}`);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error reading data from the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete
app.delete('/api/delete/', async (req, res) => {
    const id = req.body.id;
    try {
        const result = await sql.query(`delete from demo1 where id=${id}`);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error reading data from the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});