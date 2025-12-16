const router = require("express").Router();
const {
  getUsers,
  createUser,
  getCurrentUser,
  loginUser,
  updateUser,
} = require("../controllers/users");

router.get("/", getUsers);

router.get("/users/me", getCurrentUser);
router.post("/signup", createUser);
router.post("/signin", loginUser);
router.patch("/users/me", updateUser);

module.exports = router;
