const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  //handle:
  brand: {
    type: String
  },
  model: {
    type: String
  },
  color: {
    type: String
  },
  year: {
    type: String
  },
  price: {
    type: String
  },
  image_url: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

//Return model with created Schema
module.exports = Car = mongoose.model('cars', CarSchema);
