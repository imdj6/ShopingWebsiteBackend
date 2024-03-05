const { validateProductData } = require("../../../common/Validate/ValidateProduct");
const Product = require("../../models/Product")
const ProductServices = {
    CreateProduct: async (data) => {
        try {
            const errors = validateProductData(data);;
            if (errors.length > 0) {
                throw new Error(errors.join(", "));
            }

            return await Product.create(data);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getallproducts: async () => {
        try {
            return await Product.find({});
        } catch (error) {
            throw new Error("Could not fetch products");
        }
    },
    getproductbyId: async (id) => {
        try {
            return await Product.findById(id);
        } catch (error) {
            throw new Error("Could not fetch product");
        }
    },
    getproductByCategory: async (categoryName) => {
        try {
            return await Product.find({ category: categoryName });
        } catch (error) {
            throw new Error("Could not fetch products by category");
        }
    },
    updateProductById: async (productId, updateData) =>{
        try {
            return await Product.findByIdAndUpdate(productId, updateData, { new: true });
        } catch (error) {
            throw new Error("Could not update product");
        }
    },
    deleteProductById:async (productId)=>{
        try {
            return await Product.findByIdAndDelete(productId);
        } catch (error) {
           throw new Error("Could not delete the product") 
        }
    }
};

module.exports = ProductServices;