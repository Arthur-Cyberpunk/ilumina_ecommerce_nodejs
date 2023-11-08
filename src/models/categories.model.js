const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  categories: {
    type: String,
    required: true,
  },
});

const CategoriesModel = mongoose.model("Categories", categoriesSchema);

module.exports = CategoriesModel;
