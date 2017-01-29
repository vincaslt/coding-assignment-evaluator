import { connect } from 'react-redux'
import { userInfo } from '../module/selectors'
import { setName, requestStartTask } from '../module/actions'
import MainPage from '../components/MainPage'

const mapStateToProps = state => ({
  name: userInfo(state).name
})

const mapDispatchToProps = {
  onNameInputChange: name => setName(name),
  onStartClick: () => requestStartTask()
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
