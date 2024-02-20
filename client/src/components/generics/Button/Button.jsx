import React from 'react'
import PropTypes from 'prop-types'

Button.propTypes = {
  className: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired
}

Button.defaultProps = {
  className: '',
  isLoading: false,
  isDisabled: false,
  type: 'submit',
  onClick: () => {}
}
function Button ({ className, isLoading, onClick, isDisabled, type, children }) {
  return <button type={type} onClick={onClick} disabled={isDisabled || isLoading} className={className}>{(isLoading && '...') || children}</button>
}

export default Button
