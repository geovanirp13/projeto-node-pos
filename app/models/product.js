const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  // Referenciando a categoria no produto, onde um Produto pertencerá apenas a uma categoria
  //required - obriga o produto a ter alguma categoria
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }
});

module.exports = mongoose.model('Product', productSchema);