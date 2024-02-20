import React from 'react'
import PropTypes from 'prop-types'

UserView.propTypes = {
  onClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
function UserView ({ onClick, user }) {
  return <div className="w-full shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)] text-cyan-500 hover:bg-cyan-300 cursor-pointer flex p-2" onClick={onClick}>
      <h3 className="text-xl w-1/2">{user?.name}</h3>
      <p className="w-1/2">{user?.email}</p>
  </div>
}

export default UserView
