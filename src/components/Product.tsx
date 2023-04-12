import { useParams } from "react-router-dom";
import { IProduct } from "../App";

interface IProductProps {
    products: IProduct[]
    addProductToCart: any
}

function Product(props: IProductProps) {

    const { pid } = useParams();


    const product = props.products.find(el => el.id === Number(pid));

    return <>
        {product === undefined && <div>No Product found</div>}
        {product !== undefined && <div key={product.id}>
            <h1>{product.title}</h1>
            <button onClick={() => props.addProductToCart(product)} >Add to Cart</button>
        </div>}
    </>;
}

export default Product;