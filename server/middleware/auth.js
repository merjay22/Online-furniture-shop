import jwt from "jsonwebtoken";
import { refreshToken } from "../utils/tokenUtils.js";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("Token expired, attempting to refresh...");
      const newToken = refreshToken(token);
      if (newToken) {
        console.log("Token refreshed successfully");
        res.setHeader("Authorization", `Bearer ${newToken}`);
        req.body.userId = jwt.decode(newToken).id;
        next();
      } else {
        res.json({
          success: false,
          message: "Token expired and could not be refreshed",
        });
      }
    } else {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  }
};

export default authMiddleware;
