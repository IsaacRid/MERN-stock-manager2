import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BasketProduct from "../components/BasketProduct";

export default function Basket(props) {
    const { setCurrentPage } = props;
    const [basket, setBasket] = useState([]);
    const [basketPrice, setBasketPrice] = useState(0);

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/basket");
                const data = await res.json();
                if (res.ok) setBasket(data.basket || []);
                else alert("Failed to fetch basket");
            } catch (err) {
                alert(err.message);
            }
        };
        fetchBasket();
    }, []);

    useEffect(() => {
        const total = basket.reduce((sum, item) => {
            return sum + item.productPrice * Number(item.productQuantity);
        }, 0);
        setBasketPrice(total);
    }, [basket]);

    return (
        <>
            <Navbar setCurrentPage={setCurrentPage} />
            <div className="basket-list">
                {basket.map((basketInd) => (
                    <BasketProduct
                        key={basketInd.productTitle}
                        productImage={basketInd.productImage}
                        productTitle={basketInd.productTitle}
                        productDescription={basketInd.productDescription}
                        productPrice={basketInd.productPrice}
                        productQuantity={basketInd.productQuantity}
                    />
                ))}
            </div>
            <div className="basket-total">
                <h3>Total Basket Price: £{basketPrice.toFixed(2)}</h3>
            </div>
        </>
    );
}
