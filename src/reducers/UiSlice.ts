import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: {pageOffset: number, cart: {[key:string]: any}} = {pageOffset:0, cart: {}}

export const UiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        incrementOffset(state){
            state.pageOffset += 10;
        },
        decrementOffset(state){
            state.pageOffset -= 10;
        },
        setOffset(state, action: PayloadAction<number>){
            state.pageOffset = action.payload
        },
        // give product to add in the following format:
        // Array(productId, numberOfProductToAdd)
        setProductAmount(state, action: PayloadAction<[string, number]>) {
            if (action.payload[1] === 0){
                delete state.cart[action.payload[0]]
            } else {
                state.cart[action.payload[0]] = action.payload[1]
            }
        },
        incrementProductAmount(state, action: PayloadAction<string>){
            state.cart[action.payload] += 1;
        },
        decrementProductAmount(state, action: PayloadAction<string>){
            if (state.cart[action.payload] >= 2){
                state.cart[action.payload] -= 1;
            } else {
                delete state.cart[action.payload]
            }
        },
        removeProduct(state, action: PayloadAction<string>) {
            delete state.cart[action.payload]
        }
    }
})
export const {incrementOffset, decrementOffset, setOffset, setProductAmount, incrementProductAmount, decrementProductAmount, removeProduct} = UiSlice.actions;
export default UiSlice.reducer;
