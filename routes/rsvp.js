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
.post('/', async (req,res)=>{
    const rsvp = new Model({
        name: req.body.name,
        email: req.body.email,
        attending: req.body.attending
    })
    try{
        const saveData = rsvp.save()
        res.status(200).json(saveData)
    }catch(err){
     res.status(400).json({message: err.message})
    }
    
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