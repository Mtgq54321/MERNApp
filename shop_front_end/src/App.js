import logo from './logo.svg';
import './App.css';
import { KeyboardControlKeyOutlined } from '@mui/icons-material';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductForm from './Components/ProductForm';
import AccMenu from './Components/Menu';
import NotFound from './Components/NotFound';
import ProductList from './Components/ProductList';
import Signup from './Components/Signup';
import ProductbyId from './Components/ProductbyId';
import Login from './Components/Login';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <AccMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/productAdd" element={<ProductForm />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<ProductbyId/>} />
        {/* This route acts as a catch-all for any undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;