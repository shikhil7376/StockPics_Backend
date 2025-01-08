import {Schema,model} from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from '../types/modelTypes'


const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
    next()
})

const User = model<IUser>('User',userSchema)

export default User