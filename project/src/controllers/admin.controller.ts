import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import ResponseHelper from '../utils/response';
import AdminService from '../services/admin.service';


/**
 * @author
 * @description Create user
 * @route `/api/v1/admin/`
 * @access Public
 * @type POST
 */
export const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    try {


            const newUser = await AdminService.createUser(req.user?.id, req.body);

            if (!newUser) {
                return next(new AppError('User not found', ResponseHelper.RESOURCE_NOT_FOUND));
            }

            ResponseHelper.sendSuccessResponse(res, {
                message: 'User created successfully',
                data: newUser,
                statusCode: ResponseHelper.RESOURCE_CREATED,
            });

    } catch (error) {
        console.error('Error creating a user:', error);
        return next(new AppError('An error occurred while trying to create a user. Please try again.', ResponseHelper.INTERNAL_SERVER_ERROR));
    }
})

/**
 * @author
 * @description get all users
 * @route `/api/v1/user/`
 * @access Public
 * @type POST
 */
export const getAll = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await AdminService.getAll();

        if(!users || users.length === 0) {
            return next(new AppError("User not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: users,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to get all users. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description get a user by id
 * @route `/api/v1/user/`
 * @access Public
 * @type POST
 */
export const getOne = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if(!id) {
            return next(new AppError("User id not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        const user = await AdminService.getOne(id);

        if (!user) {
            return next(new AppError("User not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: user,
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to get a user. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description get all orders (admin only)
 * @route `/api/v1/admin/get-orders`
 * @access Private
 * @type GET
 */
export const getAllAdminOrders = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('🔍 DEBUG - getAllAdminOrders controller called');
        const orders = await AdminService.getAllOrders();
        console.log('🔍 DEBUG - Admin controller received orders count:', orders?.length);

        ResponseHelper.sendSuccessResponse(res, {
            data: orders,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        console.log('🔍 DEBUG - Error in getAllAdminOrders controller:', error);
        return next(new AppError("An error occurred while trying to get all orders. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description Update a User
 * @route `/api/v1/user/`
 * @access Public
 * @type POST
 */
export const updateUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if(!id) {
            return next(new AppError("User id not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        const updatedUser = await AdminService.updateUser(id, req.body);

        if (!updatedUser) {
            return next(new AppError("User not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "User updated successfully",
            data: updatedUser ,
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        console.log(error, "error")
        return next(new AppError("An error occurred while trying to update a user. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description Delete a user(admin)
 * @route `/api/v1/user/`
 * @access Public
 * @type POST
 */
export const deleteUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if(!id) {
            return next(new AppError("User id not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        const deletedUser = await AdminService.deleteUser(id);

        if (!deletedUser) {
            return next(new AppError("User not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "User deleted successfully",
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to delete a user. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})