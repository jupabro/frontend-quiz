import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { closeLoginForm } from "../../../redux/modules/actions"
import "./Form.css"

const SignUpForm = ({ activeTab, handleSwitchTab }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("signup submit")
    dispatch(closeLoginForm())
  }

  const handleClick = (e) => {
    if (activeTab === "login") {
      handleSwitchTab("signup", e)
    }
  }

  return (
    <>
      {activeTab === "login" && (
        <div className='overlay' onClick={handleClick}>
          {" "}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className={`signup ${activeTab === "signup" ? "is-active" : ""}`}
      >
        <fieldset>
          <div className='input-block'>
            <label for='signup-email'>E-mail</label>
            <input
              id='signup-email'
              type='email'
              spellcheck='false'
              required7
            />
          </div>
          <div className='input-block'>
            <label for='signup-password'>Password</label>
            <input id='signup-password' type='password' required />
          </div>
          <div className='input-block'>
            <label for='signup-password-confirm'>Confirm password</label>
            <input id='signup-password-confirm' type='password' required />
          </div>
        </fieldset>
        <button
          type='submit'
          class='btn-signup'
          disabled={activeTab === "login" ? true : false}
        >
          Continue
        </button>
        <div
          className='switch-text'
          onClick={(e) => handleSwitchTab("login", e)}
        >
          {" "}
          Already have an Account?{" "}
          <span className='switch-text-button'> Login!</span>
        </div>
      </form>
    </>
  )
}

export default SignUpForm
