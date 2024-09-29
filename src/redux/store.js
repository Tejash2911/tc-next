import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import cartReducer from './slices/cartSlice'
import errorReducer from './slices/errorSlice'
import announcementReducer from './slices/announcementSlice'
import productReducer from './slices/productSlice'
import reviewReducer from './slices/reviewSlice'

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  error: errorReducer,
  announcement: announcementReducer,
  product: productReducer,
  review: reviewReducer
})

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer
  })

  return store
}

const store = makeStore()

export default store
