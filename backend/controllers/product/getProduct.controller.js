import productModel from "../../models/productModel.js"

const getProduct=async(req,res)=>{
    try {
        const allProducts = await productModel.find().sort({createdAt:-1});
        res.json({
            message:"All products",
            data:allProducts,
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

export default getProduct;