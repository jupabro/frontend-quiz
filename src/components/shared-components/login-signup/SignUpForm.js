import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { closeLoginForm } from "../../../redux/modules/actions"
import "./Form.css"

const SignUpForm = ({ activeTab }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("signup submit")
    dispatch(closeLoginForm())
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`signup ${activeTab === "signup" ? "is-active" : ""}`}
    >
      <fieldset>
        <legend>
          Please, enter your email, password and password confirmation for sign
          up.
        </legend>
        <div className='input-block'>
          <label for='signup-email'>E-mail</label>
          <input id='signup-email' type='email' required7 />
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
      <button type='submit' class='btn-signup'>
        Continue
      </button>
    </form>
  )
}

export default SignUpForm
