import { createAsyncThunk } from '@reduxjs/toolkit'
import { createAppSlice } from '../createAppSlice'
import reviewService from '@/service/review-service'

export const getAllReviewByProductId = createAsyncThunk(
  'review/getAllReviewByProductId',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await reviewService.getAll(payload)

      return { data: Array.isArray(data) ? data : [] }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const addReview = createAsyncThunk('review/addReview', async (payload, { rejectWithValue }) => {
  try {
    const res = await reviewService.add(payload)

    return res
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const upvoteReview = createAsyncThunk('review/upvoteReview', async (id, { rejectWithValue }) => {
  try {
    const { data } = await reviewService.upvote(id)

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const abuseReview = createAsyncThunk('review/abuseReview', async (id, { rejectWithValue }) => {
  try {
    const { data } = await reviewService.abuse(id)

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState = {
  loading: false,
  reviews: []
}

const reviewSlice = createAppSlice({
  name: 'review',
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
    // get all review by product id
    builder.addCase(getAllReviewByProductId.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllReviewByProductId.fulfilled, (state, { payload: { data } }) => {
      state.reviews = data
      state.loading = false
    })
    builder.addCase(getAllReviewByProductId.rejected, state => {
      state.loading = false
    })
    // add review
    builder.addCase(addReview.pending, state => {
      state.loading = true
    })
    builder.addCase(addReview.fulfilled, (state, { payload: { data } }) => {
      state.reviews = data
      state.loading = false
    })
    builder.addCase(addReview.rejected, state => {
      state.loading = false
    })
    // upvote review
    builder.addCase(upvoteReview.pending, state => {
      state.loading = false
    })
    builder.addCase(upvoteReview.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(upvoteReview.rejected, state => {
      state.loading = false
    })
    // abuse review
    builder.addCase(abuseReview.pending, state => {
      state.loading = false
    })
    builder.addCase(abuseReview.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(abuseReview.rejected, state => {
      state.loading = false
    })
  }
})

export const reviewActions = reviewSlice.actions
export default reviewSlice.reducer
