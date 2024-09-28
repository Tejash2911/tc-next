import cartService from '@/service/cart-service'
import { createAppSlice } from '../createAppSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getCartSize = createAsyncThunk('cart/getCartSize', async (_, { rejectWithValue }) => {
  try {
    const { data } = await cartService.getCartSize()

    return { size: data.size }
  } catch (error) {
    return rejectWithValue(error)
  }
})

const cartSlice = createAppSlice({
  name: 'cart',
  initialState: {
    loading: false,
    quantity: 0
  },
  reducers: {
    addProduct: state => {
      state.quantity += 1
    },
    deleteProduct: state => {
      state.quantity -= 1
    },
    setProduct: (state, action) => {
      state.quantity = action.payload
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

export const { addProduct, deleteProduct, setProduct } = cartSlice.actions
export default cartSlice.reducer
