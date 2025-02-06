import mongoose from 'mongoose';
const  connectDB = async()=>{
      try {
            const con = await mongoose.connect(process.env.URI);
            console.log('DB connected');
            
      } catch (error) {
          console.log(error);
      }
}

export default connectDB;