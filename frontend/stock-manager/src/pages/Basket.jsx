import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BasketProduct from "../components/BasketProduct";

export default function Basket() {
    const [basket, setBasket] = useState([]);

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/basket");
                const data = await res.json();
                if (res.ok) setBasket(data.basket || []);
            } catch (err) {
                alert(err.message);
            }
        };
        fetchBasket();
    }, []);

    const handleCheckout = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ basket }),
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
        } catch (err) {
            console.error(err);
            alert("Checkout failed");
        }
    };

    const handleDelete = async (productTitle) => {
        try {
            const res = await fetch(`http://localhost:3000/api/basket/${productTitle}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (res.ok) setBasket(data.basket);
            else alert(`Failed: ${data.message}`);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleQuantityChange = (index, newQuantity) => {
        const updatedBasket = [...basket];
        updatedBasket[index].productQuantity = newQuantity;
        setBasket(updatedBasket);
    };

    const total = basket.reduce((sum, item) => sum + item.productPrice * item.productQuantity, 0);

    return (
        <>
            <Navbar />
            <div className="basket-list">
                {basket.map((item, index) => (
                    <BasketProduct
                        key={item.productTitle}
                        productImage={item.productImage}
                        productTitle={item.productTitle}
                        productDescription={item.productDescription}
                        productPrice={item.productPrice}
                        quantity={item.productQuantity}
                        handleQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
                        handleDelete={() => handleDelete(item.productTitle)}
                    />
                ))}
            </div>
            <div className="basket-total">
                <h3>Total Basket Price: £{total.toFixed(2)}</h3>
            </div>
            <button onClick={handleCheckout}>Checkout</button>
        </>
    );
}
