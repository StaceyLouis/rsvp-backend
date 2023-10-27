const express = require("express")
const router = express.Router()
const Model = require('../models/rsvp')

router.all((req,res, next)=>{
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    next()
})
.get('/', async (req,res)=>{
    const todos = await Model.find({})
    try{
        res.status(200).json(todos)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
.post('/', (req,res)=>{
    const data = new Model({
        name: req.body.name,
        email: req.body.email,
        checked: req.body.checked
    })
    try{
        const saveData = data.save()
        res.status(200).json(saveData)
    }catch(err){
     res.status(400).json({message: err.message})
    }
})
.put("/:id",(req,res)=>{

    const id = req.params.id
    const query = Model.findById(id);
    const update = {
      "$set": {
        "post": req.body.post,
        "checked": req.body.checked
      }
    };
    const options = { returnNewDocument: true };
    
    return Model.findOneAndUpdate(query, update, options)
      .then(updatedDocument => {
        if(updatedDocument) {
          console.log(`Successfully updated document: ${updatedDocument}.`)
        } else {
          console.log("No document matches the provided query.")
        }
        return updatedDocument
      })
      .catch(err => console.error(`Failed to find and update document: ${err}`))
})
.delete("/:id", async (req,res)=>{
    const id = req.params.id
    const todo = await Model.findByIdAndDelete(id)
    try{
    res.status(200).json(todo)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router