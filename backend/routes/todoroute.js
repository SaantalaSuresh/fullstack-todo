const express = require("express")

const TODO = require("../modules/moduleSchema")

const route =express.Router();

route.get("/", async(req,res)=>{
        const todos = await TODO.find();
        res.status(200).json(todos)
})


route.post("/save/",async(req,res)=>{
    const {text} = req.body;
    try {
        await TODO.create(req.body)
        console.log("Todo Added Successfully");
        res.status(201).json({message: "Todo added Successfully"});

    }
   catch(e){
    console.log(e.message)
   }
})

route.put("/update/",async(req,res)=>{
    const {_id,text}= req.body;
    try{
        await TODO.findByIdAndUpdate(_id,{text});

        res.status(200).json({message:"Todo Updated Successfully"});
        console.log("todo updated successfully");
    }catch(e){
        console.log(e.message)
    }
})


route.delete("/delete/",async(req,res)=>{
    const {_id} = req.body;
    try{
        await TODO.findByIdAndDelete(_id);
        res.status(200).json({message: "Todo is Deleted Successfully"});
    }catch(e){
        console.log(e.message);
    }
})

module.exports = route