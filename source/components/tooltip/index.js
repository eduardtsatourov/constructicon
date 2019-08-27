import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Popup from './tooltip-popup'

class Tooltip extends Component {
  constructor () {
    super(...arguments)
    this.ref = null
    this.popup = null
    this.state = {
      hovering: false,
      position: { top: 0, left: 0 }
    }
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
  }

  onMouseEnter () {
    const { top, left, width } = this.ref.getBoundingClientRect()
    const { pageXOffset, pageYOffset } = window
    this.setState({
      hovering: true,
      position: {
        top: top + pageYOffset,
        left: left + pageXOffset + width / 2
      }
    })
  }

  onMouseLeave () {
    this.setState({ hovering: false })
  }

  render () {
    const { position, hovering } = this.state
    const { tip, children, styles, delay } = this.props

    const bindTooltip = {
      ref: ref => (this.ref = ref),
      onMouseOut: this.onMouseLeave,
      onMouseOver: this.onMouseEnter
    }

    const customBindTooltip = {
      ref: ref => (this.ref = ref),
      onMouseOut: this.onMouseLeave,
      onMouseOver: this.onMouseEnter
    }

    const customPopupProps = {
      ref: ref => (this.popup = ref),
      hovering,
      styles: {
        position: 'absolute',
        zIndex: 9999,
        transform: 'translate(-50%, -100%)',
        ...position
      }
    }

    return (
      <Fragment>
        {hovering &&
          tip && (
          <Popup
            delay={delay}
            styles={styles}
            position={position}
            tip={tip}
          />
        )}
        {tip
          ? children(bindTooltip)
          : children(customBindTooltip, customPopupProps)}
      </Fragment>
    )
  }
}

export default Tooltip

Tooltip.defaultProps = {
  delay: 300
}

Tooltip.propTypes = {
  /**
   * Hover delay in ms before showing the tooltip
   */
  delay: PropTypes.number,
  /**
   * The text to be rendered in the tip popup
   */
  tip: PropTypes.string,
  /**
   * A function that renders the children and spreads the argument onto a node
   * of your choice, this binds the position and event listeners.
   */
  children: PropTypes.func.isRequired,
  /**
   * Custom styles to merge onto the tooltip popup.
   */
  styles: PropTypes.object
}
