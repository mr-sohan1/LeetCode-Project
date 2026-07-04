const {getLanguageById, submitBatch, submitToken} = require("../utils/problemUtility");
const Problem = require("../models/problem");
const User=require("../models/user");

const createProblem = async (req, res) => {
  try {
    const {title, description, difficulty, tags, visibleTestCases, hiddenTestCases, starterCode, referenceSolution} = req.body;

    for (const { language, completeCode } of referenceSolution) {
      const languageId = getLanguageById(language);

      if (!languageId) {
        return res.status(400).json({
          message: `Unsupported language: ${language}`,
        });
      }

      const submissions = visibleTestCases.map((testCase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testCase.input,
        expected_output: testCase.output,
      }));

      const submitResult = await submitBatch(submissions);

     
      const resultToken = submitResult.map((result) => result.token);

     
      const testResult = await submitToken(resultToken);

      for (const test of testResult) {
        if (test.status_id !== 3) {
          return res.status(400).json({
            message: `${language} reference solution failed on visible test cases`,
            error: test,
          });
        }
      }
    }

    const problem = await Problem.create({
      title,
      description,
      difficulty,
      tags,
      visibleTestCases,
      hiddenTestCases,
      starterCode,
      referenceSolution,
      problemCreator: req.result._id,
    });
    res.status(201).json({
      message: "Problem created successfully.",
      problem,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create problem.",
      error: err.message,
    });
  }
};

const updateProblem = async (req, res) => {
  const { id } = req.params;

   const { title, description, difficulty, tags, visibleTestCases, hiddenTestCases, starterCode, referenceSolution} = req.body;

  try {
    if (!id) {
      return res.status(400).send("Missing Id...");
    }
    
    const DSAProblem = await Problem.findById(id);
    if (!DSAProblem) {
      return res.status(404).send("Problem not found");
    }

    if (!Array.isArray(referenceSolution) || !Array.isArray(visibleTestCases)) {
      return res
        .status(400)
        .send("referenceSolution and visibleTestCases are required");
    }

    for (const { language, completeCode } of referenceSolution) {
      const languageId = getLanguageById(language);

      if (!languageId) {
        return res.status(400).json({
          message: `Unsupported language: ${language}`,
        });
      }

      const submissions = visibleTestCases.map((testCase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testCase.input,
        expected_output: testCase.output,
      }));

      const submitResult = await submitBatch(submissions);
      const resultToken = submitResult.map((result) => result.token);
      const testResult = await submitToken(resultToken);

      for (const test of testResult) {
        if (test.status_id !== 3) {
          return res.status(400).json({
            message: `${language} reference solution failed on visible test cases`,
            error: test,
          });
        }
      }
    }

    const newProblem = await Problem.findByIdAndUpdate(
      id,
      { ...req.body },
      { runValidators: true, new: true },
    );

    res.status(200).send(newProblem);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};

const deleteProblem = async(req,res)=>{
 const {id}= req.params;
try{
   if(!id){
      return res.status(400).send("Missing Id...");
   }
    const deletedProblem = await Problem.findByIdAndDelete(id);

    if (!deletedProblem) {
      res.status(404).send("Problem not Available...");
    }
    res.status(200).send("deletedProblem");
}

catch (err) {
    res.status(500).send("Error: " + err.message);
  
}

};

const getProblemById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).send("Missing Id...");
    }
    const getProblem = await Problem.findById(id).select(
  "title description difficulty tags visibleTestCases starterCode referenceSolution _id"
);

    if (!getProblem) {
      return res.status(404).send("Problem not Available...");
    }
    res.status(200).send(getProblem);
  } 
   catch (err) {
    res.status(500).send("Error : " + err);
  }
};



