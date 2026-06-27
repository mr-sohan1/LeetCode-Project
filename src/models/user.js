const {Schema, default: mongoose} = require("mongoose");

const userSchema = new Schema({
    firstname : {
        type : String,
        required :  true,
        minlength : 1,
        maxlength : 15,
        trim : true
    },
    lastname : {
        type : String,
        required : true,
        minlength:1,
        maxlength : 20,
        trim : true
    },
    emailID :{
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        immutable : true
    },
    password: {
        type : String ,
        required : true,
    },
    age :{
        type : Number,
        min : 5,
        max : 80
    },
    role : {
        type : String,
        enum : ["user", "admin"],
        default : "user"
    },
    questionSolved : {
        type:[String]
        },

},{
    timestamps: true
})

const User = mongoose.model("User",userSchema);

module.exports = User ;