import permission from "../helpers/permission.js";
import productModel from "../models/productModel.js"

const uploadProduct=async(req,res)=>{
    try {
        const sessionUserId=req.userId
        if(!permission(sessionUserId)){
            throw new Error("Permission denied")
        }
        const uploadProduct = new productModel(req.body);
        const saveProduct = uploadProduct.save()
        res.status(201).json({
            message:"Product uploaded successfully",
            data:saveProduct,
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

export default uploadProduct;