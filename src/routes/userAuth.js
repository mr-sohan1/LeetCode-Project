const express = require("express");
const authRouter = express.Router();
const { register, login} = require("../controllers/userAuthenticate");

authRouter.post("/register",register);
authRouter.post("/login",login);
// authRouter.post("/logout",logout);
// authRouter.get("/profile",profile);

module.exports = authRouter;