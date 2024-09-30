import { createAsyncThunk } from '@reduxjs/toolkit'
import { createAppSlice } from '../createAppSlice'
import userService from '@/service/user-service'

export const login = createAsyncThunk('user/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await userService.login(payload)

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const register = createAsyncThunk('user/register', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await userService.register(payload)

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const updateUser = createAsyncThunk('user/updateUser', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await userService.update(payload)

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getUserAddress = createAsyncThunk('user/getUserAddress', async (_, { rejectWithValue }) => {
  try {
    const { data } = await userService.getUserAddress()

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState = {
  currentUser: null,
  address: null,
  loading: false
}

if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('user')

  initialState.currentUser = storedUser ? JSON.parse(storedUser) : null
}

if (typeof window !== 'undefined') {
  const storedUserAddress = localStorage.getItem('address')

  initialState.address = storedUserAddress ? JSON.parse(storedUserAddress) : null
}

const userSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: state => {
      state.currentUser = null
      localStorage.removeItem('user')
      state.address = null
    },
    setAddress: (state, action) => {
      state.address = action.payload
      localStorage.setItem('address', JSON.stringify(action.payload))
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    resetState: () => {
      return { ...initialState }
    }
  },
  extraReducers: builder => {
    // login
    builder.addCase(login.pending, state => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false
      state.currentUser = payload
      localStorage.setItem('user', JSON.stringify(payload))
    })
    builder.addCase(login.rejected, state => {
      state.loading = false
    })
    // register
    builder.addCase(register.pending, state => {
      state.loading = true
    })
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.loading = false
      state.currentUser = payload
    })
    builder.addCase(register.rejected, state => {
      state.loading = false
    })
    // update user
    builder.addCase(updateUser.pending, state => {
      state.loading = true
    })
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.loading = false
      state.currentUser = payload
    })
    builder.addCase(updateUser.rejected, state => {
      state.loading = false
    })
    // get user address
    builder.addCase(getUserAddress.pending, state => {
      state.loading = true
    })
    builder.addCase(getUserAddress.fulfilled, (state, { payload }) => {
      state.loading = false
      state.address = payload.data.address
    })
    builder.addCase(getUserAddress.rejected, state => {
      state.loading = false
    })
  }
})

export const { logoutUser, setAddress, setLoading, resetState } = userSlice.actions
export const userActions = {
  logoutUser,
  setAddress,
  setLoading,
  resetState
}
export default userSlice.reducer
