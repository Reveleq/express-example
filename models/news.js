const mongoose = require("mongoose");
const newsSchema = new mongoose.Schema({
  title: { type: String, required: [true, "pole tytuł jest wymagane"] },
  description: { type: String, required: [true, "pole tytuł jest wymagane"] },
  created: { type: Date, default: Date.now },
});
module.exports = mongoose.model("News", newsSchema);
