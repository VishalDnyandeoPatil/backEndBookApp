const express = require("express");
const connection = require("./config/db");
const { routerBook } = require("./routes/books");
require('dotenv').config();
const cors = require("cors");
const PORT = process.env.PORT ; 

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Book App Home Page");
});

app.use("/books", routerBook);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
    console.log("Cannot connect to the database");
  }
});