const jwt = require("jsonwebtoken");
const User = require('../models/user');
const redisClient = require("../config/redis");

const userMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Token is not present." });
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_KEY);
    } catch (jwtErr) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    const { _id } = payload;
    if (!_id) {
      return res.status(401).json({ message: "Invalid token payload." });
    }

    const result = await User.findById(_id);
    if (!result) {
      return res.status(401).json({ message: "User does not exist." });
    }

    // Check if this token is in the Redis blocklist (i.e., logged out)
    const isBlocked = await redisClient.exists(`token:${token}`);
    if (isBlocked) {
      return res.status(401).json({ message: "Token is blocked, please login again." });
    }

    req.result = result;
    next();
  } catch (err) {
    // Only genuine infrastructure failures (DB down, Redis down, etc.) land here
    console.error("userMiddleware error:", err);
    res.status(503).json({ message: "Service temporarily unavailable." });
  }
};

module.exports = userMiddleware;