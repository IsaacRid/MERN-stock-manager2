import React, { useState } from 'react';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return alert("Please enter email and password!");

        try {
            await setPersistence(auth, browserLocalPersistence);
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            if (error.code === "auth/user-not-found") alert("No account found with this email!");
            else if (error.code === "auth/wrong-password") alert("Incorrect password!");
            else alert(error.message);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form id="login-form" onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <h4>Haven't got an account?</h4>
            <button onClick={() => navigate("/register")}>Register</button>
        </>
    );
}
