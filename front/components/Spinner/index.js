import React from 'react'
import CSSModules from 'react-css-modules'
import style from './style.css'

const Spinner = () => (
  <div styleName="spinner">
    <div />
    <div styleName="rect2" />
    <div styleName="rect3" />
    <div styleName="rect4" />
    <div styleName="rect5" />
  </div>
)

export default CSSModules(Spinner, style)
