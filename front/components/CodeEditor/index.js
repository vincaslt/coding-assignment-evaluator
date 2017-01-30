import React from 'react'
import CSSModules from 'react-css-modules'
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css'
import style from './style.css'

const CodeEditor = ({ ...props }) => (
  <CodeMirror styleName="code-editor" {...props} />
)

export default CSSModules(CodeEditor, style)
