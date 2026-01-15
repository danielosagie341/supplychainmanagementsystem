import { NextFunction, Request, Response } from 'express';
import BlockchainService from '../services/blockchain.service';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import ResponseHelper from '../utils/response';

/**
 * @author
 * @description Create a transaction
 * @route `/api/v1/blockchain/`
 * @access Public
 * @type POST
 */
export const recordTransaction = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {

	} catch (error) {

	}
})

/**
 * @author
 * @description get all blockchain transaction
 * @route `/api/v1/blockchain/`
 * @access Public
 * @type GET
 */
export const getAllTransactions = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const blockchain = await BlockchainService.getAllTransactions(req.user?.id);

        if(!blockchain || blockchain.length === 0) {
            return next(new AppError("blockchain log not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: blockchain,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to get all blockchain data. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description get a blockchain transaction by id
 * @route `/api/v1/blockchain/`
 * @access Public
 * @type GET
 */
export const getTransactionById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const blockchain = await BlockchainService.getTransactionById(req.params.id);

        if(!blockchain) {
            return next(new AppError("blockchain log not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: blockchain,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to get one blockchain data. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description Verify blockchain transaction hash
 * @route `/api/v1/blockchain/`
 * @access Public
 * @type POST
 */
export const verifyTransactionHash = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const hash = await BlockchainService.verifyTransactionHash(req.body.hash);

        if(!hash) {
            return next(new AppError("Hash log not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: hash,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to verify hash. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description Get a blockchain transaction by type
 * @route `/api/v1/blockchain/`
 * @access Public
 * @type GET
 */
export const getTransactionsByType = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})