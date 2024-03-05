const Order = require("../../models/Order");
const Product = require("../../models/Product")
const User=require("../../models/User")
const OrderServices = {
    createOrder: async (userId, orderData) => {
        try {
            // Check if products exist and if there is sufficient quantity
            for (const item of orderData.products) {
                const product = await Product.findById(item.productId);
                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`);
                }
                if (product.stock < item.quantity) {
                    throw new Error(`Insufficient quantity available for product ${product.name}`);
                }
            }
            const order = new Order({
                user: userId,
                products: orderData.products,
                totalAmount: orderData.totalAmount
            });

            // Save the order
            await order.save();
            await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });
            // Update product quantities
            for (const item of orderData.products) {
                const product = await Product.findById(item.productId);
                product.stock -= item.quantity;
                await product.save();
            }

            return order;

        } catch (error) {
            throw error;
        }
    },
    updateStatus:async (orderId,status)=>{
        try {
            const order=await Order.findById(orderId);
            if(!order){
                throw new Error("order not found");
            }
            order.status=status.status;
            await order.save();

            return order;
        } catch (error) {
            throw error
        }
    }
}

module.exports = OrderServices;