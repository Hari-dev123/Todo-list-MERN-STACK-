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





dataRoute.post('/add',add);
dataRoute.get('/get',gets)







export default dataRoute;