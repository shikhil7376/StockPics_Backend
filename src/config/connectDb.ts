import mongoose  from "mongoose";

export const connectToDatabase =  async()=>{
     try {
          await mongoose.connect(process.env.MONGO_URI as string)
     } catch (error:any) {
         console.error('Error connecting to mongodb:',error)
         process.exit(1)
     }
}