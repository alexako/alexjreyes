import React from "react"

import app from "firebase/app"
import "firebase/analytics"
import config from "./firebase-config"

console.log(app)

class FirebaseApp {

  constructor() {
    return null
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    app.auth().signInWithPopup(provider)
      .then(result => {
        this.user = result.user
        console.log('user:', this.user)
      })
  }
}

export default FirebaseApp
