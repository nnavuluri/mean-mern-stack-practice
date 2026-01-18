
// productController.js
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

const dburl = 'mongodb://localhost:27017';
let client;
let db;

// initialize connection once
async function initDb() {
  if (db) return db; // already initialized
  client = new MongoClient(dburl, { /* optional options */ });
  await client.connect();                 // wait for connection
  db = client.db('nagdb');                // set db
  return db;
}

// Middleware to ensure DB is ready before handling any route
async function ensureDb(req, res, next) {
  try {
    await initDb();
    next();
  } catch (err) {
    console.error('DB init failed:', err);
    res.status(503).json({ error: 'Database not initialized' });
  }
}

router.use(ensureDb);

// GET /productapi/products
router.get('/products', async (req, res) => {
  try {
    const products = await db.collection('products').find({}).toArray();
    console.log('Fetched products:', products);
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST /productapi/product
router.post('/product', async (req, res) => {
  try {
    const product = req.body;

    if (!product || typeof product !== 'object') {
      return res.status(400).json({ error: 'Invalid product payload' });
    }

    const result = await db.collection('products').insertOne({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).json({ message: 'Product created', id: result.insertedId });
  } catch (err) {
    console.error('Error inserting product:', err);
    res.status(500).json({ error: 'Failed to insert product' });
  }
});

// GET /productapi/product/:id
router.get('/product/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const result = await db.collection('products').findOne({ _id: new ObjectId(id) });
    if (!result) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /productapi/updateproduct/:id
router.put('/updateproduct/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    // Whitelist updatable fields
    const allowed = ['name', 'price', 'category', 'description', 'stock', 'status'];
    const payload = {};
    for (const key of allowed) {
      if (key in req.body) payload[key] = req.body[key];
    }

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    // Add/update timestamp
    payload.updatedAt = new Date();

    const result = await db.collection('products').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: payload },
      { returnDocument: 'after' } // returns the document after update
    );

    // Guard against null result OR null value
    if (!result || !result.value) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product updated', product: result.value });
  } catch (err) {
    console.error('Error updating product:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /productapi/deleteproduct/:id
router.delete('/deleteproduct/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate ObjectId
    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const result = await db.collection('products').deleteOne({ _id: new ObjectId(productId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    console.log('Deleting product with ID:', productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;