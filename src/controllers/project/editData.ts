import asyncErrorHandler from "../../utils/asyncHandler";
import { Request,Response,NextFunction } from "express";
import { BadRequestError,ProjectNotFoundError  } from "../../utils/errorTypes";
import ImageModel from "../../models/imageModel";
import { StatusCodes } from "http-status-codes";


export const editData = asyncErrorHandler(
    async(req:Request,res:Response,next:NextFunction)=>{ 
        const { description, url ,id,userid} = req.body; 
        if (!id) {
            throw new BadRequestError("user id is required")
        }
        const updateItem = await ImageModel.findByIdAndUpdate(
            id,
            {description,url,userid},
            { new: true, runValidators: true }
        )
      if(!updateItem){
          throw new ProjectNotFoundError("Item is not found")
      }
       res.status(StatusCodes.OK).json({success:true,message:"data updated succesfully"})
    }
)