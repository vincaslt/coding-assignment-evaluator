import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import CodeEditor from '../../containers/CodeEditor'
import Card from '../Card'
import Button from '../Button'
import Spinner from '../Spinner'
import style from './style.css'

const TaskPage = ({ description, loading }) => {
  const spinner = <Spinner>loading</Spinner>
  return loading ? spinner : (
    <div styleName="content">
      <div styleName="description">
        <Card headerText="Task description">
          <div>{description}</div>
        </Card>
      </div>
      <div styleName="code-editor">
        <Card headerText="Code">
          <CodeEditor />
          <div styleName="actions">
            <Button>Submit</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

TaskPage.propTypes = {
  description: PropTypes.string,
  loading: PropTypes.bool
}

TaskPage.defaultProps = {
  description: '',
  loading: false
}

export default CSSModules(TaskPage, style)
