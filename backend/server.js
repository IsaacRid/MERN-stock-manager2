const express = require("express")
const cors = require('cors');
const app = express()
const PORT = 3000

app.use(express.json())

// Allow local dev origins (add other dev origins as needed)
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174'
    ]
}));

let orders = []
let products = [{
    "productImage": "https://cdn.4imprint.co.uk/prod/extras/303119/90230/700/1.jpg",
    "productTitle": "pen",
    "productDescription": "A simple byro pen",
    "productStock": 15
}]

app.post("/api/order", (req, res) => {

    const { orderQuantity, productTitle } = req.body;

    if (!orderQuantity || !productTitle) {
        return res.status(400).json({ message: "Order data is required" });
    }

    orders.push({
        productTitle,
        orderQuantity
    });
    console.log("New order received:", { productTitle, orderQuantity });
    console.log(`Current orders: ${JSON.stringify(orders)}`);

    res.status(201).json({ message: "Order received successfully" });
});

app.get("/api/order", (req, res) => {
    res.json({ orders });
    console.log(`Current orders: ${orders}`)
});

app.post("/api/products", (req, res) => {

    const { productImage, productTitle, productDescription, productStock } = req.body;

    if (!productImage || !productTitle || !productDescription || !productStock) {
        return res.status(400).json({ message: "Product data is required" });
    }

    products.push({
        productImage,
        productTitle,
        productDescription,
        productStock
    });

    console.log("New product created:", { productTitle });
    console.log(`Current products: ${JSON.stringify(products)}`);

    res.status(201).json({ message: "Product created successfully" });
});

app.get("/api/products", (req, res) => {
    res.json({ products })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})


