import { createAsyncThunk } from '@reduxjs/toolkit'
import cartService from '@/service/cart-service'
import { createAppSlice } from '../createAppSlice'

export const getCartSize = createAsyncThunk('cart/getCartSize', async (_, { rejectWithValue }) => {
  try {
    const { data } = await cartService.getCartSize()

    return { size: data.size }
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState = {
  loading: false,
  quantity: 0
}

const cartSlice = createAppSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: state => {
      state.quantity += 1
    },
    deleteProduct: state => {
      state.quantity -= 1
    },
    setProduct: (state, action) => {
      state.quantity = action.payload
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    resetState: () => {
      return { ...initialState }
    }
  },
  extraReducers: builder => {
    builder.addCase(getCartSize.pending, state => {
      state.loading = true
    })
    builder.addCase(getCartSize.fulfilled, (state, { payload: { size } }) => {
      state.quantity = size
      state.loading = false
    })
    builder.addCase(getCartSize.rejected, state => {
      state.loading = false
    })
  }
})

export const { addProduct, deleteProduct, setProduct, setLoading, resetState } = cartSlice.actions
export const cartActions = {
  addProduct,
  deleteProduct,
  setProduct,
  setLoading,
  resetState
}
export default cartSlice.reducer
