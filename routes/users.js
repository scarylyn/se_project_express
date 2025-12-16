const router = require("express").Router();
const {
  getUsers,
  createUser,
  getCurrentUser,
  loginUser,
  updateUser,
} = require("../controllers/users");
const { auth } = require("../middlewares/auth");

router.get("/", getUsers);

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);

module.exports = router;
