import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import Input from '../Input'
import Button from '../Button'
import Card from '../Card'
import style from './style.css'

const MainPage = ({ name, onNameInputChange, onStartClick }) => (
  <div styleName="content-container">
    <div styleName="content">
      <Card headerText="Begin task">
        <div styleName="user-info">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => onNameInputChange(e.target.value)}
          />
          <div styleName="action">
            <Button disabled={!name} onClick={onStartClick}>
              Start
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
)

MainPage.propTypes = {
  onNameInputChange: PropTypes.func.isRequired,
  onStartClick: PropTypes.func.isRequired,
  name: PropTypes.string
}

MainPage.defaultProps = {
  name: null
}

export default CSSModules(MainPage, style)
