import '../scss/Cart.scss'
import {useAppSelector} from "../util/hooks";

import CartItem from "./CartItem";

const Cart = ({closeCart}: {closeCart: () => void}) => {
    const cart = useAppSelector(state => state.ui.cart);
    const products = useAppSelector(state => state.products.entries);
    return (
        <div className="Cart">
            <div className="header">
                <button onClick={closeCart}>
                    <img src="/images/svg/right-arrow.svg" alt="right arrow"/>
                </button>
                <div>Your Cart</div>
                <button>
                    <img src="/images/svg/cart.svg" alt="cart"/>
                </button>
            </div>
            <div className="content">
                {Object.keys(cart).map(productId => (
                    <CartItem key={productId} product={products[productId]} productAmount={cart[productId]}/>
                ))}
            </div>
        </div>
    );
};

export default Cart;
