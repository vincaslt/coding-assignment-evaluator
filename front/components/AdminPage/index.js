import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import Button from '../Button'
import Card from '../Card'
import SolutionEntry, { SolutionEntryPropTypes } from './SolutionEntry'
import style from './style.css'

const AdminPage = ({
  description,
  code,
  execName,
  testsString,
  timeLimit,
  solutions,
  onSubmit,
  onChangeDescription,
  onChangeCode,
  onChangeTimeLimit,
  onChangeExecName,
  onChangeTests,
  onChangePassword
}) => {
  const solutionEntries = solutions.map(({ id, name, submittedAt }) => (
    <SolutionEntry
      key={id} // eslint-disable-line react/no-array-index-key
      submittedAt={submittedAt}
      name={name}
      id={id}
    />
  ))
  return (
    <div styleName="content-container">
      <div styleName="content">
        <Card headerText="Task information">
          <div styleName="task-info">
            <input
              styleName="input"
              type="text"
              placeholder="Description"
              value={description}
              onChange={e => onChangeDescription(e.target.value)}
            />
            <input
              styleName="input"
              type="text"
              placeholder="Code"
              value={code}
              onChange={e => onChangeCode(e.target.value)}
            />
            <input
              styleName="input"
              type="text"
              placeholder="Executable function"
              value={execName}
              onChange={e => onChangeExecName(e.target.value)}
            />
            <input
              styleName="input"
              type="number"
              placeholder="Time limit"
              value={timeLimit}
              onChange={e => onChangeTimeLimit(e.target.value)}
            />
            <input
              styleName="input"
              type="text"
              placeholder="Tests"
              value={testsString}
              onChange={e => onChangeTests(e.target.value)}
            />
            <input
              styleName="input"
              type="password"
              placeholder="Password"
              onChange={e => onChangePassword(e.target.value)}
            />
            <div styleName="action">
              <Button
                disabled={
                  !description || !code || !testsString || !execName
                }
                onClick={onSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </Card>
        <Card headerText="Latest solutions">
          {solutionEntries}
        </Card>
      </div>
    </div>
  )
}

export const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onChangeCode: PropTypes.func.isRequired,
  onChangeExecName: PropTypes.func.isRequired,
  onChangeTimeLimit: PropTypes.func.isRequired,
  onChangeTests: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  description: PropTypes.string,
  code: PropTypes.string,
  execName: PropTypes.string,
  timeLimit: PropTypes.number,
  testsString: PropTypes.string,
  solutions: PropTypes.arrayOf(PropTypes.shape(SolutionEntryPropTypes))
}

export const defaultProps = {
  description: '',
  code: '',
  execName: '',
  timeLimit: 0,
  testsString: '',
  solutions: []
}

AdminPage.propTypes = propTypes
AdminPage.defaultProps = defaultProps
export default CSSModules(AdminPage, style)
