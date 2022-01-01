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
  const [reqTickets, setReqTickets] = useState([])
  const [acptTickets, setAcptTickets] = useState([])
  const [doneTickets, setDoneTickets] = useState([])

  const userToken = localStorage.getItem('user-token')


  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  async function getRequestedTickets() {

    const adminID = auth.currentUser.uid

    const data = await (await axios.get('http://localhost:5000/api/tickets/adminID/${adminID}?state=requested', {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })).data

    setReqTickets(data)

  }

  async function getAcptTickets() {

    const adminID = auth.currentUser.uid

    const data = await (await axios.get('http://localhost:5000/api/tickets/adminID/${adminID}?state=accepted', {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })).data

    setAcptTickets(data)

  }

  async function getDoneTickets() {

    const adminID = auth.currentUser.uid

    const data = await (await axios.get('http://localhost:5000/api/tickets/adminID/${adminID}?state=done', {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })).data

    setAcptTickets(data)

  }



  async function getApartments() {

    const data = await (await axios.get("http://localhost:5000/api/apartments", {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })).data

    setApts(data)
  }

  useEffect(() => {
    getApartments()
    getRequestedTickets()
    getAcptTickets()
    getDoneTickets()
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
                <span> {t.apartmentID} </span>
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
              return <div> {t.apartmentID}</div>
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
              return <div> {t.apartmentID}</div>
            })
          )
        }
      </div>

    </>
  )
}
