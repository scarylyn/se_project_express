const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../errors/error-index");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      next(err);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      next(err);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const user = req.user._id;

  ClothingItem.findById(req.params.itemId)
    .then((item) => {
      if (!item) {
        const err = new Error("DocumentNotFoundError");
        err.name = "DocumentNotFoundError";
        return Promise.reject(err);
      }
      if (item.owner.toString() !== user) {
        const err = new Error("ForbiddenError");
        err.name = "ForbiddenError";
        return Promise.reject(err);
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then(() => res.status(200).send({ message: "Item has been deleted" }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ForbiddenError") {
        next(new ForbiddenError("Authorization required"));
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Requested resource not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("The data provided is invalid"));
      } else {
        next(err);
      }
    });
};

const likeItem = (req, res, next) => {
  const userLikes = req.user._id;
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: userLikes } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Requested resource not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("The data provided is invalid"));
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
  const userLikes = req.user._id;
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: userLikes } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Requested resource not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("The data provided is invalid"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
