const express = require("express");
const problemRouter = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware")
const createProblem = require("../controllers/userProblem")

// for admin
problemRouter.post("/create", adminMiddleware , createProblem);

// problemRouter.patch("/:id", updateProblem);

// problemRouter.delete("/:id", deleteProblem);

// // for user

// problemRouter.get("/:id",getProblembById );

// problemRouter.get("/",getAllProblem );

// problemRouter.get("/user",solvedAllProblemByUser);

module.exports = problemRouter ;