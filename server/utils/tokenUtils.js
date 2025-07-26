import jwt from "jsonwebtoken";

export const refreshToken = (expiredToken) => {
  try {
    const decoded = jwt.decode(expiredToken);
    const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    return newToken;
  } catch (err) {
    console.error("Error refreshing token:", err);
    return null;
  }
};
