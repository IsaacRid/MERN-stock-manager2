import React from "react";
import "../index.css";

export default function BasketProduct(props) {
    const { productImage, productTitle, productDescription, productPrice, productQuantity } = props
    return (
        <div className="product-card-container">
            <img className="product-card-image" src={productImage} />
            <h4>{productTitle}</h4>
            <p>Quantity: {productQuantity}</p>
            <p>Total Price: £{(productPrice * Number(productQuantity)).toFixed(2)}</p>
            <div className="product-card-buttons">
                <button className="product-card-button">
                    -
                </button>
                <button className="product-card-button">
                    +
                </button>
                <button className="product-card-button">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
}
