import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { postSignUp } from "../service/postSignUp"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState()

  async function signup(email, password, userName, aptID) {

    auth.createUserWithEmailAndPassword(email, password)
      .then(doc => {
        console.log(doc.user.uid)
        console.log(userName)
        console.log(aptID)
        postSignUp({
          userID: doc.user.uid,
          userName: userName,
          apartmentID: aptID,
        })
      }).catch(function (error) {
        return error
      })

  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)

      // console.log(auth.currentUser.getIdToken())
      // setToken(auth.currentUser.getIdToken())

    })
    return unsubscribe


  }, [])

  const value = {
    currentUser,
    setToken,
    token,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
