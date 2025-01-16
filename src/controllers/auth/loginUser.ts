import { Request,Response,NextFunction } from "express";
import asyncErrorHandler from "../../utils/asyncHandler";
import User from "../../models/userModel";
import { generateJwtToken } from "../../utils/jwtToken";
import { BadRequestError,UserUnauthorizedError } from "../../utils/errorTypes";
import bcrypt from 'bcrypt'
import { StatusCodes } from "http-status-codes";


export const loginUser = asyncErrorHandler(
    async(req:Request,res:Response,next:NextFunction)=>{

        const {email,password}:{email:string,password:string} = req.body 
         if(!email || !password){
            throw new BadRequestError("Email and password is required")
         }
         const loggedUser = await User.findOne({email})
         if(!loggedUser){
            throw new UserUnauthorizedError("Invalid credential")
         }
         const comparePassword = await bcrypt.compare(password,loggedUser.password)
         if(!comparePassword){
            throw new UserUnauthorizedError("Wrong password")
         }
        if(!loggedUser.isVerified){
            throw new UserUnauthorizedError("you are not verified,Please Verify...")
        }
        let token = await generateJwtToken(loggedUser._id as any)
        console.log('token',token);
        
        let userData ={
            _id:loggedUser._id,
            name:loggedUser.name,
            email:loggedUser.email
        }
        return res.status(StatusCodes.ACCEPTED).json({
            success:true,
            message:"Logging successfull",
            token,
            userData
        })
    }
)