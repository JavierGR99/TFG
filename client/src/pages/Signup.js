import React, { createRef, useEffect, useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { postSignUp } from "../service/postSignUp"
import { getApartments } from "../service/getApartments"
import ApartmentsSelect from "../components/ApartmentsSelect"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const userNameRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const aptRef = createRef("")
  const [apts, setApts] = useState([])

  async function handleSubmit(e) {
    e.preventDefault()

    console.log(userNameRef.current.value)

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      const userId = await signup(emailRef.current.value, passwordRef.current.value)
      await postSignUp({
        userID: userId,
        userName: userNameRef.current.value
      })
      history.push("/login")
    } catch (error) {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  async function setup() {
    setApts(await getApartments())
  }

  useEffect(() => {
    setup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="userName">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" ref={userNameRef} placeholder="Javier Gallego" required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <ApartmentsSelect ref={aptRef} apts={apts}></ApartmentsSelect>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
