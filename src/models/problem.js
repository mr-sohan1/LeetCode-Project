const mongoose = require("mongoose")
const {Schema} = mongoose ;

const problemSchema = new Schema({
    title :{
        type : String,
        required : true,
        trim : true
    },

    difficulty : {
      type : String,
      required : true,
      enum : ["easy","medium","hard"]
    },

     description : {
        type : String,
        required : true,
     },
        tags:{
            type : String,
            required: true,
            enum : ["array","String","dp","linkedList"]
        },
     visibleTextCases : [
        {
            input : {
                type:String,
                required : true
            },
            output:{
                type:String,
                required : true
            }
        }
     ],

     hiddenTextCases : [
        {
            input : {
                type:String,
                required : true
            },
            output:{
                type:String,
                required : true
            }
        }
     ],

     code :[
        {
            language:{
                type: String,
                required : true
            },
            boilerPLate:{
            type: String,
            required : true
            }
        }
     ],

     refferenceSolution :[
        {
            language:{
                type: String,
                required : true
            },
            completeCode:{
            type: String,
            required : true
            }
        }
     ],

     problemCreater :{
        type : Schema.Types.ObjectId,
        ref : "user",
        required : true,
     }

},{
    timestamps: true,
}
);

const Problem = model("problem", problemSchema);
module.exports = Problem;