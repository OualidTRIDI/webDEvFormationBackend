const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;
const RECEPES_FILE = 'recepes.json';
const BOOKS_FILE = 'books.json';

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));


// CRUD endpoints

// Recepes Endpoints

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

// Books Endpoints

// Get all books
app.get('/books', (req, res) => {
    fs.readFile(BOOKS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.json(JSON.parse(data));
    });
});


// Get a single book by ID
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    fs.readFile(BOOKS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        const books = JSON.parse(data);
        const book = books.find(book => book.id === bookId);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    });
});

// Create a new book
app.post('/books', (req, res) => {
    fs.readFile(BOOKS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        const books = JSON.parse(data);
        const newBook = req.body;
        newBook.id = Date.now();
        books.push(newBook);
        fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            res.status(201).json(newBook);
        });
    });
});

// Update a book by ID
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    fs.readFile(BOOKS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        let books = JSON.parse(data);
        const index = books.findIndex(book => book.id === bookId);
        if (index !== -1) {
            books[index] = { ...books[index], ...req.body };
            fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }
                res.json(books[index]);
            });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    });
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    fs.readFile(BOOKS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        let books = JSON.parse(data);
        const index = books.findIndex(book => book.id === bookId);
        if (index !== -1) {
            const deletedBook = books.splice(index, 1);
            fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }
                res.json(deletedBook[0]);
            });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    });
});





// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});