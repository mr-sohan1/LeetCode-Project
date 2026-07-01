const User = require("../models/user");
const validate = require("../utils/validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req,res)=>{
    try{
          
        validate(req.body)
        const {password} = req.body;
        req.body.password = await bcrypt.hash(password,10);
       
        const user = await User.create(req.body)

        const token = jwt.sign({id:user._id,emailID: user.emailID},process.env.JWT_KEY, { expiresIn: "7d" })
        res.cookie("token",token,{maxAge:7*3600*1000});
        res.status(200).send("Register Sucessfully");
    }

    catch (err) {
    console.log(err);
    res.status(400).send(err.message);
}
}

// const login = async(req,res)=>{

//     try{
//     const {emailID , password } = req.body ;
//     if(!emailID){
//         throw new Error ("Invalid Credentials")
//     }
//     if(!password){
//          throw new Error ("Invalid Credentials")
//     }
//     const user = await User.findOne({emailID})
//     const ans =  await bcrypt.compare(password,user.password);
//     res.status(200).send(ans);

// }
//   catch (err) {
//     console.log(err);
//     res.status(400).send(err.message);
// }
// }

const login = async (req, res) => {
  try {
    const { emailID, password } = req.body;

    if (!emailID) throw new Error("Invalid Credentials");
    if (!password) throw new Error("Invalid Credentials");

    const user = await User.findOne({ emailID });
    if (!user) throw new Error("Invalid Credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid Credentials");

    const token = jwt.sign(
      { id: user._id, emailID: emailID },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(200).send("Login Successfully....");
  } 
  catch (err) {
    res.status(401).send("Error : " + err.message);
  }
};


module.exports = {register,login};