// Import Mongoose
const mongoose = require('mongoose');

// Define the teddy schema
const teddySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['dog', 'rabbit', 'teddy', 'raccoon', 'cat'],
    required: true
  },
  color: {
    type: String,
    enum: ['pink', 'yellow', 'green'],
    required: true
  },
  accessories: {
    type: String,
    enum: ['pelota', 'computadora','guitarra'],
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
});

// Define the Teddy model
const Teddy = mongoose.model('Teddy', teddySchema);

// Export the model
module.exports = Teddy;
