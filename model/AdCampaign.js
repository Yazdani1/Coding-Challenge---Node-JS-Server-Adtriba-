const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var adCampaignSchema = mongoose.Schema({
  ad_date: {
    type: Date,
    required: true,
  },

  source: {
    type: String,
    required: true,
  },
  attributed_conversions: {
    type: Number,
    required: true,
  },
  attributed_revenue: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["incrementality", "baseline"],
    default: "incrementality",
  },
  spends: {
    type: Number,
    get: (v) => parseFloat(v).toFixed(2),
    set: (v) => parseFloat(v),
  },
  // spends: {
  //   type: Number,
  //   required: true,
  // },

  partition_id: {
    type: String,
    required: true,
  },

  optimisation_target: {
    type: String,
    enum: ["conversions", "revenue"],
    default: "conversions",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AdCampaignInfo", adCampaignSchema);
