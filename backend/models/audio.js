const mongoose = require("mongoose");

const audioSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const AudioModel = mongoose.model("audio", audioSchema);

module.exports = {AudioModel}