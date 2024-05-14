import { connectToDatabase } from "../../util/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  try {
    const { db } = await connectToDatabase();

    // Insert items into the database
    const result = await db.collection("temp").insertOne({
      user: email,
      items,
      createdAt: new Date(),
    });

    // Transform items for Stripe checkout session
    const transformedItems = items.map((item) => ({
      quantity: item.qty,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100, // Ensure the price is in cents
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image],
        },
      },
    }));

    // Create Stripe checkout session with shipping options
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_options: [
        {
          shipping_rate: "shr_1PGPxPIYZjZaJwxtdI1PIoeP" // Replace with your actual shipping rate ID
        }
      ],
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "CA", "IN"],
      },
      line_items: transformedItems,
      mode: "payment",
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/cart`,
      metadata: {
        id: JSON.stringify(result.insertedId),
      },
    });

    // Send session ID back to the client
    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Bad Request" });
  }
};
