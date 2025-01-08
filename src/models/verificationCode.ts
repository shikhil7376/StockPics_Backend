import mongoose,{Schema,model} from "mongoose";
import { IverificationCode } from "../types/modelTypes";

const codeSchema = new Schema<IverificationCode>({
    code:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    expiresAt:{
        type:Date,
        default:Date.now,
        index:{expires:'5m'}
    }
},{timestamps:true})


const verificationCode = model<IverificationCode>("VerificationCode",codeSchema)

export default verificationCode