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
router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, updateUser);

module.exports = router;
