const router = require("express").Router();
const {
  getUsers,
  createUser,
  getCurrentUser,
  login,
} = require("../controllers/users");

// router.get("/", getUsers);

router.get("/users/me", getCurrentUser);
router.post("/signup", createUser);
router.post("/signin", login);

module.exports = router;
