import mongoose  from "mongoose";


export const connectToDatabase =  async()=>{
     try {
          const connectionInstance = await mongoose.connect(process.env.MONGO_ATLAS_URL as string)
          console.log(`\n MogoDB connected ! ! DB HOST: ${connectionInstance.connection.host}`);
     } catch (error:any) {
         console.error('Error connecting to mongodb:',error)
         process.exit(1)
     }
}
