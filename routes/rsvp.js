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
.post('/', async (req, res) => {
    // Get the RSVP data from the request body
    const rsvp = req.body;
  
    // Create a new RSVP model
    const newRsvp = new Model(rsvp);
  
    // Save the RSVP model to the database
    await newRsvp.save();
  
    // Send a response to the client
    res.send({
      status: 'success',
      message: 'Your RSVP has been saved.',
    })
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