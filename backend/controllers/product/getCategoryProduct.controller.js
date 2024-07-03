import productModel from "../../models/productModel.js"


const getCategoryProduct= async(req,res)=>{
    try {
        const productCategory = await productModel.distinct("category")
        // console.log(productCategory)

        //array to store one product from each category
        const productByCategory=[]

        for (let category of productCategory) {
            const product=await productModel.findOne({category}).sort({createdAt:-1})
            if(product){
                productByCategory.push(product)
            }
        }
        res.json({
            data:productByCategory,
            success:true,
            message:"Products fetched successfully by category",
            error:false,
        })
        
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false,
        })
    }
}

export default getCategoryProduct;