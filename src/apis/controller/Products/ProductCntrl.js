const ProductServices = require("../../services/product/ProductServices")
const ProductCntrl = {
    createProduct: async (req, res, next) => {
        try {
            const product = await ProductServices.CreateProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getallProducts: async (req, res, next) => {
        try {
            const products = await ProductServices.getallproducts()
            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    },
    getproductbyId: async (req, res, next) => {
        try {
            const productId = req.params.id;
            const product = await ProductServices.getproductbyId(productId)
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    },
    getproductByCategory: async (req, res, next) => {
        try {
            const categoryName = req.params.category;
            const products = await ProductServices.getproductByCategory(categoryName);
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    },
    updateProductById: async (req, res, next) => {
        try {
            const productId = req.params.id;
            const updatedProduct = await ProductServices.updateProductById(productId, req.body);
            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(updatedProduct);
        } catch (error) {
            next(error);
        }
    },
    deleteproductById: async (req, res, next) => {
        try {
            const productId = req.params.id;
            const deleteproduct = await ProductServices.deleteProductById(productId);
            if (!deleteproduct) {
                return res.status(404).json({ message: "Product not found" })
            }
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductCntrl;