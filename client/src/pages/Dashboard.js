import React, { useEffect, useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from "../firebase"
import { getTicket } from "../service/getTicket"
import Tickets from '../components/Tickets'
import { getRole } from "../service/getRole"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [reqTickets, setReqTickets] = useState([])
  const [acptTickets, setAcptTickets] = useState([])
  const [doneTickets, setDoneTickets] = useState([])
  const [role, setRole] = useState([])

  const adminID = auth.currentUser.uid


  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }


  async function setup() {

    const role = await getRole({
      userID: adminID
    })

    setRole(role)

    setAcptTickets(await getTicket({
      state: "accepted",
      role: role,
    }))

    setReqTickets(await getTicket({
      state: "requested",
      role: role,
    }))

    setDoneTickets(await getTicket({
      state: "done",
      role: role,
    }))

  }



  useEffect(() => {

    setup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <Tickets state={"SOLICITADOS"} tickets={reqTickets}></Tickets>
      <Tickets state={"ACEPTADOS"} tickets={acptTickets}></Tickets>
      <Tickets state={"REALIZADOS"} tickets={doneTickets}></Tickets>
      {/* {role === "admin" && <Tickets state={"REALIZADOS"} tickets={doneTickets}></Tickets>} */}

      <Link to="/NewTicket" className="btn btn-primary w-100 mt-3">
        Create new ticket
      </Link>



    </>
  )
}
