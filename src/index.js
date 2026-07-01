const express = require("express");
const app = express();
const main = require("./config/db");
const cookieparser = require("cookie-parser");
const authRouter = require("./routes/userAuth");


require("dotenv").config();

app.use(express.json());
app.use(cookieparser());


app.use("/", authRouter);

main()
.then(()=>{
app.listen(process.env.PORT,()=>{
    console.log("Server is listening at port number "+ process.env.PORT);
})
})
.catch((error)=>console.log("error is occured"));