import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./context/AuthContext";
import React, { useState, useEffect } from 'react'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Login from "./pages/Login";
import Products from "./pages/Products";
import Orders from "./pages/Orders";

export default function App() {

  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('register');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setCurrentPage('dashboard');
      } else {
        setUser(null);
        setCurrentPage('register');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {currentPage === 'register' && <Register setCurrentPage={setCurrentPage} />}
      {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
      {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} />}
      {currentPage === 'products' && <Products setCurrentPage={setCurrentPage} />}
      {currentPage === 'orders' && <Orders setCurrentPage={setCurrentPage} />}
    </>
  )
}
