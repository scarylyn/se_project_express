const router = require("express").Router();
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItems");

// CRUD - Create, Read, Update, Delete

// Create
router.post("/", createItem);

// Read
router.get("/", getItems);

// Update
router.put("/", updateItem);

// Delete
router.delete("/", deleteItem);

module.exports = router;
