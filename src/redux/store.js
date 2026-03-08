import { combineReducers, configureStore } from '@reduxjs/toolkit'
import messageReducer from './slices/messageSlice'

const rootReducer = combineReducers({
  message: messageReducer
})

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NEXT_MODE === 'development'
  })

  return store
}

const store = makeStore()

export default store
