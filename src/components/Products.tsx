import { Link } from "react-router-dom";
import { ICart } from "../App";

function Products(props: any) {
    return <>
        {
            props.products.map((product: any) => <div key={product.id}>
                <Link to={`/${product.id}`}>
                    <h1>{product.title}</h1>
                </Link>
                <button onClick={() => props.addProductToCart(product)} >Add to Cart</button>
            </div>)
        }
    </>;
}

export default Products;