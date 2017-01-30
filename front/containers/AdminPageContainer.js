import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { taskForm, latestSolutionsSelector, testsSelector } from '../module/selectors'
import AdminPage, { propTypes, defaultProps } from '../components/AdminPage'
import {
  adminSubmitForm,
  adminChangeDescription,
  adminChangeCode,
  adminChangeExec,
  adminChangeTimeLimit,
  adminChangeTests,
  adminChangePassword,
  loadLatestTaskInfo,
  requestLatestSolutions
} from '../module/actions'

class AdminPageContainer extends PureComponent {
  componentWillMount() {
    this.props.loadLatestTask()
    this.props.loadSolutions()
  }

  render() {
    return (
      <AdminPage {...this.props} />
    )
  }
}

AdminPageContainer.propTypes = {
  ...propTypes,
  loadLatestTask: PropTypes.func.isRequired,
  loadSolutions: PropTypes.func.isRequired
}
AdminPageContainer.defaultProps = defaultProps

const mapStateToProps = state => ({
  description: taskForm(state).description,
  code: taskForm(state).code,
  execName: taskForm(state).execName,
  timeLimit: taskForm(state).timeLimit,
  testsString: taskForm(state).tests,
  solutions: latestSolutionsSelector(state)
})

const mapDispatchToProps = {
  loadLatestTask: () => loadLatestTaskInfo(),
  loadSolutions: () => requestLatestSolutions(),
  onSubmit: () => adminSubmitForm(),
  onChangeDescription: description => adminChangeDescription(description),
  onChangeCode: code => adminChangeCode(code),
  onChangeExecName: execName => adminChangeExec(execName),
  onChangeTimeLimit: timeLimit => adminChangeTimeLimit(parseInt(timeLimit, 10)),
  onChangeTests: tests => adminChangeTests(tests),
  onChangePassword: password => adminChangePassword(password),
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPageContainer)
