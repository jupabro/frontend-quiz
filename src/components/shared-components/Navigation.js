import React from "react"
import "./Navigation.css"
import { useDispatch } from "react-redux"
import { openLoginForm } from "../../redux/modules/actions/loginformActions"
import Icon from "@mdi/react"
import {
  mdilLightbulb,
  mdilEmail,
  mdilSettings,
  mdilHome,
  mdilHelp,
  mdilLogin,
  mdilFolder,
} from "@mdi/light-js"

const Navigation = () => {
  const dispatch = useDispatch()

  const handleOpenLoginForm = () => {
    console.log("open loginform")
    dispatch(openLoginForm())
  }
  return (
    <div className='nav'>
      <ul className='nav-list'>
        <li>
          <Icon path={mdilHome} size={1} />
          <a href='#'>Home</a>
        </li>
        <li>
          <Icon path={mdilLightbulb} size={1} />
          <a href='#'>About</a>
        </li>
        <li>
          <Icon path={mdilSettings} size={1} />
          <a href='#'>Settings</a>
        </li>
        <li>
          <Icon path={mdilFolder} size={1} />
          <a href='#'>Portfolio</a>
        </li>
        <li>
          <Icon path={mdilEmail} size={1} />
          <a href='#'>Contact</a>
        </li>
        <li>
          <Icon path={mdilHelp} size={1} />
          <a href='#'>Help</a>
        </li>
      </ul>
      <ul className='nav-login'>
        <li>
          <Icon path={mdilLogin} size={1} />
          <a href='#' onClick={handleOpenLoginForm}>
            Login
          </a>{" "}
        </li>
      </ul>
    </div>
  )
}

export default Navigation
