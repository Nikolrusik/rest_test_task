import React from "react";

class Cart extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
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
                    <div className='cart-item row'>
                        <div className='col-1'>
                            <img src="https://reber48.ru/wp-content/uploads/2021/09/285621.0x1000.gif" width="100px" height="100px" />
                        </div>
                        <div className='col-3'>
                            Product: name <br />
                            Articul: articul
                        </div>
                        <div className='col-3'>
                            <div className='btn btn-success'>+</div>
                            <input type="text" className="form-control" placeholder="Amount" />
                            <div className='btn btn-danger'>-</div>
                        </div>
                        <div className='col-2'>
                            <p className='text lead'>Price 1</p>
                        </div>
                        <div className='col-2'>
                            <p className='text lead'>Price total</p>
                        </div>
                        <div className='col-1'>
                            <button type='button' className='btn btn-danger'>Удалить</button>
                        </div>
                    </div>
                    <div className='cart-item row'>
                        <div className='col-5'>
                            Всего товаров: 1
                        </div>
                        <div className='col-5'>
                            Общая сумма: 100
                        </div>
                        <div className='col-2'>
                            <button type="button" className='btn btn-success'>Оформить заказ</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Cart;