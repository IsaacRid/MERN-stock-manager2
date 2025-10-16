import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cancel() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>
                ❌ Payment Cancelled
            </h1>
            <button
                onClick={() => navigate("/basket")}
            >
                Back to Basket
            </button>
        </div>
    );
}
