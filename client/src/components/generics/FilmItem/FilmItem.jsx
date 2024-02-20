import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import batphoto from '../../../assets/batman.jpeg'
import { useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { getPath } from '../../../route/RouteObject'

FilmItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  genres: PropTypes.string,
  rating: PropTypes.number.isRequired
}

FilmItem.defaultProps = {
  id: '01',
  title: 'Batmanaaaaaaaaaaaa',
  image: batphoto,
  description: 'good enough...',
  genres: 'Action',
  rating: 2075
}

function FilmItem ({ id, title, image, description, genres, rating }) {
  const navigate = useNavigate()
  const handleClick = useCallback(() => {
    navigate(getPath('movie', { id }))
  }, [])
  const rat = Math.min((rating / 1000).toFixed(2), 10)
  return <div className="p-4 border-2 border-violet-500 flex h-[30rem] w-[20rem] flex-col text-violet-800  rounded-xl hover:bg-violet-400 cursor-pointer" onClick={handleClick}>
    <img className="h-[20rem]" src={image} alt="movie thumbnail"/>
    <div className="p-2">
      <div className="flex text-3xl flex-row gap-3">
        <h1 className='truncate'>{title}</h1>
        <p className="flex flex-row"><FaStar />{rat}</p>
      </div>
      <h3 className='truncate'>{genres | ''}</h3>
      <p className='truncate'>{description}</p>
    </div>
  </div>
}

export default FilmItem
