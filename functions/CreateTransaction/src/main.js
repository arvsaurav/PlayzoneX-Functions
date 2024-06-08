import { Client } from 'node-appwrite';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// It's executed each time we get a request
export default async({ req, res, log }) => {

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
        //log(`Received data: ${JSON.stringify(body)}`);
        const amount = body.amount;
        const currency = 'INR';
        const description = 'PlayzoneX payments';
        
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
                description
            });
            const responseBody = JSON.stringify({
                clientSecret: paymentIntent.client_secret
            })
            return res.send(responseBody, 200, headers);
        }
        catch(error) {
            log(error);
        }
    }
    // sending empty response
    return res.send('', 200, headers);
};
