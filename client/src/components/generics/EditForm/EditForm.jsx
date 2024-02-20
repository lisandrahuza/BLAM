import React from 'react'
import * as yup from 'yup'
import Button from '../Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { editAction } from '../../../store/actions/userActions'

const schema = yup.object({
  username: yup.string().required('Username required'),
  password: yup.string().required('Password required').matches(
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$/,
    'Invalid password format'
  ),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
}).required()

EditForm.propTypes = {
  close: PropTypes.func.isRequired
}

function EditForm ({ close }) {
  const dispatch = useDispatch()
  const { isLoading, data, error } = useSelector(state => state.user)

  // State and form logic for username modification
  const {
    register: registerUsername,
    handleSubmit: handleSubmitUsername,
    formState: { errors: errorsUsername }
  } = useForm({ resolver: yupResolver(schema.pick('username')) })

  const onSubmitUsername = (formData) => {
    const { username } = formData
    const obj = {
      id: data.id,
      name: username,
      email: data.email,
      password: data.password
    }
    dispatch(editAction(obj))
  }

  // State and form logic for password modification
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword }
  } = useForm({ resolver: yupResolver(schema.pick('password', 'confirmPassword')) })

  const onSubmitPassword = (formData) => {
    const { password } = formData
    const obj = {
      id: data.id,
      name: data.name,
      email: data.email,
      password
    }
    dispatch(editAction(obj))
  }

  return (
        <div className="rounded-xl bg-slate-50 absolute top-24 right-4">
            <div onClick={close} className="text-2xl text-white bg-violet-800 rounded-t-xl" style={{ cursor: 'pointer' }}>-
            </div>

            {/* Username modification form */}
            <form className="flex flex-col gap-2 text-xl text-violet-500 p-2" onSubmit={handleSubmitUsername(onSubmitUsername)}>
                <div className="flex flex-col">
                    <label className="text-left">Username:</label>
                    <input className="rounded focus:outline-none" placeholder="New username..." {...registerUsername('username')} />
                    {(errorsUsername.username && <span className="text-pink-600 text-sm">{errorsUsername?.username.message}</span>) || <div className="h-5"/>}
                </div>
                <Button isLoading={isLoading} className="p-3 bg-violet-500 rounded-xl text-white focus:outline-none">Modify username</Button>
            </form>

            {/* Password modification form */}
            <form className="flex flex-col gap-2 text-xl text-violet-500 p-2" onSubmit={handleSubmitPassword(onSubmitPassword)}>
                <div className="flex flex-col">
                    <label className="text-left">Password:</label>
                    <input type='password' className="rounded focus:outline-none" placeholder="New password" {...registerPassword('password')} />
                    {(errorsPassword.password && <span className="text-pink-600 text-sm">{errorsPassword?.password.message}</span>) || <div className="h-5"/>}
                </div>
                <div className="flex flex-col">
                    <label className="text-left">Confirm Password:</label>
                    <input type='password' className="rounded focus:outline-none" placeholder="Confirm new password" {...registerPassword('confirmPassword')} />
                    {(errorsPassword.confirmPassword && <span className="text-pink-600 text-sm">{errorsPassword?.confirmPassword.message}</span>) || <div className="h-5"/>}
                </div>
                <Button isLoading={isLoading} className="p-3 bg-violet-500 rounded-xl text-white focus:outline-none">Modify password</Button>
                {(error && <span className="text-pink-600 text-sm">Something went wrong...</span>) || <div className="h-5"/>}
            </form>
        </div>
  )
}

export default EditForm
