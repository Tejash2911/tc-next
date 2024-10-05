import { createAsyncThunk } from '@reduxjs/toolkit'
import { createAppSlice } from '../createAppSlice'
import productService from '@/service/product-service'

export const getAllProducts = createAsyncThunk('product/getAllProducts', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await productService.getAll(payload)

    return { products: Array.isArray(data.data) ? data.data : [] }
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getSearchProducts = createAsyncThunk('product/getSearchProducts', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await productService.getSearchProducts(payload)

    return { products: Array.isArray(data) ? data : [] }
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getProductById = createAsyncThunk('product/getProductById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await productService.getById(id)

    return data ?? {}
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState = {
  loading: false,
  products: [],
  searchProducts: [],
  product: {}
}

const productSlice = createAppSlice({
  name: 'product',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    resetState: () => {
      return { ...initialState }
    },
    resetProduct: state => {
      state.product = {}
    },
    resetProducts: state => {
      state.products = []
    }
  },
  extraReducers: builder => {
    // get all products
    builder.addCase(getAllProducts.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllProducts.fulfilled, (state, { payload: { products } }) => {
      state.products = products // Reset for new filter
      state.loading = false
    })
    builder.addCase(getAllProducts.rejected, state => {
      state.loading = false
      state.products = []
    })
    // get search products
    builder.addCase(getSearchProducts.pending, state => {
      state.loading = false
    })
    builder.addCase(getSearchProducts.fulfilled, (state, { payload: { products } }) => {
      state.searchProducts = products
      state.loading = false
    })
    builder.addCase(getSearchProducts.rejected, state => {
      state.loading = false
      state.searchProducts = []
    })
    // get product by id
    builder.addCase(getProductById.pending, state => {
      state.loading = true
    })
    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      state.product = payload
      state.loading = false
    })
    builder.addCase(getProductById.rejected, state => {
      state.loading = false
    })
  }
})

export const productActions = productSlice.actions
export default productSlice.reducer
