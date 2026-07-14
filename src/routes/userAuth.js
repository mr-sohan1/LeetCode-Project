const express = require("express");
const authRouter = express.Router();
const { register, login, logout,adminRegister,deleteProfile} = require("../controllers/userAuthenticate");
const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware")

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.post("/logout",userMiddleware,logout);
authRouter.post("/admin/register", adminMiddleware ,adminRegister );
authRouter.delete("/delete",userMiddleware,deleteProfile);
// Check-Auth
authRouter.get('/check', userMiddleware, async (req, res) => {
  try {
const reply = {
  firstName: req.result.firstName,
  emailID: req.result.emailID,
  _id: req.result._id,
  role: req.result.role,
};
    res.status(200).json({
      user: reply,
      message: "Valid User.."
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = authRouter;