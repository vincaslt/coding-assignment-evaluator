import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import moment from 'moment'
import style from './style.css'

const SolutionEntry = ({ id, name, submittedAt }) => (
  <div styleName="entry">
    <span><Link to={`/task/${id}/results`}>{name}</Link></span>
    <span>{moment(submittedAt).format('LLLL')}</span>
  </div>
)

export const SolutionEntryPropTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  submittedAt: PropTypes.instanceOf(Date)
}

SolutionEntry.defaultProps = {
  id: null,
  name: '',
  submittedAt: Date.now()
}

SolutionEntry.propTypes = SolutionEntryPropTypes
export default CSSModules(SolutionEntry, style, { allowMultiple: true })
