import addToCartModel from "../../models/cartProductModel.js";

const countAddToCartProduct=async(req,res)=>{
    try {
        const userId =req.userId;
        const count= await addToCartModel.countDocuments({
            userId:userId
        })
        res.json({
            message:"Count of products in cart",
            data:count,
            error:false,
            success:true,
        })
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export default countAddToCartProduct;