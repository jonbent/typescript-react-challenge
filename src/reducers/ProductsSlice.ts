import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ProductsState} from "../util/types";

const initialState: {entries: ProductsState} = {entries: {}};

export const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      receiveProducts: (state, action: PayloadAction<ProductsState> ) => {
        state.entries = action.payload;
      }
    }
})
export const {receiveProducts} = ProductsSlice.actions;


export default ProductsSlice.reducer;
