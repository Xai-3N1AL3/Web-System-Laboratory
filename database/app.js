const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
        db = getDb();
    } else {
        console.error("Failed to connect to the database", err);
    }
});

// Get all data
app.get('/data', (req, res) => {
    let data = [];

    db.collection('data')
        .find()
        .sort({ type: 1 })
        .forEach(bulb => data.push(bulb))
        .then(() => {
            res.status(200).json(data);
        })
        .catch(() => {
            res.status(500).json({ error: 'Error retrieving data' });
        });
});

// Get data by ID
app.get('/data/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('data')
            .findOne({ _id: new ObjectId(req.params.id) })
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                res.status(500).json({ error: 'Error retrieving data' });
            });
    } else {
        res.status(400).json({ error: 'Invalid ID' });
    }
});

// Insert data
app.post('/data', (req, res) => {
    const bulb = req.body;

    // Check if the required fields are present in the request body
    if (!bulb.name || !bulb.price) {
        return res.status(400).json({ error: 'Missing required fields (e.g., name, price)' });
    }

    db.collection('data')
        .insertOne(bulb)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error inserting data' });
        });
});

app.delete('/data/:id', (req, res) => {
     if (ObjectId.isValid(req.params.id)) {
        db.collection('data')
            .deleteOne({ _id: new ObjectId(req.params.id) })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({ error: 'Error deleting data' });
            })
    } else {
        res.status(400).json({ error: 'Invalid ID' });
    }
    });