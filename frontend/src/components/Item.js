import React from 'react';

class Item extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='container'>
                <img src="https://reber48.ru/wp-content/uploads/2021/09/285621.0x1000.gif" className='img-fluid' alt="img" width="400px" height="400px"></img>
                <h3>Название товара</h3>
                <p className='lead'>Артикул:</p>
                <p>Цена за ед.измерения: 100</p>
                <select className='form-select'>
                    <option selected="" value="1">Штука</option>
                    <option value="2">Короб</option>
                    <option value="3">Палет</option>
                </select>
                <div>
                    <div className='btn btn-success'>+</div>
                    <input type="text" className="form-control" placeholder="Amount" />
                    <div className='btn btn-danger'>-</div>
                </div>
                <button type="submit" className='btn btn-primary'>Добавить в корзину</button>

            </div>
        )
    }
}

export default Item