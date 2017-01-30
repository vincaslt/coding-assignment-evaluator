import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import style from './style.css'

const ListEntry = result => (
  <div styleName={`entry ${result.success ? 'success' : 'fail'}`}>
    {`With arguments (${result.arguments.join(', ')}) got ${result.result}`}
  </div>
)
export const ResultPropTypes = {
  result: PropTypes.any.isRequired,
  success: PropTypes.bool.isRequired,
  arguments: PropTypes.array.isRequired
}

ListEntry.propTypes = ResultPropTypes
export default CSSModules(ListEntry, style, { allowMultiple: true })
