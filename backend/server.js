import express from "express";
import { connectDB } from "./db/connect.db.js";
import { errorHandler } from "./utils/errorHandler.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import questionRouter from './routes/questions.routes.js';
import commentRouter from './routes/comments.routes.js';
import replyRouter from './routes/comments.reqplies.routes.js';
import answerRouter from './routes/answer.routes.js';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/users',userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/comments", commentRouter);
app.use("/api/answers", answerRouter);
app.use("/api/replies", replyRouter);

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