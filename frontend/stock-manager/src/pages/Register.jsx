import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../context/AuthContext";

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password || !confirmPassword) return alert("All fields are required!");
        if (password !== confirmPassword) return alert("Passwords do not match!");
        if (password.length < 6) return alert("Password must be at least 6 characters!");
        if (!email.includes("@")) return alert("Invalid email!");

        try {
            await setPersistence(auth, browserLocalPersistence);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: username });
            alert("Registration successful!");
            navigate("/dashboard");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") alert("This email is already registered!");
            else alert(error.message);
        }
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleRegisterSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            <h4>Already have an account?</h4>
            <button onClick={() => navigate("/login")}>Login</button>
        </>
    );
}
