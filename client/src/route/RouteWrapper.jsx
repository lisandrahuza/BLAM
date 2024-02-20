import PropTypes from 'prop-types'
import React from 'react'

RouteWrapper.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
  element: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string)
}

function RouteWrapper ({ title, element: Element, layout: Layout, permissions, path }) {
  // console.log(title, permissions);
  return (
        <Layout>
            <Element/>
        </Layout>
  )
}

export default RouteWrapper
