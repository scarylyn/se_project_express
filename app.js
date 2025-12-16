const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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
app.use(cors());

// The brief says to remove all hard coded _id instances but I couldn't get past the github check
// without this bit of code below, so I'm leaving it here. Specifically it said,
// " The user ID must be set as required in the 'app.js' file. For example: req.user = {
//  _id: "5d8b8592978f8bd833ca8133"
// };"
app.use((req, res, next) => {
  req.user = { _id: "5d8b8592978f8bd833ca8133" };
  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log("We are up and running");
});
