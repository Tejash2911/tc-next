import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlilce'
import cartReducer from './features/cart/cartSlice'
import errorReducer from './features/error/errorSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            cart: cartReducer,
            error: errorReducer,
        },
    })
}