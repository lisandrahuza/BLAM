import React, { useEffect, useState } from 'react'
import { getPath } from '../../../route/RouteObject'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo.png'
import LoginButton from '../LoginButton'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchText } from '../../../store/slices/SearchSlice'
function Header () {
  const { category } = useSelector(state => state.search)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTimer, setSearchTimer] = useState(null)
  const [triggerSearch, setTriggerSearch] = useState(false)
  const dispatch = useDispatch()
  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value
    setSearchTerm(newSearchTerm)

    if (searchTimer) {
      clearTimeout(searchTimer)
    }

    setSearchTimer(
      setTimeout(() => {
        setTriggerSearch(true)
      }, 500)
    )
  }
  useEffect(() => {
    if (category) {
      setSearchTerm('')
    }
  }, [category])
  useEffect(() => {
    if (triggerSearch) {
      dispatch(setSearchText(searchTerm))
      setTriggerSearch(false)
      clearTimeout(searchTimer)
    }
  }, [triggerSearch, searchTerm, searchTimer])

  return (
        <div className="bg-gray-900 w-full text-slate-300 flex flex-row flex-wrap items-center text-4xl px-4 py-1">
            <Link className="cursor-pointer" to={getPath('home')}>
                <img src={Logo} alt="logo" className="h-32"/>
            </Link>
            <div className="flex flex-grow" />
            <input type="text" value={searchTerm} onChange={handleInputChange} className="w-8/12 focus:outline-none focus:border-4 rounded text-violet-500 border-violet-500"/>
            <div className="flex flex-grow" />
            <LoginButton/>
        </div>
  )
}

export default Header
