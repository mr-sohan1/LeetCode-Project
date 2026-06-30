const User = require("./models/user")
const validate = require("./utils/validator")

const register = async (req,res)=>{
    try{
          
        validate(req.body)
       const user =  User.create(req.body)
    }

    catch(err){
        res.status(400).send(err)

    }
}