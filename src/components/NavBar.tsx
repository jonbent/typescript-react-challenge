import '../scss/NavBar.scss';
import {useState} from "react";
import {useAppSelector} from "../util/hooks";
import CartItem from "./CartItem";
import {useOutsideClickHandler} from "../util/useOutsideClickHandler";
import {ProductsState} from "../util/types";
import {NavLink, Link} from "react-router-dom";

const NavBar = ({cartButtonEnabled, openCart}: {cartButtonEnabled: boolean, openCart: () => void}) => {
    const [search, setSearch] = useState<string>('');
    const cart: {[productId: string]: number} = useAppSelector(state => state.ui.cart);
    const products: ProductsState = useAppSelector(state => state.products.entries);
    const [openState, setOpenState] = useState<boolean>(false);

    // get total notifications
    const cartKeys: Array<string> = [];
    let notifications: number = 0;
    for (const productId in cart){
        cartKeys.push(productId);
        notifications += cart[productId];
    }


    const handleClickOutside = () => {
        setOpenState(false);
    }
    const ref = useOutsideClickHandler(handleClickOutside)
    return (
        <div className="NavBar">
            <Link to="/"><img alt="Juniper Logo" src="/images/logos/JuniperLogo.png" srcSet="/images/logos/JuniperLogo-500.png 500w, /images/logos/JuniperLogo-800.png 800w, /images/logos/JuniperLogo-1080.png 1080w, /images/logos/JuniperLogo.png 1268w"/></Link>
            <div className="searchBar" >
                <input type="text" onChange={e => setSearch(e.target.value)} value={search} placeholder="Search Juniper"/>
                <img src="/images/svg/magnifying-glass.svg" alt="Magnifying Glass"/>
            </div>
            <div className="actions">
                <Link to="/missingPage">Get $20 off</Link>
                {!!cartKeys.length && (
                    <div className="cart-icon" ref={ref}>
                        <img src="/images/svg/cart.svg" alt="cart" onClick={() => setOpenState(!openState)}/>
                        <span>Cart</span>
                        <div className="cart-notification">
                            <div>{notifications}</div>
                        </div>
                        {openState && (
                            <div className="nav-cart">
                                {cartKeys.map(productId => (
                                    <CartItem key={productId} product={products[productId]} productAmount={cart[productId]}/>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {cartButtonEnabled && (
                    <div className="full-width-cart-icon" onClick={openCart}>
                        <img src="/images/svg/cart.svg" alt="cart"/>
                        <span>Cart</span>
                        <div className="cart-notification">
                            <div>{notifications}</div>
                        </div>
                    </div>
                )}
                <NavLink to="/missingPage" className="nav-link" activeClassName="active">
                    <img src="/images/svg/book.svg" alt="book"/>
                    <span>Recipes</span>
                </NavLink>
                <NavLink exact to="/" className="nav-link" activeClassName="active">
                    <img src="/images/svg/shop.svg" alt="shop"/>
                    <span>Shop</span>
                </NavLink>
                <NavLink to="/missingPage" className="nav-link headshot-link" activeClassName="active">
                    <img src="/images/headshot.png" alt="headshot"/>
                    <span>Profile</span>
                </NavLink>
                <NavLink to="/missingPage" className="nav-link" activeClassName="active">
                    <img src="/images/svg/settings.svg" className="rotate" alt="settings"/>
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    );
};

export default NavBar;
