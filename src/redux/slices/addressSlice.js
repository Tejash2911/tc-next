import { createAsyncThunk } from '@reduxjs/toolkit'
import { createAppSlice } from '../createAppSlice'
import addressService from '@/service/address-service'

export const getUserAddress = createAsyncThunk('address/getUserAddress', async (_, { rejectWithValue }) => {
  try {
    const { data } = await addressService.getUserAddress()

    return data.address
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState = {
  address: null,
  loading: false
}

const addressSlice = createAppSlice({
  name: 'address',
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
    // get user address
    builder.addCase(getUserAddress.pending, state => {
      state.loading = true
    })
    builder.addCase(getUserAddress.fulfilled, (state, { payload }) => {
      state.loading = false
      state.address = payload ?? {}
    })
    builder.addCase(getUserAddress.rejected, state => {
      state.loading = false
    })
  }
})

export const { setLoading, resetState } = addressSlice.actions
export const addressActions = {
  setLoading,
  resetState
}
export default addressSlice.reducer
