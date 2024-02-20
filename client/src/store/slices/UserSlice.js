import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  isAuthorized: false,
  isLoading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startRequest (state) {
      return { ...state, isLoading: true, error: null }
    },
    loginSuccess (state, action) {
      return { ...state, isLoading: false, data: action.payload, isAuthorized: true }
    },
    failureRequest (state, action) {
      return { ...state, isLoading: false, error: action.payload }
    },
    finishedRequest (state) {
      return { ...state, isLoading: false }
    },
    logout () {
      return initialState
    }
  }
})

const userReducer = userSlice.reducer
export default userReducer
export const { startRequest, loginSuccess, failureRequest, logout, finishedRequest } = userSlice.actions
