const mongoose = require("mongoose");

const visitorCountSchema = new mongoose.Schema({
  views: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
});

module.exports = mongoose.model("VisitorCount", visitorCountSchema);
