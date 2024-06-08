import { Client } from 'node-appwrite';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// It's executed each time we get a request
export default async({ req, res, log, error }) => {

    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if(req.method === 'OPTIONS') {
        // Preflight response for CORS
        res.send('', 204, headers);
    }

    if(req.method === 'POST') {
        const body = req.body;

        // Process the request body here
        log(`Received data: ${JSON.stringify(body)}`);
        try {
            log(body.amount);
        }
        catch {
            log("amount error");
        }

        //const { amount, currency } = JSON.stringify(body);
        const amount = 500;
        const currency = 'INR';
        
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency
            });
            log("before payment intent");
            log(paymentIntent);
            const clientSecret = paymentIntent.client_secret;
            return res.send(JSON.stringify({client: clientSecret}), 200, headers);
            // return res.json({
            //     payment: paymentIntent
            // }, 200, headers);
        }
        catch(error) {
            log(error)
        }

        // Send a JSON response
        // return res.json({
        // message: 'Data received successfully',
        // receivedData: body,
        // }, 200, headers);
    }

    // `res.json()` is a handy helper for sending JSON
    return res.json({
        motto: 'Build like a team of hundreds_',
        learn: 'https://appwrite.io/docs',
        connect: 'https://appwrite.io/discord',
        getInspired: 'https://builtwith.appwrite.io',
    }, 200, headers);
};
