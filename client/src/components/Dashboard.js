import React, { useEffect, useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import { auth } from "../firebase"


export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, token, logout } = useAuth()
  const history = useHistory()
  const [apts, setApts] = useState([])


  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  // async function getToken() {
  //   const token = await auth.currentUser.getIdToken();
  //   console.log
  //   return token
  // }

  async function getApartments() {
    const userToken = localStorage.getItem('user-token')

    const data = await (await axios.get("http://localhost:5000/api/apartments", {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })).data

    // const data = await (await axios.get("http://localhost:5000/api/apartments")).data
    setApts(data)

    // axios.get("http://localhost:5000/api/users/DbbUV5nUgBWmREjnczfVkLLKMbJ2")
    // axios.delete("http://localhost:5000/api/users/DbbUV5nUgBWmREjnczfVkLLKMbJ2")

  }

  useEffect(() => {
    getApartments()
  }, [])






  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      {
        apts.length === 0 ? (
          <div> NO APARTAMENTS</div>
        ) : (
          apts.map((apt) => {
            return <div> {apt.name} </div>
          })
        )
      }
    </>
  )
}
