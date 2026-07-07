const express = require("express");
const problemRouter = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware")
const userMiddleware = require("../middleware/userMiddleware")
const {createProblem, updateProblem,deleteProblem ,getProblemById,getAllProblem,} = require("../controllers/userProblem")

// for admin
problemRouter.post("/create", adminMiddleware , createProblem);

problemRouter.put("/update/:id",adminMiddleware , updateProblem);

problemRouter.delete("/delete/:id",adminMiddleware, deleteProblem);

// for user

problemRouter.get("/problembyid/:id",userMiddleware,getProblemById);

problemRouter.get("/getallproblem",userMiddleware,getAllProblem);

// problemRouter.get("/problemsolvedbyuser",userMiddleware,getAllSolvedProblem);

module.exports = problemRouter ;