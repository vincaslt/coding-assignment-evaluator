import CodeMirror from 'react-codemirror'
import { connect } from 'react-redux'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css'

const options = {
  lineNumbers: true,
  mode: 'javascript'
}

const mapStateToProps = state => ({
  value: '// some code here',
  options
})

const mapDispatchToProps = {
  onChange: (newCode) => {
    console.log(newCode)
    return {
      type: 'CODE_CHANGED',
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeMirror)
