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

app.post("/api/order", (req, res) => {

    const { order, productTitle } = req.body;

    // Both order and productTitle are required
    if (!order || !productTitle) {
        return res.status(400).json({ message: "Order data is required" });
    }

    orders.push({
        productTitle,
        orderQuantity: order
    });
    console.log("New order received:", { productTitle, orderQuantity: order });
    console.log(`Current orders: ${JSON.stringify(orders)}`);

    res.status(201).json({ message: "Order received successfully" });
});

app.get("/api/order", (req, res) => {
    res.json({ orders });
    console.log(`Current orders: ${orders}`)
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})


