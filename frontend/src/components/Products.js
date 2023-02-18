import React from "react";
import { Link } from 'react-router-dom';

class Products extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="container">
                <div className="card-group">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title"><Link to='/product/1' className="card-link">Товар 1</Link></h3>
                        </div>
                        <img src="https://reber48.ru/wp-content/uploads/2021/09/285621.0x1000.gif" className="card-img-top" width='200px' height='200px' alt="img"></img>

                    </div>
                </div>
            </div>
        )
    }
}

export default Products;