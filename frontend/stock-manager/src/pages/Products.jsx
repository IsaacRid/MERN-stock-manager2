import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Modal from "../components/Modal";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [activeProduct, setActiveProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/products");
                const data = await res.json();
                if (res.ok) setProducts(data.products || []);
                else alert("Failed to fetch products");
            } catch (err) {
                alert(err.message);
            }
        };
        fetchProducts();
    }, []);

    const openModal = (product) => setActiveProduct(product);
    const closeModal = () => { setActiveProduct(null); setQuantity(0); };

    const handleAddBasket = async () => {
        if (!quantity) { alert("Please enter a quantity"); return; }
        try {
            const res = await fetch("http://localhost:3000/api/basket", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productQuantity: quantity,
                    productTitle: activeProduct.productTitle,
                    productsPrice: quantity * activeProduct.productPrice,
                    productImage: activeProduct.productImage,
                    productPrice: activeProduct.productPrice,
                    productDescription: activeProduct.productDescription
                }),
            });
            const data = await res.json();
            if (res.ok) alert(`Added to basket: ${data.message}`);
            else alert(`Failed: ${data.message}`);
            closeModal();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="products-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.productTitle}
                        productImage={product.productImage}
                        productTitle={product.productTitle}
                        productDescription={product.productDescription}
                        productPrice={product.productPrice}
                        onOpenModal={() => openModal(product)}
                    />
                ))}

            </div>
            {activeProduct && (
                <Modal isOpen={!!activeProduct} onClose={closeModal}>
                    <h2>{activeProduct.productTitle}</h2>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <p>Total: £{quantity * activeProduct.productPrice}</p>
                    <button onClick={handleAddBasket}>Add</button>
                    <button onClick={closeModal}>Close</button>
                </Modal>
            )}
        </>
    );
}
