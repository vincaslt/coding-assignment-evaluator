import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import duration from 'humanize-duration'
import style from './style.css'

const Timer = ({ timeRemaining }) => (
  <span>Time Left: {duration(timeRemaining, { round: true })}</span>
)

Timer.propTypes = {
  timeRemaining: PropTypes.number
}

Timer.defaultProps = {
  timeRemaining: null
}

export default CSSModules(Timer, style)
