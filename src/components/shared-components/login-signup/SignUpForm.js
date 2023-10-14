import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { closeLoginForm, storeFormInputs } from "../../../redux/modules/actions"
import "./Form.css"
import Icon from "@mdi/react"
import { mdilCheck, mdilInformation, mdilEye, mdilEyeOff } from "@mdi/light-js"

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const SignUpForm = ({ activeTab, handleSwitchTab }) => {
  const dispatch = useDispatch()
  const storedInputs = useSelector((state) => state.loginForm.formInputs)

  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(false)

  const [pwd, setPwd] = useState("")
  const [validPwd, setValidPwd] = useState(false)

  const [matchPwd, setMatchPwd] = useState("")
  const [validMatch, setValidMatch] = useState(false)

  const [passwordVisible, setPasswordVisible] = useState(false)

  const [hover, setHover] = useState(false)
  const [infoText, setInfoText] = useState("")

  useEffect(() => {
    console.log("useeffect in signuo", storedInputs)

    if (storedInputs != null) {
      setEmail(storedInputs.email)
      setPwd(storedInputs.pwd)
    } else {
      setEmail("")
      setPwd("")
    }
  }, [storedInputs])

  useEffect(() => {
    //when tab switches to login, store the form data
    if (activeTab === "login") {
      console.log("makes shit")
      dispatch(storeFormInputs({ email: email, pwd: pwd }))
    }
  }, [activeTab])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email, dispatch])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
  }, [pwd, dispatch])

  useEffect(() => {
    if (validPwd) {
      setValidMatch(pwd === matchPwd)
    }
  }, [matchPwd, validPwd, pwd])

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const onHover = (infoText) => {
    setHover(true)
    setInfoText(infoText)
  }
  const onLeave = () => {
    setHover(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validEmail || !validMatch || !validPwd) return

    console.log("signup submit", email, pwd)
    dispatch(closeLoginForm())
  }

  const handleClick = (e) => {
    if (activeTab === "login") {
      handleSwitchTab("signup", e)
    }
  }

  const goToLogin = (e) => {
    dispatch(storeFormInputs({ email: email, pwd: pwd }))
    console.log("gotologin", storedInputs)
    handleSwitchTab("login", e)
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
            <label htmlFor='signup-email'>
              Email
              <Icon
                path={mdilCheck}
                size={0.6}
                className={validEmail ? "valid" : "hide"}
              />
              <div
                className={`icon-container ${
                  validEmail || !email ? "hide" : ""
                }`}
              >
                <Icon
                  path={mdilInformation}
                  size={0.6}
                  className='hover-icon'
                  onMouseEnter={() => onHover("email")}
                  onMouseLeave={onLeave}
                  role='button'
                  tabIndex='-3'
                />
                {hover && infoText === "email" && (
                  <span className='info-text'>
                    4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </span>
                )}
              </div>
            </label>
            <input
              autoComplete='off'
              type='email'
              spellCheck='false'
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className='input-block'>
            <label htmlFor='signup-password'>
              Password{" "}
              <Icon
                path={mdilCheck}
                size={0.6}
                className={validPwd ? "valid" : "hide"}
              />
              <div
                className={`icon-container ${validPwd || !pwd ? "hide" : ""}`}
              >
                <Icon
                  path={mdilInformation}
                  size={0.6}
                  className='hover-icon'
                  onMouseEnter={() => onHover("pwd")}
                  onMouseLeave={onLeave}
                  role='button'
                  tabIndex='-3'
                />
                {hover && infoText === "pwd" && (
                  <span className='info-text'>
                    8 to 24 characters.
                    <br />
                    Please include uppercase and lowercase letters, numbers and
                    special characters.
                    <br />
                    Allowed special characters: <br />
                    <span>$ ! % @ #</span>
                  </span>
                )}
              </div>
            </label>
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
          <div className='input-block'>
            <label htmlFor='signup-password-confirm'>
              Confirm password{" "}
              <Icon
                path={mdilCheck}
                size={0.6}
                className={validMatch ? "valid" : "hide"}
              />
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              required
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
            />
          </div>
        </fieldset>
        <button
          type='submit'
          className='btn-signup'
          disabled={!validEmail || !validMatch || !validPwd}
        >
          Sign Up
        </button>
        <div className='switch-text' onClick={goToLogin}>
          {" "}
          Already have an Account?{" "}
          <span className='switch-text-button'> Login!</span>
        </div>
      </form>
    </>
  )
}

export default SignUpForm
