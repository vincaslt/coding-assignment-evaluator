import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import { activeTask } from '../module/selectors'
import { startTaskTimer, stopTaskTimer } from '../module/actions'
import Timer from '../components/Timer'

class TimerContainer extends PureComponent {
  componentWillMount() {
    this.props.startTimer()
  }

  componentWillUnmount() {
    this.props.stopTimer()
  }

  render() {
    return (
      <Timer timeRemaining={this.props.timeRemaining} />
    )
  }
}

TimerContainer.propTypes = {
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  timeRemaining: PropTypes.number
}

TimerContainer.defaultProps = {
  timeRemaining: null
}

const mapStateToProps = state => ({
  timeRemaining: activeTask(state).remainingTime
})

const mapDispatchToProps = {
  startTimer: () => startTaskTimer(),
  stopTimer: () => stopTaskTimer()
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerContainer)
