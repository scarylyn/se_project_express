const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItems");

router.use("/", userRouter);
router.use("/users", userRouter);
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
