import addToCartModel from "../../models/cartProductModel.js"

const addToCartProduct = async(req,res)=>{
    try {
        const {productId}=req.body
        const currentUser = req.userId

        const isProductAvailable = await addToCartModel.findOne({
            productId:productId,
            userId:currentUser,
        })
        // console.log("Product available",isProductAvailable)

        if(isProductAvailable){
            return res.json({
                success:false,
                message:"Product already added to cart",
                data:isProductAvailable,
                error:true,
            })
        }

        const payload = {
            productId : productId,
            quantity:1,
            userId : currentUser
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()
        return res.json({
            message:"Product added to cart successfully",
            data:saveProduct,
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

export default addToCartProduct;