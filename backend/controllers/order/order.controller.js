import orderModel from "../../models/orderModel.js";

const orderController = async (request,response) => {
    try {
        const userId = request.userId;

        const orderList = await orderModel.find({userId : userId}).sort({createdAt : -1});

        response.json({
            message: "All orders for the user",
            data: orderList,
            success: true
        });
        
    } catch (error) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

export default orderController