import React from 'react'
import PropTypes from 'prop-types'

FullLayout.propTypes = {
  children: PropTypes.node.isRequired
}
function FullLayout ({ children }) {
  return (
      <div className="h-screen w-full flex flex-col items-center bg-black">
        {children}
      </div>
  )
}

export default FullLayout
