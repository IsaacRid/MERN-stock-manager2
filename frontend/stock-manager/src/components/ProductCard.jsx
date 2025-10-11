import "../index.css"
import { useState } from "react";

export default function ProductCard(props) {

    const { productImage, productTitle, productDescription, productStock } = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderQuantity, setOrderQuantity] = useState(0)

    const handleOpenOrderModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseOrderModal = () => {
        setIsModalOpen(false);
    };

    const handleOrder = async () => {
        if (!orderQuantity) {
            alert("Please enter an order amount")
            return
        }

        try {
            const res = await fetch('http://localhost:3000/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderQuantity, productTitle }),
            })

            const data = await res.json()
            if (res.ok) {
                alert(`Order Placed ${data.message}`)
                setOrderQuantity(0)
            } else {
                alert(`Order failed ${data.message}`)
            }
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className="product-card-container">
            <img className="product-card-image" src={productImage}></img>
            <h4>{productTitle}</h4>
            <p>{productDescription}</p>
            <h5>Total stock: {productStock}</h5>
            <div className="product-card-buttons">
                <button className="product-card-button" onClick={handleOpenOrderModal}><i className="fa-solid fa-pen-to-square"></i></button>
                <button className="product-card-button"><i className="fa-solid fa-trash"></i></button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseOrderModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{productTitle}</h2>
                        <h4>Make new order</h4>
                        <input type="number" onChange={(e) => setOrderQuantity(e.target.value)}></input>
                        <button onClick={handleOrder}>Order</button>
                        <button onClick={handleCloseOrderModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}