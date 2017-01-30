import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import CodeEditor from '../../containers/CodeEditor'
import Card from '../Card'
import Button from '../Button'
import Spinner from '../Spinner'
import Timer from '../../containers/TimerContainer'
import style from './style.css'

const TaskPage = ({ description, loading, onSubmit }) => (
  loading ? <Spinner /> : (
    <div styleName="content">
      <div styleName="description">
        <Card headerText="Task description">
          <div>{description}</div>
        </Card>
      </div>
      <div styleName="code-editor">
        <Card headerText="Code">
          <CodeEditor />
          <div styleName="bottom-container">
            <Timer />
            <Button onClick={() => onSubmit()}>Submit</Button>
          </div>
        </Card>
      </div>
    </div>
  )
)

TaskPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  description: PropTypes.string,
  loading: PropTypes.bool
}

TaskPage.defaultProps = {
  description: '',
  loading: false
}

export default CSSModules(TaskPage, style)
