import asyncErrorHandler from "../../utils/asyncHandler";
import { Request,Response,NextFunction } from "express";
import ImageModel from "../../models/imageModel";
import { StatusCodes } from "http-status-codes";

export const getData = asyncErrorHandler(
    async (req:Request,res:Response,next:NextFunction)=> {
          const data = await ImageModel.find()
          return res.status(StatusCodes.OK).json(data)
    }
)