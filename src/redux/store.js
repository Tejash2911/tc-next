import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import cartReducer from './slices/cartSlice'
import errorReducer from './slices/errorSlice'
import announcementReducer from './slices/announcementSlice'
import productReducer from './slices/productSlice'
import reviewReducer from './slices/reviewSlice'
import addressReducer from './slices/addressSlice'
import orderReducer from './slices/orderSlice'

const rootReducer = combineReducers({
  user: userReducer,
  address: addressReducer,
  cart: cartReducer,
  error: errorReducer,
  announcement: announcementReducer,
  product: productReducer,
  review: reviewReducer,
  order: orderReducer
})

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer
  })

  return store
}

const store = makeStore()

export default store
