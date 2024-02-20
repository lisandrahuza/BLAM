import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  isLoading: false,
  error: null
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    startMovieRequest (state) {
      return { ...state, isLoading: true, error: null }
    },
    failureMovieRequest (state, action) {
      return { ...state, isLoading: false, error: action.payload }
    },
    successMovieRequest (state, action) {
      return { ...state, isLoading: false, data: action.payload }
    }
  }
})

const movieReducer = movieSlice.reducer
export default movieReducer
export const { startMovieRequest, successMovieRequest, failureMovieRequest } = movieSlice.actions
