import asyncErrorHandler from "../../utils/asyncHandler";
import { Request,Response,NextFunction } from "express";
import { BadRequestError } from "../../utils/errorTypes";
import User from "../../models/userModel";
import { generateVerificationCode } from "../../utils/codeGenerator";
import verificationCode from "../../models/verificationCode";
import { sendMail } from "../../utils/sendMails";
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt'


export const ResetPasswordOtp = asyncErrorHandler(
    async(req:Request,res:Response,next:NextFunction)=>{
        const {email} = req.body    
        if(!email){
            throw new BadRequestError("Email is required")
        }
      const user = await User.findOne({email})
      if(!user){
        throw new BadRequestError("user is not registered")
      }
      const code = generateVerificationCode()
      await verificationCode.deleteMany({user:user._id})
      await verificationCode.create({
          user:user._id,
          code
      })
        await sendMail(user.email,code)  
           return res.status(StatusCodes.CREATED).json({success:true,message:"Verification mail sent"})
    }
)

export const ResetPassword = asyncErrorHandler(
    async(req:Request,res:Response,next:NextFunction)=>{
       const{email,password} = req.body.data   
       console.log(email,password);
       
      
       
       const SALT_ROUNDS = 10;
       if(!email || !password){
        throw new BadRequestError("both email and password is required")
       }
       const salt = await bcrypt.genSalt(SALT_ROUNDS)
       const hashedPassword = await bcrypt.hash(password,salt)
       const result = await User.updateOne(
        {
          email: email,
        },
        { $set: { password: hashedPassword } }
      );
    if(result.modifiedCount>0){
        res.status(StatusCodes.OK).json({success:true,message:"password changed succesfully!!"})
    }
    
    }
)