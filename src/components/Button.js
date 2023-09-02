import PropTypes from 'prop-types'
import React from 'react'

const Button = ({color,text,onClick}) => {
  return  (<button onClick={onClick} className='btn' style={{backgroundColor: color}}>{text}</button>)
}

Button.defaultProps = {
    color: "green",
    text: "ADD"
}
Button.propTypes = {
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    // onClick: PropTypes.func.isRequired
}
export default Button
