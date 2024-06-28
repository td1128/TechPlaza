import permission from "../helpers/permission.js";
import productModel from "../models/productModel.js";

const updateProduct=async(req,res)=> {
    try {
        const sessionUserId=req.userId
        if(!permission(sessionUserId)){
            throw new Error("Permission denied")
        }
        // const productId=req?._id;
        const {_id,...restBody}=req.body
        const updatedProduct=await productModel.findByIdAndUpdate(_id,restBody);
        res.json({
            data:updatedProduct,
            success:true,
            message:"Product updated successfully",
            error:false,
        })
    } catch (error) {
        res.json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export default updateProduct;