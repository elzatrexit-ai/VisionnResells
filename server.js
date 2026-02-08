// Load dependencies
const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51SyP3HPPTRhKJy30mPiUH2NgehdFNY7q7Im5In7anzv1UDv5xbPo38jmubjVrHipLoDbDqOom4cClu3DXLoVUKlb00AQgnCo9Q');
const path = require('path');

// Middleware
app.use(express.static('.')); // serve static files (HTML, CSS)
app.use(express.json());

// Create Stripe Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  const { product, price, size } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'aud',
          product_data: {name: `Authentic Jordan 4 Yellow Thunders Barely Used (175 AUD)`
          },
          unit_amount: '17500',
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success.html', // Redirect after payment
      cancel_url: 'http://localhost:3000/cancel.html',   // Redirect if cancelled
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
