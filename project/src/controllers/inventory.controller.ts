import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import InventoryService from '../services/inventory.service';
import AppError from '../utils/appError';
import ResponseHelper from '../utils/response';


/**
 * @author
 * @description add an inventory item
 * @route `/api/v1/inventory/`
 * @access Public
 * @type POST
 */
export const addInventoryItem = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {

        // Validate request data using ProductValidator
        // const validationResult = ProductValidator.createProduct(req.body);

        // if (validationResult.error) {
        //     // Validation failed
        //     return next(new AppError(validationResult.error.details[0].message, ResponseHelper.BAD_REQUEST));
        // }

            const newInventory = await InventoryService.addInventoryItem(req.user?.id, req.body);

            if (!newInventory) {
                return next(new AppError('Inventory not found', ResponseHelper.RESOURCE_NOT_FOUND));
            }

            ResponseHelper.sendSuccessResponse(res, {
                message: 'Inventory added successfully',
                data: newInventory,
                statusCode: ResponseHelper.RESOURCE_CREATED,
            });

    } catch (error) {
        console.error('Error adding Inventory:', error);
        return next(new AppError('An error occurred while trying to add an inventory. Please try again.', ResponseHelper.INTERNAL_SERVER_ERROR));
    }
})

/**
 * @author
 * @description get all inventories
 * @route `/api/v1/inventory/`
 * @access Public
 * @type POST
 */
export const getAllInventory = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const inventories = await InventoryService.getAll(req.user?.id);

        if(!inventories || inventories.length === 0) {
            return next(new AppError("Inventory not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: inventories,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to get all inventories. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description get an inventory by id
 * @route `/api/v1/inventory/`
 * @access Public
 * @type POST
 */
export const getInventoryById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Inventory id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

		const inventory = await InventoryService.getInventoryById(id);

        if (!inventory) {
            return next(new AppError("Inventory not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
			data: inventory,
			statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to get your inventory. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description Get an inventory by  product id
 * @route `/api/v1/inventory/`
 * @access Public
 * @type POST
 */
export const getInventoryByProduct = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Update an Inventory
 * @route `/api/v1/inventory/`
 * @access Public
 * @type POST
 */
export const updateInventory = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Inventory id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

		const updatedInventory = await InventoryService.updateInventory(id, req.body);

        if (!updatedInventory) {
            return next(new AppError("Inventory not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

		ResponseHelper.sendSuccessResponse(res, {
			message: "Inventory updated successfully",
			data: updatedInventory ,
			statusCode: ResponseHelper.OK
		});

    } catch (error) {
        return next(new AppError("An error occurred while trying to update an inventory. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description Delete an Inventory(admin)
 * @route `/api/v1/inventory/`
 * @access Public
 * @type POST
 */
export const deleteInventory = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Inventory id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const deletedProduct = await InventoryService.deleteInventory(id);

        if (!deletedProduct) {
            return next(new AppError("Inventory not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Inventory deleted successfully",
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to delete an inventory. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})