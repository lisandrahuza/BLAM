import ApiClient from '../../libs/api/ApiClient'
import { failureRequest, finishedRequest, loginSuccess, startRequest } from '../slices/UserSlice'

// const fetchCredentialsSuccess = (navigate) => (response) => {
//   navigate(getPath('home'))
//   return loginSuccess({
//     // de completat
//   })
// }

const loginAction = (data) => {
  return ApiClient.login(data, {
    start: startRequest,
    success: loginSuccess,
    failure: failureRequest
  })
}

const registerAction = (data) => {
  return ApiClient.register(data, {
    start: startRequest,
    success: finishedRequest,
    failure: failureRequest
  })
}

const editAction = (data) => {
  return ApiClient.updateUser(data, {
    start: startRequest,
    success: loginSuccess,
    failure: failureRequest
  })
}
export { loginAction, registerAction, editAction }
