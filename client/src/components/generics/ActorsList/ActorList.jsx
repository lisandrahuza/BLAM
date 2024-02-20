import React from 'react'
import ActorView from '../ActorView'
import PropTypes from 'prop-types'

ActorList.propTypes = {
  actors: PropTypes.array.isRequired
}
function ActorList ({ actors }) {
  const renderedActors = actors?.map((actor, index) => {
    return <ActorView key={index} actor={actor}/>
  })

  return <div className="h-full overflow-y-auto scrollbar scrollbar-thumb-purple-950 scrollbar-thumb-rounded-full p-6">
    <div className="grid grid-cols-7 gap-6">
      {renderedActors}
    </div>
  </div>
}

export default ActorList
