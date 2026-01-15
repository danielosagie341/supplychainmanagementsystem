import Product from "../models/product.model";
import User from "../models/user.model";
import { Iproduct } from "../types/interfaces/product.inter";
import { ProductStatus } from "../types/enums/product";
import AppError from "../utils/appError";
import ResponseHelper from "../utils/response";

export default class ProductService {

    static async getAll(): Promise<Iproduct[]> {
        console.log('🔍 Fetching ALL products...');
        const products = await Product.find()
        .populate('category')
        console.log('🎯 Found ALL products:', products.length);
        console.log('📋 ALL Products data:', products.map(p => ({ id: p._id, name: p.name, _user: p._user })));
        return products;
    }

    static async getAllByUser(userId: string): Promise<Iproduct[]> {
        console.log('🔍 Searching for products with userId:', userId);
        
        const products = await Product.find({ _user: userId })
        .populate('category');

        console.log('🎯 Found products:', products.length);
        console.log('📋 Products data:', products.map(p => ({ id: p._id, name: p.name, _user: p._user })));

        return products;
    }

    static async getTotalCount(): Promise<number> {
        const totalCount = await Product.countDocuments()
        return totalCount;
    }

    static async getTotalInStockCount(): Promise<number> {
        const inStockCount = await Product.countDocuments({ 'status': ProductStatus.inStock });
        return inStockCount;
    }

    static async getTotalOutOfStockCount(): Promise<number> {
        const outOfStockCount = await Product.countDocuments({ 'status': ProductStatus.outOfStock });
        return outOfStockCount;
    }

    static async getProductById(id: string): Promise<Iproduct | null> {
        const product = await Product.findById(id)
        .populate('category')
        return product;
    }

    static async createProduct(userId: string, data: Iproduct): Promise<Iproduct | null> {
        console.log('🚀 Creating product with userId:', userId);
        
        const user = await User.findById(userId);

        if (!user) {
          console.log('❌ User not found');
          return null;
        }

        const newProduct = await Product.create({
          ...data,
          _user: userId,
        });

        await newProduct.save();
        
        console.log('✅ Product created:', { id: newProduct._id, name: newProduct.name, _user: newProduct._user });

        user.product.push(newProduct.id)
        await user.save()

        // Return the populated product
        const populatedProduct = await Product.findById(newProduct._id).populate('category');
        return populatedProduct;
    }

    static async updateProduct(productId: string, userId: string, userRole: string, productData: any): Promise<Iproduct | null> {
        const product = await Product.findById(productId);

        if (!product) {
            throw new AppError('Product not found', ResponseHelper.RESOURCE_NOT_FOUND);
        }

        if (product._user.toString() !== userId && userRole !== 'admin') {
            throw new AppError('You are not authorized to perform this action', ResponseHelper.UNAUTHORIZED);
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, productData, {new: true});
        return updatedProduct;
    }

    static async deleteProduct(productId: string, userId: string, userRole: string): Promise<Iproduct | null> {
        const product = await Product.findById(productId);

        if (!product) {
            throw new AppError('Product not found', ResponseHelper.RESOURCE_NOT_FOUND);
        }

        if (product._user.toString() !== userId && userRole !== 'admin') {
            throw new AppError('You are not authorized to perform this action', ResponseHelper.UNAUTHORIZED);
        }
        
        const deletedProduct = await Product.findByIdAndDelete(productId);
        return deletedProduct;
    }
}