import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyAE-hVWy62caraZx7f5QdRKKqdukhJMkAY",
  authDomain: "tfg-apartaments.firebaseapp.com",
  projectId: "tfg-apartaments",
  storageBucket: "tfg-apartaments.appspot.com",
  messagingSenderId: "863303276615",
  appId: "1:863303276615:web:7f5f05a0f7edba33e3b962"
})

export const auth = app.auth()
export default app
