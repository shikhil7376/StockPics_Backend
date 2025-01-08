import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "../../utils/asyncHandler";
import User from "../../models/userModel";
import verificationCode from "../../models/verificationCode";
import { BadRequestError } from "../../utils/errorTypes";


export const verifyUser = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      
        const {code}:{code:number} = req.body
        if(!code){
            throw new BadRequestError("verification code is required")
        }
        const isExisting = await verificationCode.findOne({code})
        if(!isExisting){
            throw new BadRequestError("Wrong code,Try Again..")
        }
        const updateUser = await User.findByIdAndUpdate(isExisting.user,{isVerified:true})
        if(!updateUser){
            throw new BadRequestError("Account Verification failed")
        }
        return res.status(StatusCodes.ACCEPTED).json({success:true,message:"Account verifications succesfull."})
    }  
)