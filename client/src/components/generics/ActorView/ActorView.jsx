import React, { useCallback } from 'react'
// import image from '../../../assets/BradPitt.png'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { getPath } from '../../../route/RouteObject'

ActorView.propTypes = {
  actor: PropTypes.object.isRequired
}
function ActorView ({ actor }) {
  const navigate = useNavigate()
  const handleOnClick = useCallback(() => {
    const id = actor.id
    navigate(getPath('actor', { id }))
  }, [actor])
  return <div className="w-20 h-30 overflow-hidden cursor-pointer" onClick={handleOnClick}>
        <div>
            <img className="w-20 h-30 rounded-xl " src={actor?.image} alt="actor"/>
            <div>
                <h1 className="text-violet-300 ">{actor?.name}</h1>
            </div>
        </div>
    </div>
}
export default ActorView
