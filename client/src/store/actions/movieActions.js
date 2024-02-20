import { failureMovieRequest, startMovieRequest, successMovieRequest } from '../slices/MovieSlice'
import ApiClient from '../../libs/api/ApiClient'

const fetchMovieAction = (id) => {
  return ApiClient.getMovieById(id, {
    start: startMovieRequest,
    success: successMovieRequest,
    failure: failureMovieRequest
  })
}

export { fetchMovieAction }
