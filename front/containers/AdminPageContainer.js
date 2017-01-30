import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { taskForm } from '../module/selectors'
import AdminPage, { propTypes, defaultProps } from '../components/AdminPage'
import {
  adminSubmitForm,
  adminChangeDescription,
  adminChangeCode,
  adminChangeExec,
  adminChangeTimeLimit,
  adminChangeTests,
  adminChangePassword,
} from '../module/actions'

class AdminPageContainer extends PureComponent {
  componentWillMount() {
    console.log('todo: load form data')
  }

  render() {
    return (
      <AdminPage {...this.props} />
    )
  }
}

AdminPageContainer.propTypes = propTypes
AdminPageContainer.defaultProps = defaultProps

const mapStateToProps = state => ({
  description: taskForm(state).description,
  code: taskForm(state).code,
  execName: taskForm(state).execName,
  timeLimit: taskForm(state).timeLimit,
  testsString: taskForm(state).tests
})

const mapDispatchToProps = {
  onSubmit: () => adminSubmitForm(),
  onChangeDescription: description => adminChangeDescription(description),
  onChangeCode: code => adminChangeCode(code),
  onChangeExecName: execName => adminChangeExec(execName),
  onChangeTimeLimit: timeLimit => adminChangeTimeLimit(parseInt(timeLimit, 10)),
  onChangeTests: tests => adminChangeTests(tests),
  onChangePassword: password => adminChangePassword(password),
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPageContainer)
