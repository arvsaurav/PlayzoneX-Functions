//import { Client } from 'node-appwrite';
/*
// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
    // Why not try the Appwrite SDK?
    //
    // const client = new Client()
    //    .setEndpoint('https://cloud.appwrite.io/v1')
    //    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    //    .setKey(process.env.APPWRITE_API_KEY);

    // You can log messages to the console
    log('Hello, Logs!');

    // If something goes wrong, log an error
    error('Hello, Errors!');

    // The `req` object contains the request data
    if (req.method === 'GET') {
        // Send a response with the res object helpers
        // `res.send()` dispatches a string back to the client
        return res.send('Hello, World!');
    }

    // `res.json()` is a handy helper for sending JSON
    return res.json({
        motto: 'Build like a team of hundreds_',
        learn: 'https://appwrite.io/docs',
        connect: 'https://appwrite.io/discord',
        getInspired: 'https://builtwith.appwrite.io',
    });
};
*/

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Define your Appwrite function
export default async({req, res}) => {
    // Retrieve the payment details from the request
    const request = req;
    const response = res;
    const { amount, currency, source, description } = request.body;

    try {
        // Create a charge using the Stripe API
        const charge = await stripe.charges.create({
            amount,
            currency,
            source,
            description,
        });

        // Handle successful payment
        return response.send({ status: 'success', charge });

        // return response.json({
        //     'status': "success"
        // });

    } catch (error) {
        // Handle payment failure
        response.send({ status: 'error', message: error.message });
    }
}
