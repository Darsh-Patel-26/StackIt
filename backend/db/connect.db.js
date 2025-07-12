import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(connection);
    }catch(error){
        console.log(`An Error Occured `+error);
        process.exit(1);
    }
}