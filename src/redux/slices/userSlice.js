import { createAppSlice } from '../createAppSlice'

const initialState = {
  currentUser: null,
  address: null,
  isFetching: false,
  isError: false,
  error: null
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
    resetError: state => {
      state.error = null
      state.isError = null
    },
    setAddress: (state, action) => {
      state.address = action.payload
      localStorage.setItem('address', JSON.stringify(action.payload))
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload }
    },

    //login
    loginSuccess: (state, action) => {
      state.isFetching = false
      state.currentUser = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
      state.isError = false
    },
    Failed: (state, action) => {
      state.isFetching = false
      state.isError = action.payload
    },

    //signup
    signUpSuccess: (state, action) => {
      state.isFetching = false
      state.isError = false
      state.currentUser = action.payload
    },
    signUpFailed: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    }
  }
})

export const {
  Start,
  loginSuccess,
  Failed,
  logoutUser,
  signUpSuccess,
  signUpFailed,
  resetError,
  setAddress,
  updateUser
} = userSlice.actions
export default userSlice.reducer
