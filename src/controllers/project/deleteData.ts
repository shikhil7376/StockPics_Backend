import asyncErrorHandler from "../../utils/asyncHandler";
import { Request,Response,NextFunction } from "express";
import { BadRequestError, ProjectNotFoundError } from "../../utils/errorTypes";
import ImageModel from "../../models/imageModel";
import { StatusCodes } from "http-status-codes";

export const deleteData = asyncErrorHandler(
    async(req:Request,res:Response,next:NextFunction)=>{
     const { id, userid } = req.params       
     if(!id || !userid){
        throw new BadRequestError("userid and id are required!!")
     }
   const deleteData = await ImageModel.deleteOne({_id:id,userId:userid})
     if(!deleteData.deletedCount){
        throw new ProjectNotFoundError("Item not found or already deleted")
     }        
     return res.status(StatusCodes.OK).json({success:true,message:"Item deleted succesfully"})
    }
)