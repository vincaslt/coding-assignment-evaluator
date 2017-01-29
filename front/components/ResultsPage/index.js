import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import ListEntry, { ResultPropTypes } from './ListEntry'

import Card from '../Card'
import Button from '../Button'
import Spinner from '../Spinner'
import style from './style.css'

const ResultsPage = ({ loading, results, onRefresh, author }) => {
  const refreshButton = results.length === 0 && !loading ? (
    <div styleName="action">
      <Button onClick={() => onRefresh()}>refresh</Button>
    </div>
  ) : null

  const resultsList = results.length > 0 ? (
    results.map((result, index) => (
      <ListEntry key={index} {...result} /> // eslint-disable-line react/no-array-index-key
    ))
  ) : 'No results yet, try refreshing later'

  return loading ? <Spinner /> : (
    <div styleName="content-container">
      <div styleName="content">
        <Card headerText={`Results of ${author}`}>
          <div styleName="results">
            {resultsList}
            {refreshButton}
          </div>
        </Card>
      </div>
    </div>
  )
}

ResultsPage.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  author: PropTypes.string,
  results: PropTypes.arrayOf(
    PropTypes.shape(ResultPropTypes)
  ),
  loading: PropTypes.bool
}

ResultsPage.defaultProps = {
  author: '',
  results: [],
  loading: false
}

export default CSSModules(ResultsPage, style)
