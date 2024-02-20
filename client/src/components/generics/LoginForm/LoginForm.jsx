import React from 'react'
import * as yup from 'yup'
import Button from '../Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../../store/actions/userActions'

const schema = yup.object({
  email: yup.string().required('Email required').email('Invalid email format'),
  password: yup.string().required('Password required').matches(
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$/,
    'Invalid password format'
  )
}).required()

LoginForm.propTypes = {
  close: PropTypes.func.isRequired
}

function LoginForm ({ close }) {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector(state => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (obj) => {
    dispatch(loginAction(obj))
    close()
  }

  return <div className="rounded-xl bg-slate-50 absolute top-24 right-4">
      <div onClick={close} className="text-2xl text-white bg-violet-800 rounded-t-xl" style={{ cursor: 'pointer' }}>-</div>
      <form className="flex flex-col gap-2 text-xl text-violet-500 p-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
              <label className="text-left">Email:</label>
              <input className="rounded  focus:outline-none" placeholder="Your email..." {...register('email')} />
              {(errors.email && <span className="text-pink-600 text-sm">{errors?.email.message}</span>) ||
                  <div className="h-5"/>}
          </div>
          <div className="flex flex-col">
              <label className="text-left">Password:</label>
              <input type='password' className="rounded  focus:outline-none" {...register('password')} />
              {(errors.password && <span className="text-pink-600 text-sm">{errors?.password.message}</span>) ||
                  <div className="h-5"/>}
          </div>
          <Button isLoading={isLoading} className="p-3 bg-violet-500 rounded-xl text-white focus:outline-none">Login</Button>
          {(error && <span className="text-pink-600 text-sm">Something went wrong...</span>) ||
              <div className="h-5"/>}
      </form>
  </div>
}

export default LoginForm
