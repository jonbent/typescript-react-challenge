import {useEffect, useState} from 'react';
import jsonProducts from '../json/products.json';
import {ProductsState} from "../util/types";
import {useAppDispatch, useAppSelector} from "../util/hooks";
import {receiveProducts} from "../reducers/ProductsSlice";
import {setProductAmount, setOffset} from "../reducers/UiSlice";

import '../scss/ProductPage.scss';
import Pagination from "./Pagination";

const productsObject: ProductsState = {};
for (let i = 0; i < jsonProducts.length; i++){
    productsObject[jsonProducts[i].productId.value] = jsonProducts[i];
}
const filters = ["Alcohol", "Bakery", "Dairy & Eggs", "Drinks", "Frozen", "Home & Health", "Meat, Fish & Protein", "Pantry", "Pet Products", "Prepared", "Produce", "Snacks"]
function ProductPage() {
    const dispatch = useAppDispatch();
    const [selectedFilter, setSelectedFilter] = useState<string>('')
    let products: ProductsState = useAppSelector((state) => state.products.entries);
    const offset: number = useAppSelector(state => state.ui.pageOffset)
    const cart: {[key: string]: number} = useAppSelector(state => state.ui.cart)

    if (!!selectedFilter){
        const filteredProducts: ProductsState = {};
        for (const productId in products){
            if (products[productId].category === selectedFilter) filteredProducts[productId] = products[productId];
        }
        products = filteredProducts
    }

    const productKeys = Object.keys(products);

    useEffect(() => {
        dispatch(receiveProducts(productsObject));
    }, [dispatch]);

    return (
        <div className="ProductPage">
            <div className="product-filters">
                <span className="title">
                    Shop By Category
                </span>
                <div className="filter-container">
                    {filters.map((filter: string) => (
                        <span
                            key={filter}
                            onClick={() => setSelectedFilter(filter === selectedFilter ? '' : filter)}
                            className={selectedFilter === filter ? 'active' : ''}
                        >
                            {filter}
                        </span>
                    ))}
                </div>
            </div>
            <div className="product-container">
                {productKeys.slice(offset * 12, offset * 12 + 12).map((productKey: string) => (
                    <div key={productKey} className="product">
                        <div className="product-image-container">
                            <img src={products[productKey].imageUrl} alt="Product"/>
                        </div>
                        <div className="product-description">
                            <span className="product-name">{products[productKey].name.split(', ')[0]}</span>
                            {!!products[productKey].subtitle && <span className="product-subtitle">{products[productKey].subtitle}</span>}
                            <span className="product-price">{
                                (products[productKey].price / products[productKey].stepSize)
                                    .toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }
                                )
                            }</span>
                            <button
                                className={productKey in cart && cart[productKey] > 0 ? 'selected' : ''}
                                onClick={() => dispatch(setProductAmount([productKey, 1]))}>
                                    <img src="/images/svg/plus.svg" alt="plus svg"/>
                                    <div>Add To Cart</div>
                            </button>
                        </div>
                    </div>
                ))}
                {!productKeys.length && (
                    <div className="no-available-products">
                        <span>Sorry, but there were no products that matched your filters.</span>
                    </div>
                )}
                {(!!productKeys.length && productKeys.length > 12) && <div className="pagination-container">
                    <Pagination offset={offset} totalItems={productKeys.length} itemsOnPage={12} setCurPage={(page:number) => dispatch(setOffset(page))}/>
                </div>}
            </div>
        </div>
    );
};

export default ProductPage;
