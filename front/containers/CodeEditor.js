import { connect } from 'react-redux'
import CodeEditor from '../components/CodeEditor'
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

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor)
