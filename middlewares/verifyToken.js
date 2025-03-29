import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // if (req.originalUrl.startsWith("/auth")) {
  //   return next();
  // }
  // // 1. Get the token from the Authorization header
  // const token =
  //   req.headers["authorization"] && req.headers["authorization"].split(" ")[1]; // Assuming the token is in the format "Bearer <token>"
  // // Edge case: Token is not provided
  // if (!token) {
  //   return res
  //     .status(403)
  //     .json({ message: "No token provided, authorization denied" });
  // }
  // // 2. Verify the token
  // jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
  //   if (err) {
  //     // Edge case: Token verification failed (invalid token)
  //     return res.status(401).json({ message: "Invalid token" });
  //   }
  //   // 3. If valid, save the decoded data (userId)
  //   const { userId } = decoded;
  //   req.userId = userId;
  //   // 4. Move to the next middleware or route handler
  //   next();
  // });

  req.userId = "67e797f1828abb0447934095";

  next();
};
