import React from "react";
import { Link } from 'react-router-dom';
import { useQuery, gql, } from '@apollo/client';


const GET_PRODUCTS = gql`
  query GetProducts {
    allProducts {
      id
      title
    }
  }
`;
const ProductsItems = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    console.log(data.allProducts)

    return data.allProducts.map(({ id, title, image }) =>
    (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title"><Link to={`/product/${id}`} className="card-link">{title}</Link></h3>
                </div>
                <img src="https://reber48.ru/wp-content/uploads/2021/09/285621.0x1000.gif" className="card-img-top" width='200px' height='200px' alt="img"></img>
            </div>
        </div>
    )
    )
}
class Products extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {

        return (

            <div className="container">

                <div className="row row-cols-1 row-cols-sm-4 g-3">
                    <ProductsItems />
                </div>
            </div>
        )
    }
}

export default Products;