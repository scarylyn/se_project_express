const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;
const mainRouter = require("./routes/index");
const { createUser, login, getCurrentUser } = require("./controllers/users");

mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);
app.get("/users/me", getCurrentUser);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log("We are up and running");
});
