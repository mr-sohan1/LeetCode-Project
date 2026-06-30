const User = require("./models/user");
const validate = require("./utils/validator");
const bcrypt = require("bcrypt")

const register = async (req,res)=>{
    try{
          
        validate(req.body)
        const {password} = req.body;
        req.body.password = bcrypt.hash(password,10);
       const user =  User.create(req.body)
    }

    catch(err){
        res.status(400).send(err)

    }
}