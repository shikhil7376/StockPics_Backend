import asyncErrorHandler from "../../utils/asyncHandler";
import { Request,Response,NextFunction } from "express";
import { BadRequestError, ProjectNotFoundError } from "../../utils/errorTypes";
import ImageModel from "../../models/imageModel";
import { StatusCodes } from "http-status-codes";

export const deleteData = asyncErrorHandler(
    async(req:Request,res:Response,next:NextFunction)=>{

      if (!req.user) {
         throw new BadRequestError("User is not authenticated");
       }
       const{user_id} = req.user

     const { id } = req.params       
     if(!id || !user_id){
        throw new BadRequestError("userid and id are required!!")
     }
   const deleteData = await ImageModel.deleteOne({_id:id,userId:user_id})
     if(!deleteData.deletedCount){
        throw new ProjectNotFoundError("Item not found or already deleted")
     }        
     return res.status(StatusCodes.OK).json({success:true,message:"Item deleted succesfully"})
    }
)