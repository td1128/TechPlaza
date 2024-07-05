import addToCartModel from "../../models/cartProductModel.js";

const addToCartView = async(req,res)=>{
    try {
        const currentUser=req.userId;
        const cartProducts = await addToCartModel.find({ 
            userId:currentUser 
        }).populate("productId")

        res.json({
            message:"All products in cart",
            data:cartProducts,
            error:false,
            success:true
        })

    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export default addToCartView;