import {Schema,model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
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

const User = model('User',userSchema)

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
    next()
})

export default User