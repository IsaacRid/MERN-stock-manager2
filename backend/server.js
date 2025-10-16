const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Stripe = require("stripe");
const { v4: uuidv4 } = require("uuid");

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express()
const PORT = 3000

app.use(express.json())

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175'
    ]
}));

let basket = []
let products = [{
    "productImage": "https://cdn.4imprint.co.uk/prod/extras/303119/90230/700/1.jpg",
    "productTitle": "pen",
    "productDescription": "A simple byro pen",
    "productPrice": 2
}, {
    "productImage": "https://media.istockphoto.com/id/532048136/photo/fresh-red-apple-isolated-on-white-with-clipping-path.jpg?s=612x612&w=0&k=20&c=aOO4GQQXg10xvOcv0KXYIm3M2kHZSC17lGX_Z9b_KXo=",
    "productTitle": "apple",
    "productDescription": "A red apple",
    "productPrice": 1
}, {
    "productImage": "https://media.istockphoto.com/id/1319752077/vector/shoes-cartoon.jpg?s=612x612&w=0&k=20&c=slwK7mBUYW_OE0FSMgd2j8V04vbrZ1X0Ws7byk95MPM=",
    "productTitle": "shoes",
    "productDescription": "A pair of shoes",
    "productPrice": 20
},]

app.post("/api/basket", (req, res) => {

    const { productQuantity, productTitle, productsPrice, productImage, productPrice, productDescription } = req.body;

    if (!productQuantity || !productTitle) {
        return res.status(400).json({ message: "Order data is required" });
    }

    basket.push({
        productTitle,
        productQuantity,
        productsPrice,
        productImage,
        productPrice,
        productDescription
    });
    console.log("New item added to basket:", { productTitle, productQuantity, productsPrice });
    console.log(`Current basket: ${JSON.stringify(basket)}`);

    res.status(201).json({ message: "Item added to basket successfully" });
});

app.get("/api/basket", (req, res) => {
    res.json({ basket });
    console.log(`Current basket: ${basket}`)
});

app.delete("/api/basket/:productTitle", (req, res) => {
    const { productTitle } = req.params;

    basket = basket.filter(item => item.productTitle !== productTitle);

    console.log(`Deleted ${productTitle} from basket`);
    res.json({ message: "Item removed successfully", basket });
});


app.get("/api/products", (req, res) => {
    res.json({ products })
})

app.post("/api/checkout", async (req, res) => {
    try {
        const { basket } = req.body;

        const lineItems = basket.map(item => ({
            price_data: {
                currency: "gbp",
                product_data: {
                    name: item.productTitle,
                    description: item.productDescription,
                    images: [item.productImage],
                },
                unit_amount: Math.round(item.productPrice * 100),
            },
            quantity: item.productQuantity,
        }));

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: lineItems,
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})


