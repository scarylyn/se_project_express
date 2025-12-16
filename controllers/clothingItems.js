const ClothingItem = require("../models/clothingItem");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_DATA });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const user = req.user._id;

  ClothingItem.findById(req.params.itemId)
    .then((item) => {
      if (!item) {
        const err = "DocumentNotFoundError";
        err.name = "DocumentNotFoundError";
        return Promise.reject(err);
      }
      if (item.owner.toString() !== user) {
        const err = "ForbiddenError";
        err.name = "ForbiddenError";
        return Promise.reject(err);
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then(() => res.status(200).send({}))
    .catch((err) => {
      console.error(err);
      if (err.name === "ForbiddenError") {
        return res
          .status(ERROR_CODES.FORBIDDEN)
          .send({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.RESOURCE_NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_DATA });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

const likeItem = (req, res) => {
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
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_DATA });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.RESOURCE_NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_DATA });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

const dislikeItem = (req, res) => {
  const userLikes = req.user._id;
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: userLikes } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_DATA });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.RESOURCE_NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_DATA });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
