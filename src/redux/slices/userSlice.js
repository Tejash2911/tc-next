import { createAsyncThunk } from '@reduxjs/toolkit'
import { createAppSlice } from '../createAppSlice'
import userService from '@/service/user-service'

export const login = createAsyncThunk('user/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await userService.login(payload)

    return data?.data
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

export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    const { data } = await userService.logout()

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

const initialState = {
  currentUser: null,
  address: null,
  loading: false
}

if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('user')

  initialState.currentUser = storedUser ? JSON.parse(storedUser) : null
}

const userSlice = createAppSlice({
  name: 'user',
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
    // logout
    builder.addCase(logout.pending, state => {
      state.loading = true
    })
    builder.addCase(logout.fulfilled, state => {
      state.loading = false
      state.currentUser = null
      localStorage.removeItem('user')
      state.address = null
    })
    builder.addCase(logout.rejected, state => {
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
  }
})

export const userActions = userSlice.actions
export default userSlice.reducer
