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

const Navigation = ({
  sidebarWidth,
  shrinkWidth,
  minResizeWidth,
  setSidebarWidth,
}) => {
  const dispatch = useDispatch()

  const handleOpenLoginForm = () => {
    dispatch(openLoginForm())
  }

  //for big screens
  const toggleSideBar = () => {
    if (!sidebarWidth) return
    if (sidebarWidth > shrinkWidth) {
      setSidebarWidth(shrinkWidth)
    } else setSidebarWidth(minResizeWidth + 1)
  }

  return (
    <div className='nav'>
      <ul className='nav-menu-icons'>
        <li
          className={`shrink-icon ${
            sidebarWidth === shrinkWidth ? "hide" : ""
          }`}
          onClick={toggleSideBar}
        >
          <Icon path={mdilUnfoldLessVertical} size={1} />
        </li>
        <li
          className={`expand-icon ${
            sidebarWidth === shrinkWidth ? "" : "hide"
          }`}
          onClick={toggleSideBar}
        >
          <Icon path={mdilUnfoldMoreVertical} size={1} />
        </li>
      </ul>
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
        <li onClick={handleOpenLoginForm}>
          <Icon path={mdilLogin} size={1} />
          <span>Login</span>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
