import { Request, Response,NextFunction } from 'express';
import ImageModel from '../../models/imageModel';
import { BadRequestError } from '../../utils/errorTypes';
import asyncErrorHandler from '../../utils/asyncHandler';
import { StatusCodes } from 'http-status-codes';

export const uploadImage = asyncErrorHandler(
    async(req:Request,res:Response,next:NextFunction)=>{
        const imageData = req.body;
        if (!Array.isArray(imageData) || imageData.length === 0) {
            throw new BadRequestError("Request body must be a non-empty array of images")
          }
          const isValid = imageData.every(
            (img) => img.url && img.description && img.userid
          );
          if (!isValid) {
            throw new Error("Each image object must contain every data")
          }
          const savedImages = await ImageModel.insertMany(
            imageData.map((img) => ({
              url: img.url,
              description: img.description,
              userId: img.userid,
            }))
          );
          return res.status(StatusCodes.CREATED).json({
            message: "Images uploaded successfully.",
            data: savedImages,
          });
    }
)