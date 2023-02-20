import React from "react";
import { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import axios from 'axios';
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const CartItem = ({ item, amount, setAmount, plusAmount, minusAmount, delCart }) => {
    let copy = amount
    copy.set(item.id, parseInt(`${item.amount}`))


    return (
        <div className='cart-item row' onLoad={() => { setAmount(copy) }}>
            <div className='col-1'>
                <img src="https://reber48.ru/wp-content/uploads/2021/09/285621.0x1000.gif" width="100px" height="100px" />
            </div>
            <div className='col-3'>
                Product: {item.product.title} <br />
                Articul: {item.measure.articul}
            </div>
            <div className='col-3'>
                <div className='btn btn-success' id={item.id} onClick={(e) => plusAmount(e, copy, item)}>+</div>
                <input type="text" className="form-control" id={`am-${item.id}`} min="1" placeholder="Amount" value={amount.get(item.id)} />
                <div className='btn btn-danger' id={item.id} onClick={(e) => minusAmount(e, copy, item)}>-</div>
            </div>
            <div className='col-2'>
                <p className='text lead'>{item.measure.price}₽/{item.measure.name}</p>
            </div>
            <div className='col-2'>
                <p className='text lead' id={`price-${item.id}`}>{item.total}</p>
                <p className="text lead">₽</p>
            </div>
            <div className='col-1'>
                <button type='button' onClick={() => { delCart(item.id) }} className='btn btn-danger'>Удалить</button>
            </div>
        </div >
    )
}
const Cart = (props) => {
    const [amount, setAmount] = useState(new Map([]))
    useEffect(() => {
        return () => {
            props.client.refetchQueries({
                include: "active",
            });
        }
    }, [])
    const GET_CART = gql`query GetCart {
        allCart {
          id
          product {
            id
            title
          }
          measure {
            id
            articul
            name
            price
          }
          amount 
          total
        } 
      }`;

    const { loading, error, data } = useQuery(GET_CART);
    let ADD_CART = 0;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    let totaled = 0
    let cookie = new Cookies();
    if (!loading) {
        for (let i = 0; i < data.allCart.length; i++) {
            totaled = totaled + data.allCart[i].total
        }
    }
    cookie.set('all_total', totaled)
    cookie.set('positions', data.allCart.length)
    function plusAmount(e, copy, item) {
        let elem = document.getElementById(`am-${e.target.id}`);


        if (copy.has(e.target.id)) {
            copy.set(e.target.id, copy.get(e.target.id) + 1);
        }
        setAmount(copy);
        let price_elem = document.getElementById(`price-${e.target.id}`);
        price_elem.innerText = `${(elem.value * item.measure.price) + item.measure.price}`;
        elem.value++;


        ADD_CART = `mutation addCArt {
            superCart(input: {
                id: ${item.id},
                product: "${item.product.id}",
                measure: "${item.measure.id}",
                user: "1",
                amount: ${elem.value},
                total: ${elem.value * item.measure.price}
            }) {
                id
            }
            }`;
        axios
            .post('http://127.0.0.1:8000/graphql/', {
                query: ADD_CART
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

        props.client.refetchQueries({
            include: "active",
        });
    }
    const minusAmount = (e, copy, item) => {
        let elem = document.getElementById(`am-${e.target.id}`)
        if (elem.value > 1) {
            if (copy.has(e.target.id)) {
                copy.set(e.target.id, copy.get(e.target.id) - 1)
            }
            setAmount(copy)

            let price_elem = document.getElementById(`price-${e.target.id}`)
            price_elem.innerText = `${(elem.value * item.measure.price) - item.measure.price}`;
            elem.value--;
            ADD_CART = `mutation addCArt {
                superCart(input: {
                    id: ${item.id},
                    product: "${item.product.id}",
                    measure: "${item.measure.id}",
                    user: "1",
                    amount: ${elem.value},
                    total: ${elem.value * item.measure.price}
                }) {
                    id
                }
                }`
        }
        axios
            .post('http://127.0.0.1:8000/graphql/', {
                query: ADD_CART
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

    }

    const delCart = (id) => {
        let DEL_CART = `
        mutation delCart {
            deleteCart(id:${id}) {
            ok
          }
        }
        `
        axios
            .post('http://127.0.0.1:8000/graphql/', {
                query: DEL_CART
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        props.client.refetchQueries({
            include: "active",
        });
    }
    return (
        <div className='container'>

            <div className="cart">

                <div className='cart-item row'>
                    <div className='col-1'>
                        <p className='lead'>IMG</p>
                    </div>
                    <div className='col-3'>
                        <p className='lead'>Info of product</p>
                    </div>
                    <div className='col-3'>
                        <p className='lead'>Amount</p>
                    </div>
                    <div className='col-2'>
                        <p className='text lead'>Price 1</p>
                    </div>
                    <div className='col-2'>
                        <p className='text lead'>Price total</p>
                    </div>
                    <div className='col-1'>
                        <p className='lead'>Control</p>
                    </div>
                </div>
                {data.allCart.map((item) =>
                    < CartItem item={item} delCart={delCart.bind()} amount={amount} setAmount={setAmount} plusAmount={plusAmount} minusAmount={minusAmount} />
                )}
                <div className='cart-item row'>
                    <div className='col-5'>
                        Всего позиций: {data.allCart.length}
                    </div>
                    <div className='col-5'>
                        Общая сумма: {cookie.get('all_total')}
                    </div>
                    <div className='col-2'>
                        <Link to="/create_order" className="btn btn-success">Оформить заказ</Link>
                        {/* <button type="button" className='btn btn-success'>Оформить заказ</button> */}
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Cart;