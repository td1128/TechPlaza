import orderModel from '../../models/orderModel.js'

const allOrdersController= async (req, res) => {
    try {
        const allOreders = await orderModel.find().sort({createdAt:-1});
        res.json({
            message:"All orders",
            data:allOreders,
            error:false,
            success:true,
        })
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false,
        })
    }
}


export default allOrdersController