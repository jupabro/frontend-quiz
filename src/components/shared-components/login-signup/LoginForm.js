import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { closeLoginForm } from "../../../redux/modules/actions"
import "./Form.css"

const LoginForm = ({ activeTab, handleSwitchTab }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

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
            <label for='login-email'>E-mail</label>
            <input id='login-email' type='email' spellcheck='false' required />
          </div>
          <div className='input-block'>
            <label for='login-password'>Password</label>
            <input id='login-password' type='password' required />
          </div>
        </fieldset>
        <button
          type='submit'
          class='btn-login'
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
