import CodeMirror from 'react-codemirror'
import { connect } from 'react-redux'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css'
import { activeTask } from '../module/selectors'
import { setCode } from '../module/actions'

const options = {
  lineNumbers: true,
  mode: 'javascript'
}

const mapStateToProps = state => ({
  value: activeTask(state).code,
  options
})

const mapDispatchToProps = {
  onChange: code => setCode(code)
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeMirror)
