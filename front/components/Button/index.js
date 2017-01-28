import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import style from './style.css'

const Button = ({ children, ...props }) => (
  <button styleName="button" {...props}>
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.node.isRequired
}

export default CSSModules(Button, style)
