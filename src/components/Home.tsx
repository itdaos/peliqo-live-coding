import { Link, Outlet } from "react-router-dom";
import { ICart } from "../App";

function Home(props: any) {
    return <>
        <Link to='cart'>CART: {props.cart.reduce((acc: number, cartItem: ICart) => { return acc + cartItem.amount }, 0)}</Link>
        <hr />
        <br />
        <div>
            <button onClick={props.prevPage}>-</button>
            <span>{props.currPage}</span>
            <button onClick={props.nextPage}>+</button>
        </div>
        <Outlet />
    </>;
}

export default Home;