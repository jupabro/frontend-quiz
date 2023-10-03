import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  closeLoginForm,
  switchLoginFormTab,
} from "../../../redux/modules/actions"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
import "./AuthModal.css"

const AuthModal = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.loginForm.isOpen)
  const activeTab = useSelector((state) => state.loginForm.activeTab)

  const handleCloseModal = () => {
    dispatch(closeLoginForm())
  }

  const handleSwitchTab = (tab, e) => {
    e.stopPropagation()
    dispatch(switchLoginFormTab(tab))
  }

  return isOpen ? (
    <div className='modal' onClick={handleCloseModal}>
      <div
        className='forms-section small-screen-auth'
        onClick={(e) => e.stopPropagation()}
      >
        {activeTab === "login" && (
          <div className='login-form-container'>
            <button type='button' className='switcher switcher-login'>
              Login
            </button>
            <LoginForm />
          </div>
        )}
        {activeTab === "signup" && (
          <div className='signup-form-container'>
            <button type='button' className='switcher switcher-signup'>
              Sign up
            </button>
            <SignUpForm />
          </div>
        )}
      </div>
      <div className='forms-section big-screen-auth'>
        <div className='forms'>
          <div
            className={`form-wrapper ${
              activeTab === "login" ? "is-active" : ""
            }`}
          >
            <button
              type='button'
              className='switcher switcher-login'
              onClick={(e) => handleSwitchTab("login", e)}
            >
              Login
              <span className='underline'></span>
            </button>
            <div
              className='login-form-container'
              onClick={(e) => e.stopPropagation()}
            >
              <LoginForm
                activeTab={activeTab}
                handleSwitchTab={handleSwitchTab}
              />
            </div>
          </div>
          <div
            className={`form-wrapper ${
              activeTab === "signup" ? "is-active" : ""
            }`}
          >
            <button
              type='button'
              className='switcher switcher-signup'
              onClick={(e) => handleSwitchTab("signup", e)}
            >
              Sign Up
              <span className='underline'></span>
            </button>
            <div
              className='signup-form-container'
              onClick={(e) => e.stopPropagation()}
            >
              <SignUpForm
                activeTab={activeTab}
                handleSwitchTab={handleSwitchTab}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default AuthModal
