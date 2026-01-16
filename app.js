const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const app = express();
const { PORT = 3001 } = process.env;
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");

mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use(cors());

app.use("/", mainRouter);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("We are up and running!");
});
