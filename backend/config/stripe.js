import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PcVTaRq1rVPtupBQsdLsviyw77ndHwJH6v8f5ZLx4MWL981wZvHQf3wwqDvu5ovrfHCUfrn5BNDZUXv6v3zDhpB00lKZjnhbA');
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;