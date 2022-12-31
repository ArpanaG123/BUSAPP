const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Bus = require('../models/busModel')

//ADD-BUS
router.post('/add-bus', async(req,res) => {
    try {
        const existingBus = await Bus.findOne({number:req.body.number});
        if(existingBus){
            return res.status(200).send({
                success:false,
                message:"Bus already exists",
            });
        }
        const newBus = new Bus(req.body)
        await newBus.save();
        return res.status(200).send({
            success:true,
            message:"Bus added successfully"

        });
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        })
    }
})

//GET ALL BUSES
router.post('/get-all-buses', authMiddleware , async(req,res) => {
    try {
        const buses = await Bus.find();
        return res.status(200).send({
            success:true,
            message:"Buses fetched successfully",
            data:buses,
        }); 
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message,
        })  
    }
})

//get-bus-by:id
router.post("/get-bus-by-id", authMiddleware , async(req,res) => {
    try {
        const bus = await Bus.findById(req.body._id);
        return res.status(200).send({
            success:true,
            message:"Bus fetched successfully",
            data:bus,
        });
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        });  
    }
})

module.exports = router;