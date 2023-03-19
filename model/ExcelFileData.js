const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var excelFileDataSchema = mongoose.Schema({
  date: {
    type: String,
  },

  source: {
    type: String,
  },
  attributed_conversions: {
    type: Number,
  },
  attributed_revenue: {
    type: Number,
    },
  type: {
    type: String,
  },
  spends: {
    type: Number,
  },

  partition_id: {
    type: String,
  },

  optimisation_target: {
    type: String,
  },
});

module.exports = mongoose.model("ExcelDataAdCampaign", excelFileDataSchema);
