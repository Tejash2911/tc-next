import { v4 as uuid } from 'uuid'
import { createAppSlice } from '../createAppSlice'

const errorSlice = createAppSlice({
  name: 'error',
  initialState: {
    message: null,
    id: null
  },
  reducers: {
    setErrorMessage: (state, action) => {
      state.message = action.payload
      state.id = uuid()
    },
    clearError: state => {
      state.message = null
      state.id = null
    }
  }
})

export const errorActions = errorSlice.actions
export default errorSlice.reducer
