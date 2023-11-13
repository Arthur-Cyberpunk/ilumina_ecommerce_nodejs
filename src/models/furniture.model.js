const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
  img: {
    type: Array,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  texture: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

const FurnitureModel = mongoose.model("Furniture", furnitureSchema);

module.exports = FurnitureModel;
