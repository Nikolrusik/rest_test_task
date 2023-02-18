import './App.css';
import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';


// Import components
import Cart from './components/Cart';
import Products from './components/Products';
import Navbar from './components/Nav';
import Item from './components/Item';
import LoginForm from './components/Login';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      token: "",
    }
  }

  set_token(token) {
    const cookies = new Cookies();
    cookies.set('token', token)
    this.setState({ token: token }, () => this.load_data());
  }

  is_authenticated() {
    return this.state.token != "";
  }

  logout() {
    this.set_token("");
  }

  get_token_from_storage() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    this.setState({ token: token }, () => this.load_data());
  }

  get_headers() {
    let headers = {
      "Content-type": "application/json",
    };
    if (this.is_authenticated()) {
      headers['Authorization'] = "Token" + this.state.token;
    }
    return headers;
  }

  get_token(username, password) {
    // 
  }


  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/product/:id"
              element={<Item />} />
            <Route
              path="/cart"
              element={<Cart />} />
            <Route
              path="/"
              element={<Products />} />
            <Route
              path="/login"
              element={<LoginForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
