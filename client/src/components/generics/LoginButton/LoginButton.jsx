import React, { useCallback, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import LoginForm from '../LoginForm'
import RegisterForm from '../RegisterForm'
import EditForm from '../EditForm'
import { BiSolidUserDetail } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import logoutImage from '../../../assets/logout.png'
import { logout } from '../../../store/slices/UserSlice'
import { useNavigate } from 'react-router-dom'
import { getPath } from '../../../route/RouteObject'

function LoginButton () {
  const { isAuthorized, data } = useSelector(state => state.user)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = useCallback(() => {
    setShowLogin(true)
    setShowRegister(false)
  }, [])

  const handleRegister = useCallback(() => {
    setShowLogin(false)
    setShowRegister(true)
  }, [])

  const handleEdit = useCallback(() => {
    setShowEdit(true)
  }, [])

  const handleAdmin = useCallback(() => {
    navigate(getPath('admin'))
    setShowEdit(true)
  }, [])

  const handleLogout = useCallback(() => {
    setShowLogin(false)
    setShowRegister(false)
    setShowEdit(false)
    dispatch(logout())
  }, [])

  return (
      <div className="w-2/12 rounded-xl text-2xl text-white bg-violet-500 p-2 text-center">
        {!isAuthorized && (
            <div className="flex flex-row justify-evenly items-center">
              <button className="hover:underline" onClick={handleLogin}>
                Login
              </button>
              |
              <button className="hover:underline" onClick={handleRegister}>
                Register
              </button>
            </div>
        )}
        {isAuthorized && (
            <div className="flex flex-row items-center gap-2">
              <FaUser/>
              {data.name}
              <div className="flex-1"/>
              {data.admin && <BiSolidUserDetail className='text-xl cursor-pointer' onClick={handleAdmin}/>}
              <BsThreeDotsVertical className="cursor-pointer" onClick={handleEdit}/>
              <button onClick={handleLogout}>
                <img src={logoutImage} alt="logout" style={{ width: '28px', height: '28px' }}/>
              </button>
            </div>
        )}
        {showLogin && <LoginForm close={() => setShowLogin(false)}/>}
        {showRegister && <RegisterForm close={() => setShowRegister(false)} />}
        {showEdit && <EditForm close={() => setShowEdit(false)} />}
      </div>
  )
}

export default LoginButton
