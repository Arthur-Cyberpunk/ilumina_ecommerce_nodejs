const express = require("express");
const app = express();
const connectToDatabase = require("../database/connect");
const FurnitureModel = require("../models/furniture.model");
const upload = require("../multerConfig/multer");
const cors = require("cors");
const fs = require("fs");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: `${process.env.ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.SECRETKEYACCESS}`,
  region: `${process.env.REGION}`,
});

const s3 = new AWS.S3();

connectToDatabase();

app.use(express.json());
app.use(cors());

app.get("/furnitures", async (req, res) => {
  try {
    const furnitures = await FurnitureModel.find({});
    res.status(200).json(furnitures);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar as imagens." });
  }
});

app.post("/newfurnitures", upload.array("img", 3), async (req, res) => {
  try {
    const {
      categories,
      img,
      name,
      price,
      otherImgs,
      specs,
      texture,
      weight,
      size,
    } = req.body;

    const files = req.files;

    const imageUrls = [];

    for (const file of files) {
      const imageBuffer = fs.readFileSync(file.path);

      const key = `product-images/${Date.now()}-${file.originalname}`;
      const params = {
        Bucket: "imagesiluminaecommerce",
        Key: key,
        Body: imageBuffer,
        ContentType: file.mimetype,
      };

      const data = await s3.upload(params).promise();
      imageUrls.push(data.Location);
    }

    const newProduct = new FurnitureModel({
      categories,
      img: imageUrls,
      name,
      price,
      otherImgs,
      specs,
      texture,
      weight,
      size,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar o produto" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", function () {});
