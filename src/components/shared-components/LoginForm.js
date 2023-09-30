import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { closeLoginForm, switchLoginFormTab } from "../../redux/modules/actions"
import LoginFormContent from "./LoginFormContent"
import SignUpFormContent from "./SignUpFormContent"

const LoginForm = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.loginForm.isOpen)
  const activeTab = useSelector((state) => state.loginForm.activeTab)

  const handleCloseLoginForm = () => {
    dispatch(closeLoginForm())
  }

  const handleTabSwitch = (tab) => {
    dispatch(switchLoginFormTab(tab))
  }

  return isOpen ? (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={handleCloseLoginForm}>
          &times;
        </span>
        <div className='tabs'>
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => handleTabSwitch("login")}
          >
            Login
          </button>
          <button
            className={activeTab === "signup" ? "active" : ""}
            onClick={() => handleTabSwitch("signup")}
          >
            Sign Up
          </button>
        </div>
        {activeTab === "login" ? <LoginFormContent /> : <SignUpFormContent />}
      </div>
    </div>
  ) : null
}

export default LoginForm
