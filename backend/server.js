import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { connectDB } from "./db/connect.db";
import { errorHandler } from "./utils/errorHandler";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());


app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);
async function startServer(){
    try{
        await connectDB();
        app.listen(PORT,()=>console.log(`Service Running on ${PORT} PORT`));
    }catch(err){
        console.log(err);
        process.exit(0);
    }
}
startServer();