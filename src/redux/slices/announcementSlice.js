import { createAppSlice } from '../createAppSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import announcementService from '@/service/announcement-service'

export const getAnnouncement = createAsyncThunk('announcement/getAnnouncement', async (_, { rejectWithValue }) => {
  try {
    const { data } = await announcementService.get()

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

const announcementSlice = createAppSlice({
  name: 'announcement',
  initialState: {
    loading: false,
    announcement: ''
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
    builder.addCase(getAnnouncement.pending, state => {
      state.loading = true
    })
    builder.addCase(getAnnouncement.fulfilled, (state, { payload }) => {
      state.announcement = payload
      state.loading = false
    })
    builder.addCase(getAnnouncement.rejected, state => {
      state.loading = false
    })
  }
})

export const { setLoading, resetState } = announcementSlice.actions

export const announcementActions = {
  setLoading,
  resetState
}
export default announcementSlice.reducer
