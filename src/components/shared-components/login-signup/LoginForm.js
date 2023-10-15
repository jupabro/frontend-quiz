import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { closeLoginForm, storeFormInputs } from "../../../redux/modules/actions"
import "./Form.css"
import Icon from "@mdi/react"
import { mdilEye, mdilEyeOff } from "@mdi/light-js"

const LoginForm = ({ activeTab, handleSwitchTab }) => {
  const dispatch = useDispatch()
  const storedInputs = useSelector((state) => state.loginForm.formInputs)

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")

  useEffect(() => {
    if (activeTab === "login") {
      if (storedInputs != null) {
        setEmail(storedInputs.email)
        setPwd(storedInputs.pwd)
      } else {
        setEmail("")
        setPwd("")
      }
    }
    // eslint-disable-next-line
  }, [storedInputs])

  useEffect(() => {
    // when tab switches by click event on the other form (big screen)
    // store this form data in order to update the other form
    if (activeTab === "signup" && window.innerWidth >= 500) {
      dispatch(storeFormInputs({ email: email, pwd: pwd }))
    }
    // eslint-disable-next-line
  }, [activeTab])

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // login logic

    dispatch(closeLoginForm())
  }

  const handleClickOnAtherForm = (e) => {
    if (activeTab === "signup") {
      handleSwitchTab("login", e)
    }
  }

  const goToSignUp = (e) => {
    dispatch(storeFormInputs({ email: email, pwd: pwd }))
    handleSwitchTab("signup", e)
  }

  return (
    <>
      {activeTab === "signup" && (
        <div className='overlay' onClick={handleClickOnAtherForm}>
          {" "}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`login ${activeTab === "login" ? "is-active" : ""}`}
      >
        <fieldset>
          <div className='input-block'>
            <label htmlFor='login-email'>Email</label>
            <input
              type='email'
              spellCheck='false'
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className='input-block'>
            <label htmlFor='login-password'>Password</label>
            <div className='input-container'>
              <input
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
        <div className='switch-text' onClick={goToSignUp}>
          {" "}
          No Account yet? <span className='switch-text-button'> Sign Up!</span>
        </div>
      </form>
    </>
  )
}

export default LoginForm
