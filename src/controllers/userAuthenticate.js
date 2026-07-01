const User = require("./models/user");
const validate = require("./utils/validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req,res)=>{
    try{
          
        validate(req.body)
        const {password} = req.body;
        req.body.password = bcrypt.hash(password,10);
       
        const user = await User.create(req.body)

        const token = jwt.sign({id:user._id,emailID: user.emailID},process.env.JWT_KEY, { expiresIn: "7d" })
        res.cookie("token",token,{maxAge:7*3600*1000});
        res.status(200).send("Register Sucessfully");
    }

    catch(err){
        res.status(400).send(err)

    }
}