import axios from "axios"
import { useState } from "react"

axios.create({
  baseURL: "http://localhost:8080",
})

function useAuthService() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const register = async (user) => {
    setLoading(true)

    try {
      const response = await axios("post", "/api/v1/auth/register", user)
      setUser(response.body)
      console.log("Registration successful:", user)
    } catch (error) {
      setError(error)
      console.error("Registration error:", error)
    } finally {
      setLoading(false)
    }
  }

  const test = async () => {
    setLoading(true)

    try {
      const response = await axios("post", "/api/v1/auth/test")
      console.log("Test successful:", response.body)
    } catch (error) {
      setError(error)
      console.error("Test error:", error)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    register,
    test,
  }
}

export default useAuthService
