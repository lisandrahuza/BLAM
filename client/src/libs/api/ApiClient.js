import config from '../config'
import axios from 'axios'

class ApiClientClass {
  constructor () {
    this.axios = axios.create({
      baseURL: config.apiBaseUrl,
      timeout: 30000
    })
  }

  getAxios () {
    return this.axios
  }

  register (payload, callbacks) {
    return this.doRequest(
      {
        method: 'post',
        url: '/api/v1/user',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          is_admin: false
        }
      },
      callbacks
    )
  }

  login (payload, callbacks) {
    return this.doRequest(
      {
        method: 'post',
        url: '/api/v1/user/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      },
      callbacks
    )
  }

  updateUserByAdmin (payload) {
    return this.doRequest(
      {
        method: 'put',
        url: '/api/v1/user/admin/modifyUser',
        data: {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          password: payload.password,
          is_admin: payload.admin
        }
      }
    )
  }

  getUsers () {
    return this.doRequest(
      {
        method: 'get',
        url: '/api/v1/user'
      }
    )
  }

  getCommsByUserId (payload) {
    return this.doRequest(
      {
        method: 'get',
        url: '/api/v1/review/review/getReviewUser',
        data: {
          user: payload
        }
      }
    )
  }

  getCommsByUserMovie (payload) {
    return this.doRequest(
      {
        method: 'get',
        url: '/api/v1/review/review/getReviewFilm',
        data: {
          film: payload
        }
      }
    )
  }

  editReview (payload) {
    return this.doRequest(
      {
        method: 'put',
        url: '/api/v1/review/review/editReview',
        data: {
          idReview: payload.id,
          mesaj: payload.message
        }
      }
    )
  }

  addReview (payload) {
    return this.doRequest(
      {
        method: 'post',
        url: '/api/v1/review',
        data: {
          mesaj: payload.message,
          user: payload.user,
          rating: payload.rating,
          film: payload.film
        }
      }
    )
  }

  getMoviesBySearch (payload) {
    return this.doRequest(
      {
        method: 'get',
        url: `/movie/${payload}`
      }
    )
  }

  getMoviesByCategory (payload) {
    return this.doRequest(
      {
        method: 'get',
        url: `/movie/category/${payload}`
      }
    )
  }

  getMovieById (payload, callbacks) {
    return this.doRequest(
      {
        method: 'get',
        url: `/movie/idMovieDetails/${payload}`
      }, callbacks
    )
  }

  getActor (payload) {
    return this.doRequest(
      {
        method: 'get',
        url: `/actor/idActorDetails/${payload}`
      }
    )
  }

  updateUser (payload, callbacks) {
    return this.doRequest(
      {
        method: 'put',
        url: '/api/v1/user/modifyUser',
        data: {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      }, callbacks
    )
  }

  deleteUser (payload) {
    return this.doRequest(
      {
        method: 'delete',
        url: `/api/v1/user/${payload}`
      }
    )
  }

  deleteReview (payload) {
    return this.doRequest(
      {
        method: 'delete',
        url: `/api/v1/review/${payload}`
      }
    )
  }

  doRequest (options, callbacks) {
    if (!callbacks) {
      return this.axios(options).then((response) => { return response.data })
        .catch((error) => {
          return error
        })
    }

    const { start, success, failure } = callbacks
    return (dispatch) => {
      if (start) {
        dispatch(start())
      }
      return this.axios(options)
        .then((response) => {
          if (response.data.error && failure) {
            return dispatch(failure(response.data.error))
          }
          if (success) {
            return dispatch(success(response.data))
          }
        })
        .catch((error) => {
          if (failure) {
            return dispatch(failure(error))
          }
        })
    }
  }
}

const ApiClient = new ApiClientClass()
export default ApiClient
