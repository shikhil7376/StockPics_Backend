import {Request,Response,NextFunction } from "express";
import asyncErrorHandler from "../../utils/asyncHandler";
import { BadRequestError } from "../../utils/errorTypes";
import User from "../../models/userModel";
import { generateVerificationCode } from "../../utils/codeGenerator";
import verificationCode from "../../models/verificationCode";
import { sendMail } from "../../utils/sendMails";
import { StatusCodes } from "http-status-codes";

export const resendOtp = asyncErrorHandler(
  async(req:Request,res:Response,next:NextFunction)=>{
     const {email}:{email:string}  = req.body 
     if(!email){
        throw new BadRequestError("email is required")
     }    
     const userEmail = await User.findOne({email:email})
     if(!userEmail){
        throw new BadRequestError("user not registered")
     }
     const code = generateVerificationCode()
     await verificationCode.deleteMany({user:userEmail._id})
     await verificationCode.create({
        user:userEmail._id,
        code
     })
     await sendMail(userEmail.email,code)
     return res.status(StatusCodes.CREATED).json({success:true,message:"Verification mail send"})
  }
)