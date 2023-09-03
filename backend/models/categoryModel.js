const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const CategorySchema = new Schema({
  name : { type: String, required: true },
  active : {type:Boolean, required:true, default:true}
},{timestamps:true});

module.exports = mongoose.model('Category', CategorySchema);


