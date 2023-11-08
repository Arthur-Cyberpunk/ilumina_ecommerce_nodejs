const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connectToDatabase = require("../database/connect");
const CategoriesModel = require("../models/categories.model");
const FurnitureModel = require("../models/furniture.model");

connectToDatabase();

app.use(express.json());

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas

app.get("/", async (req, res) => {
  const categories = await CategoriesModel.find({});

  console.log(categories);

  res.status(201).json(categories);
});

app.post("/newcategories", async (req, res) => {
  try {
    const categories = CategoriesModel.create(req.body);

    res.status(201).json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/newfurnitures", async (req, res) => {
  try {
    const {
      categorie,
      img,
      name,
      price,
      otherImgs,
      specs,
      texture,
      weight,
      size,
    } = req.body; // Suponhamos que você recebe o nome da categoria em vez do ID

    console.log(categorie);

    // Encontre a categoria com base no nome fornecido
    const categoria = await CategoriesModel.findOne({ categories: categorie });

    console.log(categoria);

    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    // Crie o produto usando o ID da categoria recuperado
    const novoProduto = new FurnitureModel({
      categorie: categoria._id,
      img,
      name,
      price,
      otherImgs,
      specs,
      texture,
      weight,
      size,
    });

    // Salve o novo produto no banco de dados
    await novoProduto.save();

    res.status(201).json(novoProduto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar o produto" });
  }
});

app.listen(8080, () => {
  console.log("App rodando!");
});
