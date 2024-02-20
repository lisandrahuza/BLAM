import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/UserSlice'
import searchReducer from './slices/SearchSlice'
import movieReducer from './slices/MovieSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    movie: movieReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
