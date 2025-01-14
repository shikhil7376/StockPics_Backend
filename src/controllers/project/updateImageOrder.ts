import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import asyncErrorHandler from "../../utils/asyncHandler";
import ImageModel from "../../models/imageModel";

// Update the order of images
export const updateImageOrder = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { reorderedData } = req.body; // Expecting an array of image objects with IDs

        if (!Array.isArray(reorderedData)) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Invalid data. Expected an array of reordered image data." });
        }

        for (let i = 0; i < reorderedData.length; i++) {
            const { id } = reorderedData[i];
            await ImageModel.findByIdAndUpdate(id, { order: i });
        }

        // Use bulkWrite for efficient batch updates

        return res.status(StatusCodes.OK).json({
            message: "Image order updated successfully",
        });
    }
);

export default updateImageOrder;
