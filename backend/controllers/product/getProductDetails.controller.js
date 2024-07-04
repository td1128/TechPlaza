import productModel from "../../models/productModel.js"

const getProductDetails=async(req,res)=>{
    try {
        const {productId}=req.body
        // console.log(productId)
        const product=await productModel.findById(productId)
        // console.log(product)
        res.json({
            message:"Product fetched successfully",
            data:product,
            error:false,
            success:true,
        })
    } catch (error) {
        res.status(400).json({
            message:error?.message || error,
            error:true,
            success:false,
        })
    }
}


export default getProductDetails;