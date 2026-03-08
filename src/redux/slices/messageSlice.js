import { v4 as uuid } from 'uuid'
import { createAppSlice } from '../createAppSlice'

const messageSlice = createAppSlice({
  name: 'message',
  initialState: {
    message: null,
    id: null
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
      state.id = uuid()
    },
    clearMessage: state => {
      state.message = null
      state.id = null
    }
  }
})

export const messageActions = messageSlice.actions
export default messageSlice.reducer
