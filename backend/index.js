import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import connectToDB from './config/db.js';
import router from './routes/index.js';

dotenv.config();
// const router=require('./routes')

const app=express();


app.use(cors({
origin:process.env.FRONTEND_URL,
credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router)

const PORT=8080 || process.env.PORT ;
connectToDB().then(()=>{
    app.listen(PORT,()=>{
        console.log('Connected to DB');
        console.log('Server is listening on port',PORT);
    })
})

