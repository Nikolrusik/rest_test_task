import './App.css';
import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useQuery, gql, ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';


// Import components
import Cart from './components/Cart';
import Products from './components/Products';
import Navbar from './components/Nav';
import Item from './components/Item';
import LoginForm from './components/Login';
import OrderForm from './components/Order';




const link = createHttpLink({
  uri: 'http://localhost:8000/graphql/',
  credentials: 'same-origin',
});

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: "",
      client: new ApolloClient({
        link,
        cache: new InMemoryCache(),
        headers: this.get_headers(),

      })
    }
  }

  set_token(token) {
    const cookies = new Cookies();
    cookies.set('token', token)
    this.setState({ token: token }, () => this.load_data());
  }

  is_authenticated() {
    return this.state?.token != "";
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
      headers['Authorization'] = "Token" + this.state?.token;
    }
    return headers;
  }

  get_token(username, password) {
    axios
      .post("http://127.0.0.1:8000/api-token-auth/", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        this.set_token(response.data['token']);
      })
      .catch((error) => alert(error));
  }

  load_data() {
    const headers = this.get_headers();

  }


  componentDidMount() {
    this.get_token_from_storage();
  }

  render() {
    return (
      <div className="App">
        <ApolloProvider client={this.state.client}>
          <BrowserRouter>
            <Navbar
              is_authenticated={this.is_authenticated.bind(this)}
              logout={this.logout.bind(this)}
            />
            <Routes>
              <Route
                path="/product/:id"
                element={<Item client={this.state.client} headers={this.get_headers()} />} />
              <Route
                path="/cart"
                element={<Cart client={this.state.client} />} />
              <Route
                path="/"
                element={<Products />} />
              <Route
                path="/login"
                element={<LoginForm
                  get_token={(username, password) => this.get_token(username, password)}
                />} />
              <Route
                path="/create_order"
                element={
                  <OrderForm />
                } />
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
