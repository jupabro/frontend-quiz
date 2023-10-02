import React from "react"
import "./Navigation.css"
import { useDispatch } from "react-redux"
import { openLoginForm } from "../../../redux/modules/actions/loginformActions"
import Icon from "@mdi/react"
import {
  mdilLightbulb,
  mdilEmail,
  mdilSettings,
  mdilHome,
  mdilHelp,
  mdilLogin,
  mdilFolder,
  mdilUnfoldLessVertical,
  mdilUnfoldMoreVertical,
} from "@mdi/light-js"

const Navigation = ({ sidebarWidth, shrinkWidth }) => {
  const dispatch = useDispatch()

  const handleOpenLoginForm = () => {
    dispatch(openLoginForm())
  }
  return (
    <div className='nav'>
      <ul className='nav-list'>
        <li
          className={`shrink-icon ${
            sidebarWidth === shrinkWidth ? "hide" : ""
          }`}
        >
          <Icon path={mdilUnfoldLessVertical} size={1} />
        </li>
        <li
          className={`expand-icon ${
            sidebarWidth === shrinkWidth ? "" : "hide"
          }`}
        >
          <Icon path={mdilUnfoldMoreVertical} size={1} />
        </li>
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
