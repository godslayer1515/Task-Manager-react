import PropTypes from 'prop-types'
import Button from './Button'
import React from 'react'
import { useLocation } from 'react-router-dom'

const Header = ({ title,onAdd,showAdd }) => {
  const Location = useLocation()
  return (
    <header className='header' >
      <h1>{title}</h1>
      {Location.pathname === "/" && <Button color = {showAdd ? "red": "green"} text ={showAdd ? "CLOSE" : "ADD"} onClick={onAdd}/>}
    </header>
  )
}
Header.defaultProps = {
    title: "Task Tracker"
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired
}

// CSS in js

// const headerstyle = {
//     color: "red",
//     backgroundColor: "black",
// }

export default Header
