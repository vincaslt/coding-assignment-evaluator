import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import style from './style.css'

const Input = ({ ...props, multiline }) => (
  multiline ?
    <textarea styleName="input" {...props} /> :
    <input styleName="input" {...props} />
)

Input.propTypes = {
  multiline: PropTypes.bool
}

Input.defaultProps = {
  multiline: false
}

export default CSSModules(Input, style)
