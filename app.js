const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;
const mainRouter = require("./routes/index");

mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "6932a0dd6924da9623826353", // this is the _id of the test user, "Tina Test"
  };
  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log("We are up and running");
});
