import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (req.userId !== user._id.toString()) {
      return next(
        createError(403, "You delete only your account")
      );
    }

    res.status(200).send("Deleted");
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
