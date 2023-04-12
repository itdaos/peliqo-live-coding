import { ICart } from "../App";

function Cart(props: any) {



    return <>{props.cart.map(
        (cartItem: ICart) => <div>
            {`${cartItem.id} - ${cartItem.price} * ${cartItem.amount}`}
            <button onClick={() => props.removeProductFromCart(cartItem)}> -1 </button>
        </div>
    )}
        <div color="red"> TOTAL:  {props.cart.reduce((acc: number, curr: ICart) => {
            return acc + curr.amount * curr.price;
        }, 0)} </div>
    </>;
}

export default Cart;