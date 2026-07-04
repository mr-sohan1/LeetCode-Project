const express = require("express");
const problemRouter = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware")
const {createProblem, updateProblem} = require("../controllers/userProblem")

// for admin
problemRouter.post("/create", adminMiddleware , createProblem);

problemRouter.put("/update/:id",adminMiddleware , updateProblem);

problemRouter.delete("/delete/:id",adminMiddleware, deleteProblem);

// // for user

// problemRouter.get("/:id",getProblembById );

// problemRouter.get("/",getAllProblem );

// problemRouter.get("/user",solvedAllProblemByUser);

module.exports = problemRouter ;