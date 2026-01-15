import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import ProductService from '../services/product.service';
import AppError from '../utils/appError';
import ResponseHelper from '../utils/response';
import { cloudinary } from "../config/cloudinary";
import multer from "multer";

/**
 * @author
 * @description Create a product
 * @route `/api/v1/product/`
 * @access Public
 * @type POST
 */
export const createProduct = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {

        // Validate request data using ProductValidator
        // const validationResult = ProductValidator.createProduct(req.body);

        // if (validationResult.error) {
        //     // Validation failed
        //     return next(new AppError(validationResult.error.details[0].message, ResponseHelper.BAD_REQUEST));
        // }

            const newProduct = await ProductService.createProduct(req.user?.id, req.body);

            if (!newProduct) {
                return next(new AppError('Product not found', ResponseHelper.RESOURCE_NOT_FOUND));
            }

            ResponseHelper.sendSuccessResponse(res, {
                message: 'Product created successfully',
                data: newProduct,
                statusCode: ResponseHelper.RESOURCE_CREATED,
            });

    } catch (error) {
        console.error('Error creating product:', error);
        return next(new AppError('An error occurred while trying to create a product. Please try again.', ResponseHelper.INTERNAL_SERVER_ERROR));
    }
})

/**
 * @author
 * @description get all Product
 * @route `/api/v1/product/`
 * @access Public
 * @type POST
 */
export const getAllProducts = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const products = await ProductService.getAll();

        if(!products || products.length === 0) {
            return next(new AppError("Product not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: products,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to get all products. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description get a Product
 * @route `/api/v1/product/`
 * @access Public
 * @type POST
 */
export const getProductById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Product id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const product = await ProductService.getProductById(id);

        if (!product) {
            return next(new AppError("Product not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: product,
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to get your product. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description Get a supplier by id
 * @route `/api/v1/product/`
 * @access Public
 * @type POST
 */
export const getProductsBySupplier = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if(!id) {
            return next(new AppError("Supplier id not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        const products = await ProductService.getAllByUser(id);

        if(!products || products.length === 0) {
            return next(new AppError("Products not found for this supplier", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: products,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to get products for this supplier. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description Update a Product
 * @route `/api/v1/product/`
 * @access Public
 * @type POST
 */
export const updateProduct = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Product id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const updatedProduct = await ProductService.updateProduct(id, req.user.id, req.user.userType, req.body);

        if (!updatedProduct) {
            return next(new AppError("Product not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Product updated successfully",
            data: updatedProduct ,
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to update a product. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description Delete a Product
 * @route `/api/v1/product/`
 * @access Public
 * @type POST
 */
export const deleteProduct = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Product id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const deletedProduct = await ProductService.deleteProduct(id, req.user.id, req.user.userType);

        if (!deletedProduct) {
            return next(new AppError("Product not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Product deleted successfully",
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to delete a product. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})