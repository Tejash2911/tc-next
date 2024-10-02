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

export const getCartInfoByUserId = createAsyncThunk('cart/getCartInfoByUserId', async (id, { rejectWithValue }) => {
  try {
    const { data } = await cartService.getCartInfoByUserId(id)

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState = {
  loading: false,
  quantity: 0,
  cart: {}
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
    setCart: (state, { payload }) => {
      state.cart = { ...cart, payload }
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    resetState: () => {
      return { ...initialState }
    }
  },
  extraReducers: builder => {
    // get user cart size
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
    // get user cart info
    builder.addCase(getCartInfoByUserId.pending, state => {
      state.loading = true
    })
    builder.addCase(getCartInfoByUserId.fulfilled, (state, { payload }) => {
      state.cart = payload
      state.loading = false
    })
    builder.addCase(getCartInfoByUserId.rejected, state => {
      state.loading = false
    })
  }
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer
