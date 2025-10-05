
import express from 'express';
import { config } from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';

config()

// Connecting to the MongoDB Client
const url = process.env.MONGO_URI;
if (!url) {
    console.error('MONGO_URI is not set in environment');
    process.exit(1);
}
const client = new MongoClient(url);

// App & Database
const dbName = process.env.DB_NAME || 'test'
const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 3000

// Middleware
app.use(express.json())
app.use(cors())


// Get all the passwords
app.get('/', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.find({}).toArray();
        res.json(findResult)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch passwords' })
    }
})

// Save a password
app.post('/', async (req, res) => { 
    try {
        const password = req.body
        if (!password || Object.keys(password).length === 0) {
            return res.status(400).json({ error: 'Request body is empty' })
        }
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const insertResult = await collection.insertOne(password);
        res.status(201).send({success: true, result: insertResult})
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save password' })
    }
})

// Delete a password by id
app.delete('/:id', async (req, res) => { 
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ error: 'Missing id parameter' })
        let _id
        try {
            _id = new ObjectId(id)
        } catch (err) {
            return res.status(400).json({ error: 'Invalid id format' })
        }
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const deleteResult = await collection.deleteOne({ _id });
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Not found' })
        }
        res.json({success: true, result: deleteResult})
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete password' })
    }
})

// Start server after DB connection
let server
async function start() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB')
        server = app.listen(port, () => {
            console.log(`Example app listening on  http://localhost:${port}`)
        })
    } catch (err) {
        console.error('Failed to connect to MongoDB', err)
        process.exit(1)
    }
}

start()

// Graceful shutdown
async function shutdown() {
    console.log('Shutting down...')
    try {
        if (server) server.close()
        await client.close()
        console.log('Closed MongoDB connection')
        process.exit(0)
    } catch (err) {
        console.error('Error during shutdown', err)
        process.exit(1)
    }
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)