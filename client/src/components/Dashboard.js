import React, { useEffect, useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth } from "../firebase"
import { getTicket } from "../service/getTicket"
import { getApartments } from "../service/getApartments"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [apts, setApts] = useState([])
  const [reqTickets, setReqTickets] = useState([])
  const [acptTickets, setAcptTickets] = useState([])
  const [doneTickets, setDoneTickets] = useState([])

  const userToken = localStorage.getItem('user-token')
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

    const acceptedTickets = await getTicket({
      state: "accepted",
      adminID: adminID,
      userToken: userToken
    })

    setAcptTickets(acceptedTickets)

    const requestedTickets = await getTicket({
      state: "requested",
      adminID: adminID,
      userToken: userToken
    })

    setReqTickets(requestedTickets)

    const doneTickets = await getTicket({
      state: "done",
      adminID: adminID,
      userToken: userToken
    })

    setDoneTickets(doneTickets)

    const apartments = await getApartments({
      userToken: userToken
    })

    setApts(apartments)

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
      <div>
        {
          apts.length === 0 ? (
            <div> NO APARTAMENTS</div>
          ) : (
            apts.map((apt) => {
              return <div> {apt.name} </div>
            })
          )
        }
      </div>
      <br></br>
      <div>
        <span>TICKETS SOLICITADOS</span>
        {
          reqTickets.length === 0 ? (
            <div> No tickets available </div>
          ) : (
            reqTickets.map((t) => {
              return <div>
                <span> {t.ticketID} </span>
              </div>
            })
          )
        }
      </div>

      <br></br>
      <div>
        <span>TICKETS ACEPTADOS</span>
        {
          acptTickets.length === 0 ? (
            <div> No tickets available </div>
          ) : (
            acptTickets.map((t) => {
              return <div> {t.ticketID}</div>
            })
          )
        }
      </div>

      <br></br>
      <div>
        <span>TICKETS REALIZADOS</span>
        {
          doneTickets.length === 0 ? (
            <div> No tickets available </div>
          ) : (
            doneTickets.map((t) => {
              return <div> {t.ticketID}</div>
            })
          )
        }
      </div>

      <br></br>

      <Link to="/NewTicket" className="btn btn-primary w-100 mt-3">
        Create new ticket
      </Link>



    </>
  )
}
