import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Define your Appwrite function
export default async({req, res}) => {

    //const { amount, currency } = req.body;
    const amount = 1000;
    const currency = "usd";

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency
        });

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Handle successful payment
        res.send({ clientSecret: paymentIntent.client_secret });

        return res.json({
            paymentIntent
        });

    } catch (error) {
        // Handle payment failure
        res.send({ status: 'error', message: error.message });
    }
}
