import asyncErrorHandler from "../../utils/asyncHandler";
import { Request,Response,NextFunction } from "express";
import { BadRequestError } from "../../utils/errorTypes";
import User from "../../models/userModel";
import { generateVerificationCode } from "../../utils/codeGenerator";
import verificationCode from "../../models/verificationCode";
import { sendMail } from "../../utils/sendMails";
import { StatusCodes } from "http-status-codes";


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
      await verificationCode.create({
          user:user._id,
          code
      })
        await sendMail(user.email,code)  
           return res.status(StatusCodes.CREATED).json({success:true,message:"Verification mail sent"})
    }
)

