
// product.controller.js
import dao from './product.dao' 
// GET /products
exports.getAll = async (req, res) => {
  try {
    const products = await dao.get({});
    res.json(products);
  } catch (err) {
    console.error('getAll error:', err);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
};

// POST /products
exports.create = async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await dao.create(newProduct);
    res.status(201).json(product);
  } catch (err) {
    console.error('create error:', err);
    res.status(400).json({ message: err.message || 'Bad Request' });
  }
};


// PUT /products/:id
exports.update = async (req, res) => {
  try {
    const updatedProduct = {
      name: req.body.name,
      price: req.body.price,
      // add other updatable fields
    };

    const product = await dao.update(
      { _id: req.params.id }, // filter
      updatedProduct,         // plain data (DAO will $set it)
      { new: true, runValidators: true, context: 'query' } // options
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  } catch (err) {
    console.error('update error:', err);
    return res.status(400).json({ message: err.message || 'Bad Request' });
  }
};

exports.update = async (
  query,
  updateData,
  options = { returnDocument: 'after', runValidators: true, context: 'query' }
) => {
  return await Product.updateOneByQuery(query, updateData, options);
};


// DELETE /products/:id
exports.delete = async (req, res) => {
  try {
    const deleted = await dao.delete({ _id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Option A: return deleted doc
    res.json(deleted);
    // Option B (preferred by many APIs):
    // res.status(204).send();
  } catch (err) {
    console.error('delete error:', err);
    res.status(400).json({ message: err.message || 'Bad Request' });
  }
};
