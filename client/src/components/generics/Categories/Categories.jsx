import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { TiThMenu } from 'react-icons/ti'
import { useDispatch } from 'react-redux'
import { setCategory } from '../../../store/slices/SearchSlice'
function Categories () {
  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch()
  const handleMenuClick = useCallback(() => {
    setShowMenu(!showMenu)
  }, [showMenu])

  const handleTypeClick = useCallback((category) => () => {
    dispatch(setCategory(category))
  }, [])

  return <div className="text-purple-400 text-xl">
      <h1 className="text-3xl flex items-center" onClick={handleMenuClick}>Categories
            <TiThMenu/>
      </h1>
      {showMenu && <ul className="p-4 flex justify-around text-2xl flex-row border-purple-300 border-b-2">
          <li>
              <Link onClick={handleTypeClick('Action')} className="hover:underline" to={'/'}>Action</Link>
          </li>
          <li>
              <Link onClick={handleTypeClick('Adventure')} className="hover:underline" to={'/'}>Adventure</Link>
          </li>
          <li>
              <Link onClick={handleTypeClick('Horror')} className="hover:underline" to={'/'}>Horror</Link>
          </li>
          <li>
              <Link onClick={handleTypeClick('Science fiction')} className="hover:underline" to={'/'}>Science fiction</Link>
          </li>
          <li>
              <Link onClick={handleTypeClick('Fantasy')} className="hover:underline" to={'/'}>Fantasy</Link>
          </li>
          <li>
              <Link onClick={handleTypeClick('Drama')} className="hover:underline" to={'/'}></Link>
          </li>
          <li>
              <Link onClick={handleTypeClick('Comedy')} className="hover:underline" to={'/'}>Comedy</Link>
          </li>
          <li>
              <Link onClick={handleTypeClick('Documentary')} className="hover:underline" to={'/'}>Documentary</Link>
          </li>
          <li>
              <Link onClick={handleTypeClick('Romance')} className="hover:underline" to={'/'}>Romance</Link>
          </li>
      </ul>}
  </div>
}

export default Categories
