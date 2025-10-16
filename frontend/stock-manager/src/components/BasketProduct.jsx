import React from "react";
import "../index.css";

export default function BasketProduct(props) {
    const { productImage, productTitle, productDescription, productPrice, quantity, handleQuantityChange, handleDelete } = props

    const increaseQuantity = () =>
        handleQuantityChange(Number(quantity) + 1);
    const decreaseQuantity = () =>
        handleQuantityChange(Number(quantity) > 1 ? Number(quantity) - 1 : 1);

    return (
        <div className="product-card-container">
            <img className="product-card-image" src={productImage} alt={productTitle} />
            <h4>{productTitle}</h4>
            <p>{productDescription}</p>
            <p>Quantity: {quantity}</p>
            <p>Total Price: £{(productPrice * quantity).toFixed(2)}</p>

            <div className="product-card-buttons">
                <button className="product-card-button" onClick={decreaseQuantity}>−</button>
                <button className="product-card-button" onClick={increaseQuantity}>+</button>
                <button className="product-card-button" onClick={handleDelete}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
}

