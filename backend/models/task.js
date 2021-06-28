const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  _id: Number,
  title: String,
  stage: Number
});

module.exports = mongoose.model('Task', taskSchema);
