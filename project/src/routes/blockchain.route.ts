import express from "express";
import {
	recordTransaction,
	getAllTransactions,
	getTransactionById,
	verifyTransactionHash,
	getTransactionsByType
} from "../controllers/blockchain.controller";
import MiddlewareService from "../middlewares/auth.middleware";


const BlochainRoute = express.Router()

BlochainRoute.use(MiddlewareService.protect)

BlochainRoute.get('/all-blochain-log', getAllTransactions)

BlochainRoute.get('/one-blochain-log/:id', getTransactionById);

BlochainRoute.post('/add-blochain-log', recordTransaction);

BlochainRoute.post('/verify-hash/:id', verifyTransactionHash);

BlochainRoute.get('/get-blochain/:id', getTransactionsByType)

export default BlochainRoute;