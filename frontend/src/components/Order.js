import React from "react";
import { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import axios from 'axios';
import Cookies from "universal-cookie";


class OrderForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { firstname: this.cookie.get('firstname'), lastname: this.cookie.get('lastname'), address: this.cookie.get('address') }
    }

    cookie = new Cookies()

    handleChange(event) {
        this.cookie.set(event.target.name, event.target.value)
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
    render() {
        return (
            <div className="container">
                <form>
                    <label className="form-label">Имя</label>
                    <input name="firstname" type="text" onChange={(event) => this.handleChange(event)} className="form-control" value={this.state.firstname} />

                    <label className="form-label">Фамилия</label>
                    <input name="lastname" type="text" onChange={(event) => this.handleChange(event)} className="form-control" value={this.state.lastname} />

                    <label className="form-label">Адрес</label>
                    <input name="address" type="text" onChange={(event) => this.handleChange(event)} className="form-control" value={this.state.address} />

                    <div className="display-5">
                        Заказ на сумму: {this.cookie.get('all_total')} <br />
                        Всего позиций: {this.cookie.get('positions')}
                    </div>


                </form>
            </div>
        )
    }
}

export default OrderForm;