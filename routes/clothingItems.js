const router = require("express").Router();
const {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);

router.get("/", getItems);

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

router.delete("/:itemId", deleteItem);

router.use((req, res) => {
  if (!res.headersSent) {
    return res.status(404).json({
      message: "Requested resource not found",
    });
  }
});

module.exports = router;
