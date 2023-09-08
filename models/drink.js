const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const drinkSchema = new Schema({
  name: String,
  calories: Number,
  ingredients: [String],
  country: String,
});

module.exports = mongoose.model('Drink', drinkSchema);
