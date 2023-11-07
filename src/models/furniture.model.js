const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  otherImgs: {
    type: String,
    required: true,
  },
  specs: {
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
