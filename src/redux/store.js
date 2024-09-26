import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import cartReducer from './slices/cartSlice'
import errorReducer from './slices/errorSlice'

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  error: errorReducer
})

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer
  })
  return store
}

const store = makeStore()

export default store
