import express from "express";
import {
    createUser,
    getAll,
    getAllAdminOrders,
    getOne,
    updateUser,
    deleteUser
} from "../controllers/admin.controller";
import MiddlewareService from "../middlewares/auth.middleware";

const AdminRouter = express.Router()

AdminRouter.use(MiddlewareService.protect)

AdminRouter.get('/get-users', getAll)

AdminRouter.get('/get-orders', getAllAdminOrders)

AdminRouter.get('/one-user/:id', getOne);

AdminRouter.post('/create-user', createUser);

AdminRouter.patch('/update-user/:id', updateUser);

AdminRouter.delete('/delete-user/:id', deleteUser)

export default AdminRouter;