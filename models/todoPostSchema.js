const mongoose = require("mongoose");

const todoPostSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", todoPostSchema);

module.exports = Todo;
