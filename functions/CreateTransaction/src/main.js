/*
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Define your Appwrite function
export default async({req, res, log}) => {

    log(req);
    log(res);
    try {
        log(req.headers);
    }
    catch {
        log("req headers err");
    }

    // Set CORS headers for preflight request
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    if (req.method === 'OPTIONS') {
        // Set CORS headers for preflight request
        res.send({
            //headers
        }, headers);
       // return;
    }

    //const { amount, currency } = JSON.parse(req.body);
    const amount = 1000;
    const currency = "usd";

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency
        });

        // Set CORS headers
        //res.headers['Access-Control-Allow-Origin'] = '*';
        //res.setHeader("Access-Control-Allow-Origin", "*");
        //res.setHeader('Access-Control-Allow-Methods', 'POST');
        //res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

         // Set CORS headers
        // const headers = {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'POST',
        //     'Access-Control-Allow-Headers': 'Content-Type'
        // };

        // Handle successful payment
        //res.send({ clientSecret: paymentIntent.client_secret });
        res.send({
            statusCode: 200,
            //headers,
            body: { clientSecret: paymentIntent.client_secret }
        }, headers);

        return res.json({
            paymentIntent,
        });

    } catch (error) {
        // Handle payment failure
        //const mssg = error.message;
        res.send({ status: 'error', message: error.message });

        // return res.json({
        //     mssg
        // });
    }
}
*/

import { Client } from 'node-appwrite';

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

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    // Preflight response for CORS
    return res.send('');
  }

  // The `req` object contains the request data
  if (req.method === 'POST') {
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
