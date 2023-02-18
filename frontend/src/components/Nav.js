import React from "react";
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Rest cart</Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">Каталог товаров</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link">Корзина</Link>
                        </li>
                        <li className="nav-item">
                            {this.props?.is_authenticated() ? <a className="nav-link" onClick={() => this.props?.logout()}>Выйти</a> :
                                <Link to="/login" className="nav-link">Вход</Link>}
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;