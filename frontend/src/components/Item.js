import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, gql } from '@apollo/client';
import axios from 'axios';

const Item = (props, { headers }) => {
    let { id } = useParams();
    const GET_PRODUCT_BY_ID = gql`
    query allProducts {
        productById(id:${id}) {
            id
            title
            description
            measureunitSet {
            id
            articul
            name
            amount
            price
           }
       }
       }`

    const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID);

    let [measure, setMeasure] = useState();
    let [amount, setAmount] = useState(1)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (data != undefined) {
        let response = data.productById

        const plusAmount = () => {
            setAmount((value) => value + 1)
        }
        const minusAmount = () => {
            setAmount((value) => value == 1 ? value : value - 1)
        }

        const handleSubmit = () => {
            if (response != '') {
                let total = amount * measure.price;
                console.log(total)
                let i = 0;
                let measure_end = []
                measure_end.push(measure)
                let a = [];
                let ADD_CART = `
                mutation addCArt {
                    superCart(input: {
                        product: "${response.id}",
                        measure: "${measure.id}",
                        user: "1",
                        amount: ${amount},
                        total: ${total}
                    }) {
                        id
                    }
                    }`
                response.measureunitSet.map((item) => {
                    if (item.id != measure.id && item.amount > measure.amount) {
                        if (amount > item.amount) {
                            a.push(parseInt(amount / item.amount))
                            if ((amount - item.amount) > 0) {
                                measure_end.push(measure)
                                a.push(amount - item.amount)
                                if (measure_end.length > 1) {
                                    measure_end.pop()
                                    measure_end.push(item)
                                    console.log(item)
                                } else {
                                    measure_end.push(item)
                                }

                            }

                        }
                    }
                })
                if (measure_end.length > 1) {
                    measure_end.map((item) => {
                        total = a[i] * item.price
                        ADD_CART = `mutation addCArt {
                                    superCart(input: {
                                        product: "${response.id}",
                                        measure: "${item.id}",
                                        user: "1",
                                        amount: ${a[i]},
                                        total: ${total}
                                    }) {
                                        id
                                    }
                                    }`
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
                        i++;
                    })
                } else {
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
            }
            props?.client.refetchQueries({
                include: "active",
            });
            alert("Товар добавлен в корзину")
        }

        return (
            <div className='container' onLoad={() => setMeasure(response.measureunitSet[0])}>
                <img src="https://reber48.ru/wp-content/uploads/2021/09/285621.0x1000.gif" className='img-fluid' alt="img" width="400px" height="400px"></img>
                <h3>{response.title}</h3>
                <p className='lead'>Артикул: {measure?.articul}</p>
                <p>Количество в упаковке: {measure?.amount}</p>
                <p>Цена за ед.измерения: {measure?.price}</p>
                <select className='form-select' onChange={(e) => setMeasure(response?.measureunitSet.find(i => i?.id === e.target.value))}>
                    {response.measureunitSet.map((item) => (
                        measure?.id == item?.id ? <option selected value={item.id}> {item.name}</option> : <option value={item.id}> {item.name}</option>

                    ))}
                </select>
                <div>
                    <div className='btn btn-success' onClick={() => plusAmount()}>+</div>
                    <input type="text" min="1" className="form-control" placeholder="Amount" value={amount} />
                    <div className='btn btn-danger' onClick={() => minusAmount()}>-</div>
                </div>
                <button type="submit" className='btn btn-primary' onClick={() => handleSubmit()}>Добавить в корзину</button>

            </div >
        )
    }
}


export default Item