import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchText: '',
  category: '',
  isLoading: false,
  error: null
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    startSearchRequest (state) {
      return { ...state, isLoading: true, error: null }
    },
    failureSearchRequest (state, action) {
      return { ...state, isLoading: false, error: action.payload }
    },
    finishedSearchRequest (state) {
      return { ...state, isLoading: false }
    },
    setCategory (state, action) {
      return { ...state, category: action.payload, searchText: '' }
    },
    setSearchText (state, action) {
      return { ...state, searchText: action.payload, category: '' }
    }
  }
})

const searchReducer = searchSlice.reducer
export default searchReducer
export const { startSearchRequest, setSearchText, setCategory, failureSearchRequest, finishedSearchRequest } = searchSlice.actions
