import {Request,Response,NextFunction} from 'express'

export const errorHandle = (err:Error,req:Request,res:Response,next:NextFunction)=>{
   console.error(err.stack,"catch the error from")
   res.status(500).json({
    errors:[{message:err.message || "Something went wrong"}]
   })
}