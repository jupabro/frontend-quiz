export const openLoginForm = () => {
  return {
    type: "OPEN_LOGIN_FORM",
  }
}

export const closeLoginForm = () => {
  return {
    type: "CLOSE_LOGIN_FORM",
  }
}

export const switchLoginFormTab = (tab) => {
  return {
    type: "SWITCH_LOGIN_FORM_TAB",
    payload: tab,
  }
}
