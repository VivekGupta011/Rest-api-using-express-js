const express=require("express");
// calling this module
const app=express();
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");
const mongoose=require("mongoose");

//this line parse data into json format so that out 'req.body()' can access for further process..
app.use(express.json());

app.use("/users",userRouter);
app.use("/note",noteRouter);

app.get("/",(req,res)=>{
    res.send("Hello Vivekk!")
})

// mongoose.connect("mongodb+srv://viveksite01:ADMIN@cluster0.vqcq9c2.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect("mongodb+srv://vivekguputa789:DB8lkbGtdkywsnrh@cluster0.antxjlu.mongodb.net/?retryWrites=true&w=majority")

.then(()=>{

    app.listen(5000,()=>{
        console.log("Server Started!");
    })
    

})
.catch((error)=>{
    console.log(error);
})
