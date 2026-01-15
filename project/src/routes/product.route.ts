import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getProductsBySupplier,
    updateProduct
} from "../controllers/product.controller";
import MiddlewareService from "../middlewares/auth.middleware";


const ProductRouter = express.Router()

ProductRouter.use(MiddlewareService.protect)

ProductRouter.get('/all-products', getAllProducts)

ProductRouter.get('/one-product/:id', getProductById);

ProductRouter.get('/supplier-products/:id', getProductsBySupplier);

ProductRouter.post('/create-product', createProduct);

ProductRouter.patch('/update-product/:id', updateProduct);

ProductRouter.delete('/delete-product/:id', deleteProduct)

export default ProductRouter;