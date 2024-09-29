import { createAsyncThunk } from '@reduxjs/toolkit'
import { createAppSlice } from '../createAppSlice'
import productService from '@/service/productService'

export const getSearchProducts = createAsyncThunk('product/getSearchProducts', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await productService.getSearchProducts(payload)

    return { products: Array.isArray(data) ? data : [] }
  } catch (error) {
    return rejectWithValue(error)
  }
})

const productSlice = createAppSlice({
  name: 'product',
  initialState: {
    loading: false,
    searchProducts: []
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    resetState: () => {
      return { ...initialState }
    }
  },
  extraReducers: builder => {
    builder.addCase(getSearchProducts.pending, state => {
      state.loading = true
    })
    builder.addCase(getSearchProducts.fulfilled, (state, { payload: { products } }) => {
      state.searchProducts = products
      state.loading = false
    })
    builder.addCase(getSearchProducts.rejected, state => {
      state.loading = false
      state.searchProducts = []
    })
  }
})

export const { setLoading, resetState } = productSlice.actions

export const productActions = {
  setLoading,
  resetState
}
export default productSlice.reducer
