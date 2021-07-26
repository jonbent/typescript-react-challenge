import {configureStore} from '@reduxjs/toolkit';
import ProductsSlice from "../reducers/ProductsSlice";
import UiSlice from "../reducers/UiSlice";
export const store = configureStore({
    reducer: {
        products: ProductsSlice,
        ui: UiSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
