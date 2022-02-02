import React, { useEffect, useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { getTicket } from "../service/getTicket"
import Tickets from '../components/Tickets'
import { getRole } from "../service/getRole"
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [reqTickets, setReqTickets] = useState([])
  const [acptTickets, setAcptTickets] = useState([])
  const [doneTickets, setDoneTickets] = useState([])
  const [userRol, setUserRol] = useState("tenant")

  const userID = currentUser.uid

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
    try {
      const role = await getRole({
        userID: userID
      })

      if (role === "Unauthorized") {
        history.push("/login")
      }

      setUserRol(role)

      setReqTickets(await getTicket({
        state: "requested",
        userID: userID,
        role: role,
      }))

      setAcptTickets(await getTicket({
        state: "accepted",
        userID: userID,
        role: role,
      }))
      setDoneTickets(await getTicket({
        state: "done",
        userID: userID,
        role: role,
      }))

    } catch (error) {
      if (!error.status) {
        window.alert("Network Error, try to reset the app")
      }
    }
  }



  useEffect(() => {

    setup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>


      <Card>
        <Card.Body>

          <div className="mb-3 d-flex align-items-center">
            <h1 className="ml-auto">INICIO</h1>
            {/* <h2 className="text-center">Restablecer Contraseña</h2> */}
            <button type="button" variant="link" onClick={handleLogout} className="ml-auto btn btn-secondary">
              <i className="bi bi-box-arrow-left"></i>
            </button>
          </div>

          <Tickets state={"SOLICITADOS"} role={userRol} userID={userID} tickets={reqTickets}></Tickets>
          <Tickets state={"ACEPTADOS"} role={userRol} userID={userID} tickets={acptTickets}></Tickets>
          <Tickets state={"REALIZADOS"} role={userRol} userID={userID} tickets={doneTickets}></Tickets>
        </Card.Body>
      </Card>
      <Link to="/NewTicket" className="btn btn-primary w-100 mt-3">
        Crear nuevo tique
      </Link>
    </>
  )
}
