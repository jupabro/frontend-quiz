import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { closeLoginForm } from "../../../redux/modules/actions"
import "./Form.css"

const LoginForm = ({ activeTab }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // login logic

    dispatch(closeLoginForm())
  }

  return (
    <form className={`login ${activeTab === "login" ? "is-active" : ""}`}>
      <fieldset>
        <legend>Please, enter your email and password for login.</legend>
        <div className='input-block'>
          <label for='login-email'>E-mail</label>
          <input id='login-email' type='email' required />
        </div>
        <div className='input-block'>
          <label for='login-password'>Password</label>
          <input id='login-password' type='password' required />
        </div>
      </fieldset>
      <button type='submit' class='btn-login'>
        Login
      </button>
    </form>
  )
}

export default LoginForm
