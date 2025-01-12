import asyncErrorHandler from "../../utils/asyncHandler";
import { Request,Response,NextFunction } from "express";
import ImageModel from "../../models/imageModel";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../../utils/errorTypes";

export const getData = asyncErrorHandler(
    async (req:Request,res:Response,next:NextFunction)=> {
        const { userid } = req.query;        
         if(!userid){
            throw new BadRequestError("user is not found")
         }
          const details = await ImageModel.find({userId:userid})
          const data = details.map((detail) => ({
            id: detail._id,
            description: detail.description,
            url: detail.url,
            userid: detail.userId,
        }));
           
          return res.status(StatusCodes.OK).json(data)
    }
)