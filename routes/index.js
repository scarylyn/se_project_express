const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { auth } = require("../middlewares/auth");
const { createUser, loginUser } = require("../controllers/users");

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.use("/users", auth, userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  if (!req.headersSent) {
    return res.status(404).json({
      message: "Requested resource not found",
    });
  }
  return res;
});

module.exports = router;
