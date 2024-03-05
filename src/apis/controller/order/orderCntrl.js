const OrderServices = require("../../services/order/orderServices");

const orderCntrl = {
    createOrder: async (req, res, next) => {
        try {
            try {
                const userId = req.user._id;
                const orderData = req.body;
                const order = await OrderServices.createOrder(userId, orderData);

                res.status(201).json({ message: 'Order created successfully', order });
            } catch (error) {
                next(error);
            }
        } catch (error) {

        }
    },
    updateStatus:async (req,res,next)=>{
        try {
            const orderId=req.params.orderid;
            const status=req.body;

            const updateorder=await OrderServices.updateStatus(orderId,status);
            res.status(200).json({ message: 'Order status updated successfully', order: updateorder });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = orderCntrl