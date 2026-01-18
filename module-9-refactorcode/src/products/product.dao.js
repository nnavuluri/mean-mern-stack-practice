
// product.model.js
import mongoose from 'mongoose';
import productSchema from './product.model'

// Replace callback-based statics with async/await (Promise-based).
productSchema.statics = {
  
  async get(query = {}) {
        return await this.find(query).lean();
  },

  
  async createOne(data) {
    const product = new this(data);
    return await product.save(); // returns the saved document
  },

  
  async updateOneByQuery(query, updateData, options = { new: true }) {
    return await this.findOneAndUpdate(query, { $set: updateData }, options).lean();
  },

  



  
  async deleteOneByQuery(query) {
    // findOneAndDelete returns the deleted document
    return await this.findOneAndDelete(query).lean();
  },
};

const Product = mongoose.model('Product', productSchema);
module.exports = Product;