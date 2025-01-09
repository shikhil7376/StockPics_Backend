import { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "../../utils/asyncHandler";
import { generateVerificationCode } from "../../utils/codeGenerator";
import { sendMail } from "../../utils/sendMails";
import User from "../../models/userModel";
import verificationCode from "../../models/verificationCode";
import { BadRequestError } from "../../utils/errorTypes";
import bcrypt from 'bcrypt'
import { StatusCodes } from "http-status-codes";



const SALT_ROUNDS = 10;

export const registerUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {      
    const { name,email, password } = req.body;
    if (!email || !password|| !name) {
      throw new BadRequestError("All details are necessary");
    }

    const isExisting = await User.findOne({ email });
    if (isExisting) {
      throw new BadRequestError("Email already exists");
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password,salt)
    const userInput = {...req.body,password:hashedPassword}
    const user = await User.create(userInput)
    
    const code = generateVerificationCode()
    await verificationCode.create({
        user:user._id,
        code
    })

    await sendMail(user.email,code)

    return res.status(StatusCodes.CREATED).json({success:true,message:"Verification mail sent"})
  }
);
