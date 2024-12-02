// import React from 'react'
import { Routes, Route, } from 'react-router-dom';
import HomePage from './pages/homePage/homePage';
import Contacts from './pages/contacts/contacts';
import AboutUs from './pages/aboutUs/aboutUs';
import AllProducts from './pages/allProducts/allProducts';
import Navbar from './components/navbar/navbar';
import Login from './pages/adminLogin/adminLogin';
// import ProtectedRoute from './components/protectedRoute/protectedRoute';
import AdminPanel from './pages/adminPanel/adminPanel';
import Register from './pages/adminRegister/adminRegister';
import ProductDetails from './pages/productDetails/productDetails';

import './App.css';
import Footer from './components/footer/footer';




function App() {


  // const isAuthenticated = !!localStorage.getItem("token");

  return (


    <div>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={<AdminPanel />}
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App

