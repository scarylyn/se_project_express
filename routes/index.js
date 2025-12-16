const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { auth } = require("../middlewares/auth");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const { createUser, loginUser } = require("../controllers/users");

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.use("/users", auth, userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  if (!req.headersSent) {
    return res.status(ERROR_CODES.NOT_FOUND).json({
      message: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
    });
  }
  return res;
});

module.exports = router;
