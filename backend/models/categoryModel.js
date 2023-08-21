const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const CategorySchema = new Schema({
  String: { type: String, required: true },
});

module.exports = mongoose.model('Category', CategorySchema);


