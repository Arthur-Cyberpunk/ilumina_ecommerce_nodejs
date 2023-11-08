const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connectToDatabase = require("../database/connect");
const CategoriesModel = require("../models/categories.model");
const FurnitureModel = require("../models/furniture.model");
const upload = require("../multerConfig/multer");

connectToDatabase();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/categories", async (req, res) => {
  const categories = await CategoriesModel.find({});

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

app.get("/furnitures", async (req, res) => {
  const furnitures = await FurnitureModel.find({});

  res.status(201).json(furnitures);
});

app.post("/newfurnitures/upload", upload.array("img", 3), async (req, res) => {
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

    const image = req.files;

    const imagesUrls = [];

    image.forEach((images) => {
      if (images.path) {
        imagesUrls.push(images.path);
      }
    });

    // Encontre a categoria com base no nome fornecido
    const categoria = await CategoriesModel.findOne({ categories: categorie });

    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    // Crie o produto usando o ID da categoria recuperado
    const newProduct = new FurnitureModel({
      categorie: categoria._id,
      img: imagesUrls,
      name,
      price,
      otherImgs,
      specs,
      texture,
      weight,
      size,
    });

    // Salve o novo produto no banco de dados
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar o produto" });
  }
});

// app.post("/upload", upload.single("file"), (req, res) => {
//   try {
//     res.status(201).json(req.file.filename);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

app.listen(8080, () => {
  console.log("App rodando!");
});
