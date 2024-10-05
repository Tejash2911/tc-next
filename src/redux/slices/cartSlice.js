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
    const { data } = await cartService.getById(id)

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const addToCart = createAsyncThunk('cart/addToCart', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await cartService.add(payload)

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const updateCartQtyById = createAsyncThunk('cart/updateCartQtyById', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await cartService.updateCartQtyById(payload)

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const deleteCartItemById = createAsyncThunk('cart/deleteCartItemById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await cartService.deleteById(id)

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
    // add to cart
    builder.addCase(addToCart.pending, state => {
      state.loading = true
    })
    builder.addCase(addToCart.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(addToCart.rejected, state => {
      state.loading = false
    })
    // update cart quantity by id
    builder.addCase(updateCartQtyById.pending, state => {
      state.loading = true
    })
    builder.addCase(updateCartQtyById.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(updateCartQtyById.rejected, state => {
      state.loading = false
    })
    // delete cart item by id
    builder.addCase(deleteCartItemById.pending, state => {
      state.loading = true
    })
    builder.addCase(deleteCartItemById.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(deleteCartItemById.rejected, state => {
      state.loading = false
    })
  }
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer
