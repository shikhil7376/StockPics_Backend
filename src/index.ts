import express,{Express,Request,Response,NextFunction} from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToDatabase } from "./config/connectDb";
import userRouter from './routes/userRoute'
import AppError from "./utils/appError";

dotenv.config()

const app:Express = express()
const corsOption = {     
    origin:process.env.CORS,
    method:'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:true}))
app.use(cors(corsOption))

app.use('/api/user',userRouter)

app.use((err:AppError,req:Request,res:Response,next:NextFunction)=>{
    console.error(err);
    res.status(err.statusCode || 500).json({message:err.message})
})

const PORT = process.env.PORT ||3000
const startServer = async():Promise<void>=>{
   try {
    await connectToDatabase()
    app.listen(PORT,()=>{
     console.log(`server running on port${PORT}`);
    })
   } catch (error) {
    console.error("error:",error)
    process.exit(1)
   }
}

startServer()