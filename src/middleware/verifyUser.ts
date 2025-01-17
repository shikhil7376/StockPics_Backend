import { Request,Response,NextFunction } from 'express'
import jwt,{JwtPayload} from 'jsonwebtoken'
import User from '../models/userModel'
import mongoose from 'mongoose'
import { UserUnauthorizedError,InternalServerError } from '../utils/errorTypes'

export type UserPayload = {
    user_id: string; // User ID
    exp: number; // Expiry timestamp
    iat: number; // Issued-at timestamp
};

declare global {
    namespace Express {
      interface Request {
        user?: UserPayload;
      }
    }
  }
  

export async function verifyUser(req:Request,res:Response,next:NextFunction){
    try {
        const token = req.headers.authorization
        
        if(!token){
            throw new UserUnauthorizedError("Token not provided")
        }
        const decodedToken = jwt.verify(token.slice(7),process.env.JWT_SECRET_KEY as string) as UserPayload
        
        // const objectId = new mongoose.Types.ObjectId(decodedToken.id);
        // const userData = await User.findById(objectId);
        // if (!userData) {
        //     throw new UserUnauthorizedError("Invalid token")
        // }
          req.user = decodedToken
       
        next();
    } catch (error) {
        throw new InternalServerError()
    }
}