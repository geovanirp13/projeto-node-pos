const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  description: String,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }
});

module.exports = mongoose.model('Category', categorySchema);