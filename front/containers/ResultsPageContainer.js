import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { activeTask } from '../module/selectors'
import ResultsPage from '../components/ResultsPage'
import { ResultPropTypes } from '../components/ResultsPage/ListEntry'
import { requestTask } from '../module/actions'

class ResultsPageContainer extends PureComponent {
  componentWillMount() {
    this.props.loadTask(this.props.routeParams.id)
  }

  render() {
    const { results, loading, routeParams, loadTask, author } = this.props
    return (
      <ResultsPage
        onRefresh={() => loadTask(routeParams.id)}
        loading={loading}
        results={results}
        author={author}
      />
    )
  }
}

ResultsPageContainer.propTypes = {
  loadTask: PropTypes.func.isRequired,
  routeParams: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  author: PropTypes.string,
  results: PropTypes.arrayOf(
    PropTypes.shape(ResultPropTypes)
  ),
  loading: PropTypes.bool
}

ResultsPageContainer.defaultProps = {
  author: '',
  results: [],
  loading: true
}

const mapStateToProps = state => ({
  results: activeTask(state).results,
  loading: activeTask(state).loading,
  author: activeTask(state).solutionAuthor
})

const mapDispatchToProps = {
  loadTask: id => requestTask(id)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPageContainer)
