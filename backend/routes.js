import express from 'express';
import dataModel from './models/dataModel.js';
import mongoose from 'mongoose';
const dataRoute = express.Router();


// const add = async(req,res)=>{
//     try {
//         const {data} = req.body;
//      const newdata = new dataModel(data)
//      newdata.save();
//     } catch (error) {
//          console.log(error);
//     }
// }

const add = async (req, res) => {
    try {
        const { data } = req.body; // Destructure data from the request body

        if (!data) {
            return res.status(400).json({ message: "Data is required" });
        }

        const newData = new dataModel({ data }); // Pass data in an object
        await newData.save(); // Save to the database
        return res.status(201).json({ success: true, message: "Data added successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Error adding data", error });
    }
};


const gets = async(req,res)=>{
     try {
         const datas = await dataModel.find({});
        return  res.json({success : true,datas});
     } catch (error) {
        return res.json({success : false , error});
     }
}

const dels = async (req, res) => {
    try {
        const { id } = req.params; // Use params instead of body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID format" });
        }

        const deletedData = await dataModel.findByIdAndDelete(id);

        if (!deletedData) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        return res.json({ success: true, message: "Data deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error deleting data", error });
    }
};

const change = async (req, res) => {
    try {
        const { id } = req.params;
        const { newData } = req.body;  // Get new data from request body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID format" });
        }

        const updatedData = await dataModel.findByIdAndUpdate(
            id,
            { data: newData },  // Update the data field
            { new: true }  // Return the updated document
        );

        if (!updatedData) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        return res.json({ success: true, message: "Data updated successfully", updatedData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error updating data", error });
    }
};




dataRoute.post('/add',add);
dataRoute.get('/get',gets)
dataRoute.delete('/del/:id',dels)
dataRoute.put('/chan/:id',change)







export default dataRoute;