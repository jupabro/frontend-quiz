import axios from "axios"
import { useState } from "react"

const BASE_URL = "http://localhost:8080"

function useAuthService() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const register = async (email, pwd) => {
    setLoading(true)

    const credentials = { email: email, password: pwd }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/register`,
        credentials
      )
      console.log("API response", response)
      setUser(response.data)
      console.log("Registration successful:")
    } catch (error) {
      setError(error)
      console.error("Registration error:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, pwd) => {
    setLoading(true)

    const authHeader = {
      headers: {
        Authorization: `Basic ${window.btoa(`${email}:${pwd}`)}`,
      },
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/authenticate`,
        null,
        authHeader
      )
      console.log("Registration successful:", response.data)
    } catch (error) {
      setError(error)
      console.error("Registration error:", error)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    register,
    login,
  }
}

export default useAuthService
