import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from '../products/product.module';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly ProductModel: Model<Product> ) {}
    async insertProduct(title: string, description: string, price: number) {
        const newProduct = new this.ProductModel({
             title,
             description,
             price});
        const result = await newProduct.save();
        return result._id;
    }
    async getProducts() {
        const products = await this.ProductModel.find().exec();
        return products.map( product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
        }));
    }
    async getSingleProduct(ProductId: string) {
        const product = await this.findProduct(ProductId);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
        };
    }
    async updateProduct(ProductId: string, title: string, description: string, price: number) {
        const updateProduct = await this.findProduct(ProductId);
        if (title) {
            updateProduct.title = title;
        }
        if (description) {
            updateProduct.description = description;
        }
        if (price) {
            updateProduct.price = price;
        }
        await updateProduct.save();
    }
    async deleteProduct(productId: string) {
        await this.ProductModel.deleteOne({_id: productId}).exec();
    }
    private async findProduct(ProductId: string ): Promise<Product> {
        let product;
        try {
            product = await  this.ProductModel.findById(ProductId);
        } catch (error) {
            throw new NotFoundException('Could not find product');
        }
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return product;
    }
}
