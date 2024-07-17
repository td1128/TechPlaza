
import stripe from "../../config/stripe.js";
import userModel from "../../models/userModel.js";


const paymentController = async (req, res) => {
    try {
        const { cartItems } = req.body;

        if (!Array.isArray(cartItems)) {
            throw new Error("Invalid array");
        }

        const user = await userModel.findOne({ _id: req.userId });

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1PcVtfRq1rVPtupBwpRFxUe4'
                }
            ],
            customer_email: user.email,
            metadata: {
                userId: req.userId,
            },
            line_items: cartItems.map((item) => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.productName,
                        images: [item.productImage],
                        metadata: {
                            productId: item.productId,
                        }
                    },
                    unit_amount: item.sellingPrice * 100 // Convert to smallest currency unit
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                },
                quantity: item.quantity
            })),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        };

        const session = await stripe.checkout.sessions.create(params);

        res.status(303).json(session);
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};


// const paymentController= async (req,res)=>{
//     try {
//         const { cartItems }=req.body;
//         // console.log("cart items",cartItems);
//         // console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);


//         const user=await userModel.findOne({_id : req.userId})

//         const params={
//             submit_type: 'pay',
//             mode: 'payment',
//             payment_method_types: ['card'],
//             billing_address_collection: 'auto',
//             shipping_options: [
//                 {
//                     shipping_rate:'shr_1PcVtfRq1rVPtupBwpRFxUe4'
//                 }
//             ],
//             customer_email: user.email,
//             line_items: cartItems.map((item,index)=>{
//                 return {
//                     price_data:{
//                         currency: 'inr',
//                         product_data: {
//                             name: item.productId.productName,
//                             images: item.productId.productImage[0],
//                             metadata:{
//                                 productId: item.productId._id,
//                             }
//                         },
//                         unit_amount: item.productId.sellingPrice
//                     },
//                     adjustable_quantity: {
//                         enabled: true,
//                         minimum: 1
//                     },
//                     quantity: item.quantity
//                 }
//             }),
//             // Provide your own domain for success and cancel URLs
//             success_url: `${process.env.FRONTEND_URL}/success`,
//             cancel_url: `${process.env.FRONTEND_URL}/cancel`,
          
//         }
        
//         const session = await stripe.checkout.sessions.create(params)
        
//         res.status(303).json(session)

//     } catch (err) {
//         res.json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// }


export default paymentController