const mongoose = require("mongoose");
const Problem = require("./src/models/problem");

const uri = "mongodb+srv://sohanmaity:2E6CxNeTdenV7OeT@smfirst.uy8augz.mongodb.net/LeetCode";

mongoose.connect(uri)
  .then(async () => {
    console.log("Connected to DB");
    
    // Fetch as lean objects to see exact DB properties
    const problems = await Problem.find({}).lean();
    console.log(`Found ${problems.length} problems`);
    
    for (const p of problems) {
      console.log(`\nProblem: ${p.title}`);
      console.log(`starterCode:`, JSON.stringify(p.starterCode, null, 2));
      console.log(`startCode:`, JSON.stringify(p.startCode, null, 2));
    }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
