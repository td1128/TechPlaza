import stripe from '../../config/stripe.js';
import orderModel from '../../models/orderModel.js';

// const endpointSecret = import.meta.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY
const endpointSecret = "whsec_f7ea6bcbb0645735f753bd53e3691948770dd00ad0a33992e63d2acb27a0c49a"


async function getLineItems(lineItems){
    let ProductItems=[]
    if(lineItems?.data?.length){
        for(let item of lineItems.data){
            const product=await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId
            const productData={
                productId: productId,
                productName: product.name,
                productImage: product.image,
                sellingPrice: item.price_data.unit_amount/100,
                quantity: item.quantity,
                price: item.price_data.unit_amount/100
            }

            ProductItems.push(productData)

        }
    }

    return ProductItems
}


const webhooks=async(request,response)=>{
    const sig = request.headers['stripe-signature'];

    const payloadString=JSON.stringify(request.body)

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret : endpointSecret,
    });

    let event;

    try {
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':

            const session = event.data.object;
            // console.log("sessions",session.id);
            const lineItems= await stripe.checkout.sessions.listLineItems(session.id)

            // console.log("lineItems",lineItems);
            // console.log("total amt",session.amount_total/100);

            const productDetails=await getLineItems(lineItems)

            const orderDetails = {
                productDetails : productDetails,
                email : session.customer_email,
                userId : session.metadata.userId,
                paymentDetails : {
                    paymentId : session.payment_intent,
                    payment_method_type : session.payment_method_types,
                    payment_status : session.payment_status
                },
                shipping_options : session.shipping_options,
                tatalAmount : session.amount_total/100
            }

            const order=await orderModel(orderDetails)
            const saveOrder = await order.save()

            break;
            // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    response.status(200).send();
    
}

export default webhooks;