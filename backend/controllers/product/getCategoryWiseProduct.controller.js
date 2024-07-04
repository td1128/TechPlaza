import productModel from "../../models/productModel.js"

const getCategoryWiseProduct=async(req,res)=>{
    try {
        const {category}=req?.body || req?.query
        const product = await productModel.find({category})

        res.json({
            message:"Product fetched successfully by category",
            data:product,
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


export default getCategoryWiseProduct;