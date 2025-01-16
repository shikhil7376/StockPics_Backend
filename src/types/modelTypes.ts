import mongoose ,{Schema,model,Document}from "mongoose";


export interface IverificationCode extends Document{
    code:number;
    user:mongoose.Schema.Types.ObjectId,
    expiresAt:Date
}

export interface IUser extends Document{
    _id:mongoose.Schema.Types.ObjectId ;
    name:string;
    email:string;
    password:string;
    isVerified:boolean;
    createAt:Date;
    updatedAt:Date;
    phone:string;
}