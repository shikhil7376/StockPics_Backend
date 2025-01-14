import asyncErrorHandler from "../../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import ImageModel from "../../models/imageModel";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../../utils/errorTypes";

export const getData = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userid } = req.query;
    const page = parseInt(req.query.page as string) || 1; // default page is 1
    const limit = parseInt(req.query.limit as string) || 10; // default limit is 10
    
    if (!userid) {
      throw new BadRequestError("user is not found");
    }

    // Get total count of items for pagination info
    const totalCount = await ImageModel.countDocuments({ userId: userid });

    // Fetch data with pagination
    const details = await ImageModel.find({ userId: userid })
      .skip((page - 1) * limit) // Skip records based on current page
      .limit(limit) // Limit the number of records returned
      .sort({ order: 1 }); // Sorting by order as per your original code

    const data = details.map((detail) => ({
      id: detail._id,
      description: detail.description,
      url: detail.url,
      userid: detail.userId,
    }));

    // Return data with pagination info
    return res.status(StatusCodes.OK).json({
      data,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
      },
    });
  }
);
