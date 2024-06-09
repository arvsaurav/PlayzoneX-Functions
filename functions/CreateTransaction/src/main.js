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
        const amountInRupee = body.amount;
        const amountInPaise = amountInRupee * 100;
        const currency = 'INR';
        const description = 'PlayzoneX Payments';
        const shipping = {
            name: body.name,
            address: {
                line1: 'Dummy Line 1',
                postal_code: '00000',
                city: 'Dummy City',
                state: 'Dummy State',
                country: 'India'
            }
        }
        
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amountInPaise,
                currency,
                description,
                shipping
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
