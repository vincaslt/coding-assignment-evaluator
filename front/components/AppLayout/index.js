import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import style from './style.css'

const AppLayout = ({ children }) => (
  <div styleName="content-container">
    <div styleName="content">
      {children}
    </div>
  </div>
)

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default CSSModules(AppLayout, style)
