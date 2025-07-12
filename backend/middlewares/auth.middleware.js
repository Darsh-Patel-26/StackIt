export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return sendMessage(res, 401, "Authentication token missing");
  }

  try {
    const secret = process.env.JWT_SECRET || "sec3t";
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    return sendMessage(res, 401, "Invalid or expired token");
  }
};
