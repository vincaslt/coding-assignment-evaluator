import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { activeTask } from '../module/selectors'
import TaskPage from '../components/TaskPage'
import { requestTask, submitSolution } from '../module/actions'

class TaskPageContainer extends PureComponent {
  componentWillMount() {
    this.props.loadTask(this.props.routeParams.id)
  }

  render() {
    const { description, loading, submit } = this.props
    return (
      <TaskPage
        description={description}
        loading={loading}
        onSubmit={submit}
      />
    )
  }
}

TaskPageContainer.propTypes = {
  submit: PropTypes.func.isRequired,
  loadTask: PropTypes.func.isRequired,
  routeParams: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  description: PropTypes.string,
  loading: PropTypes.bool
}

TaskPageContainer.defaultProps = {
  description: '',
  loading: true
}

const mapStateToProps = state => ({
  description: activeTask(state).description,
  loading: activeTask(state).loading
})

const mapDispatchToProps = {
  submit: () => submitSolution(),
  loadTask: id => requestTask(id)
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPageContainer)
