import Header from '../../generics/Header'
import React from 'react'
import PropTypes from 'prop-types'

GenericLayout.propTypes = {
  children: PropTypes.node.isRequired
}
function GenericLayout ({ children }) {
  return (
        <div className="h-screen w-full flex flex-col items-center bg-black">
            <Header />
            {children}
        </div>
  )
}
export default GenericLayout
