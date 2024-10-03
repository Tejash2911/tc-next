import { createAsyncThunk } from '@reduxjs/toolkit'
import { createAppSlice } from '../createAppSlice'
import orderService from '@/service/order-service'

export const getOrdersByUserId = createAsyncThunk('order/getOrdersByUserId', async (id, { rejectWithValue }) => {
  try {
    const { data } = await orderService.getByUserId(id)

    return Array.isArray(data) ? data : []
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState = {
  loading: false,
  orders: []
}

const orderSlice = createAppSlice({
  name: 'order',
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
    // get orders by user id
    builder.addCase(getOrdersByUserId.pending, state => {
      state.loading = true
    })
    builder.addCase(getOrdersByUserId.fulfilled, (state, { payload }) => {
      state.orders = payload
      state.loading = false
    })
    builder.addCase(getOrdersByUserId.rejected, state => {
      state.loading = false
    })
  }
})

export const orderActions = orderSlice.actions
export default orderSlice.reducer
