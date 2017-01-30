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
    const { description, results, loading, routeParams, loadTask, author, code } = this.props
    return (
      <ResultsPage
        onRefresh={() => loadTask(routeParams.id)}
        loading={loading}
        results={results}
        author={author}
        description={description}
        code={code}
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
  loading: PropTypes.bool,
  code: PropTypes.string,
  description: PropTypes.string,
}

ResultsPageContainer.defaultProps = {
  author: '',
  results: [],
  loading: true,
  code: '',
  description: '',
}

const mapStateToProps = state => ({
  results: activeTask(state).results,
  loading: activeTask(state).loading,
  author: activeTask(state).solutionAuthor,
  code: activeTask(state).initialCode,
  description: activeTask(state).description
})

const mapDispatchToProps = {
  loadTask: id => requestTask(id)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPageContainer)
