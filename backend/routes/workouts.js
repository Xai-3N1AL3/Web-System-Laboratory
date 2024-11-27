const express = require('express')
const Workout = require('../models/workoutModels')

const router = express.Router()

//get all workouts
router.get('/', (req, res) => {
    res.json({mssg : 'My workout'})
})

//get single workout
router.get('/:id', (req, res) => {
    res.json({mssg : 'my single workout'})
})

//post a new workout
router.post('/', async (req, res) => {
    const {title, load, reps} = req.body

    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }catch (error){
        res.status(400).json({error: error.message})
    }
})

//delete workout
router.delete('/:id', (req, res) => {
    res.json({mssg : 'delete a workout'})
})

//update a workout
router.patch('/:id', (req, res) => {
    res.json({mssg : 'update workout'})
})

module.exports = router