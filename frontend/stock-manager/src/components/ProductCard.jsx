// ProductCard.jsx
import React from "react";
import "../index.css";

export default function ProductCard(props) {
    const { productImage, productTitle, productDescription, productPrice, onOpenModal } = props
    return (
        <div className="product-card-container">
            <img className="product-card-image" src={productImage} />
            <h4>{productTitle}</h4>
            <p>{productDescription}</p>
            <p>£{productPrice}</p>
            <div className="product-card-buttons">
                <button className="product-card-button" onClick={onOpenModal}>
                    <i className="fa-solid fa-basket-shopping"></i>
                </button>
            </div>
        </div>
    );
}
