import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../context/AuthContext";
import Navbar from "../components/Navbar"

export default function Dashboard(props) {
    const { setCurrentPage } = props
    const handleSignout = async () => {
        try {
            await signOut(auth);
            setCurrentPage("register");
        } catch (error) {
            console.error("Signout error:", error);
        }
    };

    return (
        <>
            <Navbar setCurrentPage={setCurrentPage}></Navbar>
            <div id="dashboard-container">
                <h1>Dashboard</h1>
                <p>Welcome, {auth.currentUser?.displayName || auth.currentUser?.email}</p>
                <button onClick={handleSignout}>Sign Out</button>
            </div>
        </>
    );
}
