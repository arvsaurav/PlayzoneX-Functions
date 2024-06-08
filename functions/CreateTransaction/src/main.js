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
        const name = body.name; // customer name
        const currency = 'INR';
        const description = 'PlayzoneX Payments';
        const address = {
            line1: 'Dummy Line 1',
            postal_code: '00000',
            city: 'Dummy City',
            state: 'Dummy State',
            country: 'India',
        }
         
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                name,
                currency,
                description
            });
            // for international payments, it is mandatory to have customer name and billing address
            const customer = await stripe.customers.create({
                name,
                address
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
