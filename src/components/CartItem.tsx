import {useAppDispatch} from "../util/hooks";

import {ProductType} from "../util/types";
import {decrementProductAmount, incrementProductAmount, setProductAmount} from "../reducers/UiSlice";
import {ChangeEvent} from "react";
import '../scss/CartItem.scss';
const CartItem = ({product, productAmount}: {product: ProductType, productAmount: number}) => {
    const dispatch = useAppDispatch();
    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>, productId: string) => {
        const value = Number(event.target.value)
        if (!isNaN(value)){
            dispatch(setProductAmount([productId, value]))
        }
    }
    return (
        <div className="CartItem">
            <img src={product.imageUrl} alt={product.name} className="cart-image"/>
            <div className="product-name">
                <span>{product.name}</span>
            </div>
            <div className="product-actions">
                <button onClick={() => dispatch(incrementProductAmount(product.productId.value))}>
                    <img src="/images/svg/carat-arrow.svg" alt="up arrow"/>
                </button>
                <input
                    type="text"
                    value={productAmount}
                    onChange={(event) => handleQuantityChange(event, product.productId.value)}
                />
                <button onClick={() => dispatch(decrementProductAmount(product.productId.value))}>
                    <img src="/images/svg/carat-arrow.svg" alt="down arrow"/>
                </button>
            </div>
        </div>
    );
};

export default CartItem;
