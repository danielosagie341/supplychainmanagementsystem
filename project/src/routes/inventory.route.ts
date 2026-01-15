import express from "express";
import {
	addInventoryItem,
	getAllInventory,
	getInventoryById,
	updateInventory,
	deleteInventory
} from "../controllers/inventory.controller";
import MiddlewareService from "../middlewares/auth.middleware";


const InventoryRoute = express.Router()

InventoryRoute.use(MiddlewareService.protect)

InventoryRoute.get('/all-inventories', getAllInventory)

InventoryRoute.get('/one-inventory/:id', getInventoryById);

InventoryRoute.post('/add-inventory', addInventoryItem);

InventoryRoute.patch('/update-inventory/:id', updateInventory);

InventoryRoute.delete('/delete-inventory/:id', deleteInventory)

export default InventoryRoute;