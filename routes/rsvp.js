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
.post('/', async(req,res)=>{
    const rsvp = req.body;
    const savedRsvp = await saveRsvp(rsvp);

    res.send({
        status: 'success',
        message: 'Your RSVP has been saved.',
      });
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

async function saveRsvp(rsvp) {
    // Connect to the database
    const db = await connectToDatabase();
  
    // Insert the RSVP data into the database
    await db.query('INSERT INTO rsvps (name, email, attending) VALUES (?, ?, ?)', [rsvp.name, rsvp.email, rsvp.attending]);
  
    // Close the database connection
    await db.end();
  }

module.exports = router