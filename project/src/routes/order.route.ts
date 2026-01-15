import express from "express";
import {
	createOrder,
	getAllOrders,
	getOrderById,
	updateOrderStatus,
	deleteOrder
} from "../controllers/order.controller";
import MiddlewareService from "../middlewares/auth.middleware";


const OrderRouter = express.Router()

OrderRouter.use(MiddlewareService.protect)

OrderRouter.get('/all-orders', getAllOrders)

OrderRouter.get('/one-order/:id', getOrderById);

OrderRouter.post('/create-order', createOrder);

OrderRouter.patch('/update-order/:id', updateOrderStatus);

OrderRouter.delete('/delete-order/:id', deleteOrder)

export default OrderRouter;