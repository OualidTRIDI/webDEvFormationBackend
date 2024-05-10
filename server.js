const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const cors = require('cors');


const app = express();
const PORT = 3000;
const RECEPES_FILE = 'recepes.json';

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));


// CRUD endpoints

// Get all recepes
app.get('/recepes', (req, res) => {
    fs.readFile(RECEPES_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.json(JSON.parse(data));
    });
});


// Get a single recepe by ID
app.get('/recepes/:id', (req, res) => {
    const recepeId = parseInt(req.params.id);
    fs.readFile(RECEPES_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        const recepes = JSON.parse(data);
        const recepe = recepes.find(recepe => recepe.id === recepeId);
        if (recepe) {
            res.json(recepe);
        } else {
            res.status(404).json({ message: 'Recepe not found' });
        }
    });
});

// Create a new recepe
app.post('/recepes', (req, res) => {
    fs.readFile(RECEPES_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        const recepes = JSON.parse(data);
        const newRecepe = req.body;
        newRecepe.id = Date.now();
        recepes.push(newRecepe);
        fs.writeFile(RECEPES_FILE, JSON.stringify(recepes, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            res.status(201).json(newRecepe);
        });
    });
});

// Update a recepe by ID
app.put('/recepes/:id', (req, res) => {
    const recepeId = parseInt(req.params.id);
    fs.readFile(RECEPES_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        let recepes = JSON.parse(data);
        const index = recepes.findIndex(recepe => recepe.id === recepeId);
        if (index !== -1) {
            recepes[index] = { ...recepes[index], ...req.body };
            fs.writeFile(RECEPES_FILE, JSON.stringify(recepes, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }
                res.json(recepes[index]);
            });
        } else {
            res.status(404).json({ message: 'Recepe not found' });
        }
    });
});

// Delete a recepe by ID
app.delete('/recepes/:id', (req, res) => {
    const recepeId = parseInt(req.params.id);
    fs.readFile(RECEPES_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        let recepes = JSON.parse(data);
        const index = recepes.findIndex(recepe => recepe.id === recepeId);
        if (index !== -1) {
            const deletedRecepe = recepes.splice(index, 1);
            fs.writeFile(RECEPES_FILE, JSON.stringify(recepes, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }
                res.json(deletedRecepe[0]);
            });
        } else {
            res.status(404).json({ message: 'Recepe not found' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});