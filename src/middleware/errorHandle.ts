import {Request,Response,NextFunction} from 'express'
import { ErrorHandler } from '../utils/errorTypes'

export const errorHandle = (err:Error | ErrorHandler,req:Request,res:Response,next:NextFunction):any=>{
//    console.error(err.stack,"catch the error from")
//    console.log('hey errors');
   if(err instanceof ErrorHandler ){
      return res.status(err.statusCode).json({
        message:err.message      
      })
   }
   res.status(500).json({
      message:err.message || "Something went wrong"
   })
}