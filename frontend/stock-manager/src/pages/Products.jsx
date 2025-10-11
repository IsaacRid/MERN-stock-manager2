import React, { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"

export default function Products(props) {
    const { setCurrentPage } = props
    const [products, setProducts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [productImage, setProductImage] = useState("")
    const [productTitle, setProductTitle] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [productStock, setProductStock] = useState("")

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/products`
                );

                const data = await res.json();

                if (res.ok) {
                    setProducts(data.products || []);
                } else {
                    alert("Failed to fetch products");
                }
            } catch (err) {
                alert(err.message);
            }
        };

        fetchProducts();
    }, [isModalOpen]);

    const handleOpenCreateProductModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseCreateProductModal = () => {
        setIsModalOpen(false)
    }

    const handleCreateProduct = async () => {
        if (!productImage || !productTitle || !productDescription || !productStock) {
            alert("Please fill out all fields")
            return
        }

        try {
            const res = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productImage, productTitle, productDescription, productStock }),
            })

            const data = await res.json()
            if (res.ok) {
                alert(`Product Created ${data.message}`)
                setProductImage("")
                setProductTitle("")
                setProductDescription("")
                setProductStock("")
                setIsModalOpen(false)
            } else {
                alert(`Failed to create product ${data.message}`)
            }
        } catch (err) {
            alert(err.message)
        }
    }


    return (
        <>
            <Navbar setCurrentPage={setCurrentPage}></Navbar>
            <div className="products-grid">
                {products.map((product) => (
                    <ProductCard key={product.productTitle} productImage={product.productImage} productTitle={product.productTitle} productDescritpion={product.productDescritpion} productStock={product.productStock}></ProductCard>
                ))}
            </div>
            <button onClick={handleOpenCreateProductModal}>
                Create new product
            </button>
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseCreateProductModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Create new product</h2>
                        <label htmlFor="product-image">Product image link:</label>
                        <input type="text" id="product-image" onChange={(e) => { setProductImage(e.target.value) }}></input>
                        <label htmlFor="product-title">Product title:</label>
                        <input type="text" id="product-title" onChange={(e) => { setProductTitle(e.target.value) }}></input>
                        <label htmlFor="product-description">Product description:</label>
                        <input type="text" id="product-description" onChange={(e) => { setProductDescription(e.target.value) }}></input>
                        <label htmlFor="product-stock">Product stock:</label>
                        <input type="text" id="product-stock" onChange={(e) => { setProductStock(e.target.value) }}></input>
                        <button onClick={handleCreateProduct}>Create</button>
                        <button onClick={handleCloseCreateProductModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    )
}