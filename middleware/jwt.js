import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(
      createError(401, "You are not authenticated")
    );
  }
  jwt.verify(
    token,
    process.env.JWT_SEC,
    async (err, payload) => {
      if (err) {
        return next(createError(403, "Token has expired"));
      }
      req.userId = payload.id;

      next();
    }
  );
};
