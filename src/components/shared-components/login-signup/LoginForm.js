import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { closeLoginForm } from "../../../redux/modules/actions"
import "./Form.css"
import Icon from "@mdi/react"
import { mdilEye, mdilEyeOff } from "@mdi/light-js"

const LoginForm = ({ activeTab, handleSwitchTab }) => {
  const dispatch = useDispatch()

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [username, setUsername] = useState("")
  const [pwd, setPwd] = useState("")

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // login logic

    dispatch(closeLoginForm())
  }

  const handleClick = (e) => {
    if (activeTab === "signup") {
      handleSwitchTab("login", e)
    }
  }

  return (
    <>
      {activeTab === "signup" && (
        <div className='overlay' onClick={handleClick}>
          {" "}
        </div>
      )}

      <form className={`login ${activeTab === "login" ? "is-active" : ""}`}>
        <fieldset>
          <div className='input-block'>
            <label htmlFor='login-email'>Email</label>
            <input id='login-email' type='email' spellCheck='false' required />
          </div>
          <div className='input-block'>
            <label htmlFor='login-password'>Password</label>
            <div className='input-container'>
              <input
                id='login-password'
                type={passwordVisible ? "text" : "password"}
                required
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
              />
              <span
                className='password-toggle'
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <Icon
                    path={mdilEyeOff}
                    size={0.8}
                    className='pwd-toggle-icon'
                  />
                ) : (
                  <Icon path={mdilEye} size={0.8} className='pwd-toggle-icon' />
                )}
              </span>
            </div>
          </div>
        </fieldset>
        <button
          type='submit'
          className='btn-login'
          disabled={activeTab === "signup" ? true : false}
        >
          Login
        </button>
        <div
          className='switch-text'
          onClick={(e) => handleSwitchTab("signup", e)}
        >
          {" "}
          No Account yet? <span className='switch-text-button'> Sign Up!</span>
        </div>
      </form>
    </>
  )
}

export default LoginForm
