import CodeMirror from 'react-codemirror'
import { connect } from 'react-redux'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css'
import { code } from '../module/selectors'
import { setCode } from '../module/actions'

const options = {
  lineNumbers: true,
  mode: 'javascript'
}

const mapStateToProps = state => ({
  value: code(state),
  options
})

const mapDispatchToProps = {
  onChange: newCode => setCode(newCode)
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeMirror)
