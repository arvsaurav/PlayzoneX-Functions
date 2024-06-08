import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Define your Appwrite function
export default async({req, res, log}) => {

    log(req);
    log(res);

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
        return;
    }

    const { amount, currency } = JSON.parse(req.body);
    // const amount = 1000;
    // const currency = "usd";

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
            headers,
            body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
        }, headers);

        // return res.json({
        //     paymentIntent,
        // });

    } catch (error) {
        // Handle payment failure
        //const mssg = error.message;
        res.send({ status: 'error', message: error.message }, headers);

        // return res.json({
        //     mssg
        // });
    }
}
