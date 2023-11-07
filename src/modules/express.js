const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connectToDatabase = require("../database/connect");

connectToDatabase();

app.use(express.json());

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas

app.get("/categories", async (req, res) => {
  const questions = await QuestionModel.find({});
  const question = questions.reverse();

  res.render("index", { question });
});

app.get("/perguntar", async (req, res) => {
  res.render("perguntar");
});

app.listen(8080, () => {
  console.log("App rodando!");
});
