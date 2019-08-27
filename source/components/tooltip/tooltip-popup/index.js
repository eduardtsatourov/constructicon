import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import withStyles from '../../with-styles'
import styles, { keyframes } from './styles'

class Popup extends Component {
  constructor () {
    super(...arguments)
    this.anchor = document.createElement('div')
  }

  componentDidMount () {
    document.body.appendChild(this.anchor)
  }

  componentWillUnmount () {
    document.body.removeChild(this.anchor)
  }

  render () {
    const {
      delay,
      position: { top, left },
      classNames,
      tip
    } = this.props

    return createPortal(
      <div
        className={`c11n-tooltip-popup ${classNames.root}`}
        style={{ top, left }}
      >
        <div className={classNames.tip}>{tip}</div>
      </div>,
      this.anchor
    )
  }
}

export default withStyles(styles, keyframes)(Popup)
