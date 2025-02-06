import mongoose from "mongoose";

// Define schema
const schema = new mongoose.Schema({
    data: {
        type: [String], // Array of strings
        required: true
    }
});

// Create model
const dataModel = mongoose.model("Data", schema);

console.log("Model created successfully");

export default dataModel; // ✅ Exporting properly
