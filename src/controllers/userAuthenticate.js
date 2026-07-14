const User = require("../models/user");
const validate = require("../utils/validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

const register = async (req, res) => {
  try {
    validate(req.body);

    const { password } = req.body;

    req.body.password = await bcrypt.hash(password, 10);
    req.body.role = "user";

    const user = await User.create(req.body);

    const token = jwt.sign(
      {
        _id: user._id,
        emailID: user.emailID,
        role: user.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    const reply = {
      firstName: user.firstName,
      emailID: user.emailID,
      _id: user._id,
      role: user.role,
    };

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({
      user: reply,
      message: "Registered Successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { emailID, password } = req.body;

    if (!emailID || !password) {
      throw new Error("Invalid Credentials");
    }

    const user = await User.findOne({ emailID });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        emailID: user.emailID,
        role: user.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    const reply = {
      firstName: user.firstName,
      emailID: user.emailID,
      _id: user._id,
      role: user.role,
    };

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      user: reply,
      message: "Login Successful",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

// Logout
const logout = async (req, res) => {
  try {
// Validate the token
const {token}=req.cookies;


const payload=jwt.decode(token);

await redisClient.set(`token:${token}`,'Blocked');
await redisClient.expireAt(`token:${token}`,payload.exp);

res.cookie("token",null,{expires:new Date(Date.now())});
res.send("Logged out Successfully...")
  } catch (err) {
    res.status(503).send("Error : " + err.message);
  }
};

const adminRegister= async (req,res)=>{
   try {
    validate(req.body);

    const { firstName, emailID, password } = req.body;

    req.body.password = await bcrypt.hash(password, 10);
    
    const user = await User.create(req.body);

    const token = jwt.sign(
      { _id: user._id, emailID: emailID ,role:user.role},
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).send("User Registered Successfully...");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
}

const deleteProfile = async(req,res)=>{
  
    try{
       const userId = req.result._id;
      
    // userSchema delete
    await User.findByIdAndDelete(userId);
    
    res.status(200).send("Deleted Successfully");

    }
    catch(err){
      
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {register,login,logout,adminRegister,deleteProfile};