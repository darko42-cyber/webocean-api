import bcrypt from "bcrypt";
import SchoolModel from "../models/school.model.js";

import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newSchool = new SchoolModel({
      ...req.body,
      password: hash,
    });
    const token = jwt.sign(
      { id: newSchool._id },
      process.env.JWT_SEC
    );
    const data = await newSchool.save();
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send({
        message: "Successful",
      });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user)
      return next(createError(404, "User not found"));

    const isCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isCorrect)
      return res(400, "Wrong password or username");

    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_SEC
    );

    const { password, ...others } = user._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
      })
      .send({
        data: others,
      });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out");
};
export const loadSchool = async (req, res) => {
  try {
    const school = await SchoolModel.findById(req.userId);
    res.send(school);
  } catch (error) {
    next(createError(500, error.message));
  }
};
