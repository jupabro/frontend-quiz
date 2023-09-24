import React from "react"
import "./Navigation.css"
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

{
  /* <Icon path={mdilAccount} size={1} /> */
}

{
  /* <Icon path={mdilMenu} size={1} /> */
}

{
  /* <Icon path={mdilLogout} size={1} /> */
}

const Navigation = () => {
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
          <a href='#'>Login</a>{" "}
        </li>
      </ul>
    </div>
  )
}

export default Navigation
