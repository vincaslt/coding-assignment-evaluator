import React from 'react'
import CSSModules from 'react-css-modules'

import CodeEditor from '../../containers/CodeEditor'
import Card from '../Card'
import Button from '../Button'
import style from './style.css'

const TaskPage = () => (
  <div styleName="content">
    <div styleName="description">
      <Card headerText="Task description">
        <div>Description</div>
      </Card>
    </div>
    <div styleName="code-editor">
      <Card headerText="Code">
        <CodeEditor />
        <div>
          <Button>Submit</Button>
        </div>
      </Card>
    </div>
  </div>
)

export default CSSModules(TaskPage, style)
