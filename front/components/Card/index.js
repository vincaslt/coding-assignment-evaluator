import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import style from './style.css'

const Card = ({ headerText, children }) => {
  const header = headerText ? (
    <div styleName="header">
      {headerText}
    </div>
  ) : null

  return (
    <div styleName="card">
      {header}
      <div styleName="content">
        {children}
      </div>
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  headerText: PropTypes.string
}

Card.defaultProps = {
  headerText: null
}

export default CSSModules(Card, style)
