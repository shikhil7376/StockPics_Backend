import express,{Express,Request,Response,NextFunction} from "express";
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config

const app = express()



app.listen(5000,()=>{
    console.log('server started');
    
})