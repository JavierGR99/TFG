import React from "react"

import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import PrivateRoute from "../routes/PrivateRoute"
import Dashboard from "../pages/Dashboard"
import ForgotPassword from "../pages/ForgotPassword"
import NewTicket from "../pages/NewTicket"
import UpdateProfile from "../pages/UpdateProfile"
import Signup from "../pages/Signup"
import Login from "../pages/Login"


function App() {

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/newTicket" component={NewTicket} />

            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
